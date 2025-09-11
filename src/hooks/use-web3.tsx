import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Web3ContextType, WalletState, TransactionState } from '../types/web3';
import { web3Service } from '../lib/web3';
import { useToast } from '../hooks/use-toast';

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
  });

  const [transaction, setTransaction] = useState<TransactionState>({
    isLoading: false,
    hash: null,
    status: null,
    error: null,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (web3Service.isConnected()) {
      updateWalletState();
    }
  }, []);

  const updateWalletState = async () => {
    try {
      const address = web3Service.getAccount();
      if (address) {
        const balance = await web3Service.getBalance();
        const chainId = await web3Service.getChainId();
        
        setWallet({
          isConnected: true,
          address,
          balance,
          chainId,
        });
      }
    } catch (error) {
      console.error('Failed to update wallet state:', error);
    }
  };

  const connectWallet = async (walletType: 'metamask' | 'walletconnect' | 'coinbase') => {
    try {
      setTransaction(prev => ({ ...prev, isLoading: true, error: null }));

      let address: string;
      
      switch (walletType) {
        case 'metamask':
          address = await web3Service.connectMetaMask();
          break;
        case 'walletconnect':
          throw new Error('WalletConnect integration coming soon');
        case 'coinbase':
          throw new Error('Coinbase Wallet integration coming soon');
        default:
          throw new Error('Unsupported wallet type');
      }

      await updateWalletState();
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to connect wallet';
      setTransaction(prev => ({ ...prev, error: message }));
      
      toast({
        title: "Connection Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setTransaction(prev => ({ ...prev, isLoading: false }));
    }
  };

  const disconnectWallet = () => {
    web3Service.disconnect();
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const sendTransaction = async (to: string, amount: string, currency: 'ETH' | 'USDC'): Promise<string> => {
    try {
      setTransaction({
        isLoading: true,
        hash: null,
        status: 'pending',
        error: null,
      });

      let hash: string;
      
      if (currency === 'ETH') {
        hash = await web3Service.sendEthTransaction(to, amount);
      } else {
        hash = await web3Service.sendUSDCTransaction(to, amount);
      }

      setTransaction(prev => ({
        ...prev,
        hash,
        status: 'confirmed',
        isLoading: false,
      }));

      await updateWalletState();

      return hash;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Transaction failed';
      
      setTransaction({
        isLoading: false,
        hash: null,
        status: 'failed',
        error: message,
      });

      throw error;
    }
  };

  const resetTransaction = () => {
    setTransaction({
      isLoading: false,
      hash: null,
      status: null,
      error: null,
    });
  };

  const value: Web3ContextType = {
    wallet,
    transaction,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    resetTransaction,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
