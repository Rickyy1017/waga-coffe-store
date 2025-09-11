import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../../shared/schema';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalUsd: number;
  totalEth: number;
  totalUsdc: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('brewchain-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('brewchain-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(current => {
      const existingIndex = current.findIndex(item => item.productId === newItem.productId);
      
      if (existingIndex >= 0) {
        // Update quantity if item already exists
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      } else {
        // Add new item
        return [...current, newItem];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(current => current.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(current =>
      current.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Calculate totals
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalUsd = items.reduce((sum, item) => 
    sum + (parseFloat(item.product.priceUsd) * item.quantity), 0
  );
  
  const totalEth = items.reduce((sum, item) => 
    sum + (parseFloat(item.product.priceEth) * item.quantity), 0
  );
  
  const totalUsdc = items.reduce((sum, item) => 
    sum + (parseFloat(item.product.priceUsdc) * item.quantity), 0
  );

  const value: CartContextType = {
    items,
    itemCount,
    totalUsd,
    totalEth,
    totalUsdc,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isOpen,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
