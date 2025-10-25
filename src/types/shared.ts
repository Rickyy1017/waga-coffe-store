export interface Product {
  id: string;
  name: string;
  priceUsd: number;
  priceEth: string;
  priceUsdc: string;
  imageUrl: string;
  description: string;
  rating: number;
  origin: string;
  process: string;
  inventory: number;
  badges?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    priceUsd: number;
    priceEth: string;
    priceUsdc: string;
    imageUrl: string;
  };
}

export interface WalletState {
  address: string | null;
  balance: string;
  isConnected: boolean;
}

export interface TransactionState {
  hash: string | null;
  status: 'pending' | 'success' | 'failed';
  error: string | null;
}
