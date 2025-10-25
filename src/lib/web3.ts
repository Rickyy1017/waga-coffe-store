import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

export class Web3Service {
  private web3: Web3 | null = null;
  private account: string | null = null;

  async connectMetaMask(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      this.web3 = new Web3(window.ethereum);
      this.account = accounts[0];

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        this.account = accounts[0] || null;
      });

      return this.account!;
    } catch (error) {
      throw new Error('User rejected the connection request');
    }
  }

  async getBalance(): Promise<string> {
    if (!this.web3 || !this.account) {
      throw new Error('Wallet not connected');
    }

    const balance = await this.web3.eth.getBalance(this.account);
    return this.web3.utils.fromWei(balance, 'ether');
  }

  async getChainId(): Promise<number> {
    if (!this.web3) {
      throw new Error('Wallet not connected');
    }

    return Number(await this.web3.eth.getChainId());
  }

  async sendEthTransaction(to: string, amount: string): Promise<string> {
    if (!this.web3 || !this.account) {
      throw new Error('Wallet not connected');
    }

    const value = this.web3.utils.toWei(amount, 'ether');
    
    const transaction = await this.web3.eth.sendTransaction({
      from: this.account,
      to,
      value,
    });

    return transaction.transactionHash as string;
  }

  async sendUSDCTransaction(to: string, amount: string): Promise<string> {
    if (!this.web3 || !this.account) {
      throw new Error('Wallet not connected');
    }

    // USDC contract address on mainnet
    const usdcAddress = '0xA0b86a33E6441f8C4e08C53AF8C6e62af2bb97F3';
    const usdcABI = [
      {
        "constant": false,
        "inputs": [
          {"name": "_to", "type": "address"},
          {"name": "_value", "type": "uint256"}
        ],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
      }
    ];

    const contract = new this.web3.eth.Contract(usdcABI, usdcAddress);
    const value = this.web3.utils.toWei(amount, 'mwei'); // USDC has 6 decimals

    const transaction = await contract.methods.transfer(to, value).send({
      from: this.account,
    });

    return transaction.transactionHash as string;
  }

  getAccount(): string | null {
      return this.account as string;
  }

  isConnected(): boolean {
    return !!this.account;
  }

  disconnect(): void {
    this.web3 = null;
    this.account = null;
  }
}

export const web3Service = new Web3Service();
