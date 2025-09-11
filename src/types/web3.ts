export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
}

export interface TransactionState {
  isLoading: boolean;
  hash: string | null;
  status: 'pending' | 'confirmed' | 'failed' | null;
  error: string | null;
}

export interface Web3ContextType {
  wallet: WalletState;
  transaction: TransactionState;
  connectWallet: (walletType: 'metamask' | 'walletconnect' | 'coinbase') => Promise<void>;
  disconnectWallet: () => void;
  sendTransaction: (to: string, amount: string, currency: 'ETH' | 'USDC') => Promise<string>;
  resetTransaction: () => void;
}

export interface PriceData {
  usd: string;
  eth: string;
  usdc: string;
}
