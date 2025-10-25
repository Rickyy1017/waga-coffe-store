import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Wallet, ShoppingCart, Menu, X } from "lucide-react";
import { useWeb3 } from "../hooks/use-web3";
import { useCart } from "../hooks/use-cart";
import { useState } from "react";
import { WalletModal } from "./wallet-modal";

export function Header() {
  const { wallet, connectWallet } = useWeb3();
  const { itemCount, openCart } = useCart();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Source', href: '#source' },
    { name: 'Features', href: '#features' },
    { name: 'Contact', href: '#contact' },
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet('metamask');
      setShowWalletModal(false);
    } catch (error) {
      // Error is already handled in the useWeb3 hook
    }
  };

  return (
    <>
      <header className="bg-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="font-bold text-2xl text-coffee-brown flex items-center">
                <img
                  src="/images/WAGA.jpg"
                  alt="WAGA Coffee Store"
                  className="w-14 rounded-lg mr-2 object-cover bg-contain"
                />
              </h1>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* Wallet and Cart - Right aligned */}
            <div className="flex items-center gap-4">
              {wallet.isConnected ? (
                <div className="hidden md:flex items-center px-4 py-2 bg-green-400 text-green-800 rounded-lg">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>{formatAddress(wallet.address!)}</span>
                </div>
              ) : (
                <Button
                  onClick={handleConnectWallet}
                  className="text-white cursor-pointer md:flex items-center bg-[#032524] hover:bg-[#032524]/90"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="relative text-white bg-[#032524] cursor-pointer hover:bg-[#032524]/90"
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
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-accent-blue block px-3 py-2 text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
    </>
  );
}
