import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Wallet, QrCode, Info } from "lucide-react";
import { useWeb3 } from "../hooks/use-web3";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectWallet, transaction } = useWeb3();

  const handleConnect = async (walletType: 'metamask' | 'walletconnect' | 'coinbase') => {
    try {
      await connectWallet(walletType);
      onClose();
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-amber-50 ">
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

        {transaction.error && (
          <Alert variant="destructive">
            <AlertDescription>{transaction.error}</AlertDescription>
          </Alert>
        )}

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Why connect?</strong> Pay with crypto currencies, track your orders on the blockchain, and enjoy lower transaction fees.
          </AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  );
}
