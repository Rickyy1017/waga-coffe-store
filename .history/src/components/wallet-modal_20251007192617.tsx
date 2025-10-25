import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Wallet, QrCode, Info } from "lucide-react";
import { useWeb3 } from "../hooks/use-web3";
import toast from "react-hot-toast";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectWallet, transaction } = useWeb3();

  const handleConnect = async (walletType: 'metamask' | 'walletconnect' | 'coinbase') => {
    try {
      await connectWallet(walletType);
      toast.success("Your wallet has been successfully connected.");
      onClose();
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
        bold: true,
        animated: true,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white ">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Button
            onClick={() => handleConnect('metamask')}
            variant="outline"
            className="w-full flex items-center justify-start p-4 h-auto hover:border-accent-blue hover:bg-blue-50"
            disabled={transaction.isLoading}
          >
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">MetaMask</div>
              <div className="text-sm text-gray-500">Connect using browser wallet</div>
            </div>
          </Button>

          <Button
            onClick={() => handleConnect('walletconnect')}
            variant="outline"
            className="w-full flex items-center justify-start p-4 h-auto hover:border-accent-blue hover:bg-blue-50"
            disabled={transaction.isLoading}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <QrCode className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">WalletConnect</div>
              <div className="text-sm text-gray-500">Scan with mobile wallet</div>
            </div>
          </Button>

          <Button
            onClick={() => handleConnect('coinbase')}
            variant="outline"
            className="w-full flex items-center justify-start p-4 h-auto hover:border-accent-blue hover:bg-blue-50"
            disabled={transaction.isLoading}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Coinbase Wallet</div>
              <div className="text-sm text-gray-500">Connect to Coinbase Wallet</div>
            </div>
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <div className="flex items-start">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <strong>Why connect?</strong> Pay with crypto currencies, track your orders on the blockchain, and enjoy lower transaction fees.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
