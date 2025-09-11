import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Coffee, Wallet, ShoppingCart, Menu } from "lucide-react";
import { useWeb3 } from "../hooks/use-web3";
import { useCart } from "../hooks/use-cart";
import { useState } from "react";
import { WalletModal } from "./wallet-modal";

export function Header() {
  const { wallet } = useWeb3();
  const { itemCount, openCart } = useCart();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="font-bold text-2xl text-coffee-brown flex items-center">
                  <img 
                    src="/images/WAGA.jpg" 
                    alt="WAGA Coffee Store" 
                    className="h-8 w-20 rounded-ful mr-2 object-cover contai"
                  />
                  
                </h1>
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <a href="#" className="text-gray-700 hover:text-coffee-brown transition-colors">
                  Products
                </a>
                <a href="#" className="text-gray-700 hover:text-coffee-brown transition-colors">
                  About
                </a>
                <a href="#" className="text-gray-700 hover:text-coffee-brown transition-colors">
                  Brewing Guide
                </a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Wallet Connection */}
              {wallet.isConnected ? (
                <div className="hidden md:flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>{formatAddress(wallet.address!)}</span>
                </div>
              ) : (
                <Button
                  onClick={() => setShowWalletModal(true)}
                  className="hidden md:flex items-center bg-accent-blue hover:bg-blue-600"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              )}

              {/* Shopping Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700 hover:text-coffee-brown"
                onClick={openCart}
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent-orange"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <WalletModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </>
  );
}
