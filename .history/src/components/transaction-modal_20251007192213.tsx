import { Dialog, DialogContent } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { useWeb3 } from "../hooks/use-web3";
import { useCart } from "../hooks/use-cart";
import { CartItem } from "../../shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: 'crypto' | 'card';
  totalAmount: number;
  currency: string;
  items: CartItem[];
}

export function TransactionModal({
  isOpen,
  onClose,
  paymentMethod,
  totalAmount,
  currency,
  items
}: TransactionModalProps) {
  const { sendTransaction, transaction, wallet, resetTransaction } = useWeb3();
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      resetTransaction();
      setOrderId(null);
    }
  }, [isOpen, resetTransaction]);

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest('POST', '/api/orders', orderData);
      return response.json();
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, status, transactionHash }: any) => {
      const response = await apiRequest('PATCH', `/api/orders/${orderId}/status`, {
        status,
        transactionHash,
      });
      return response.json();
    },
  });

  const handlePayment = async () => {
    console.log("handlePayment called with paymentMethod:", paymentMethod);
    console.log("totalAmount:", totalAmount, "currency:", currency);

    try {

      if (paymentMethod === 'crypto') {
        const orderData = {
          walletAddress: wallet.address,
          items: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.priceUsd,
          })),
          totalUsd: totalAmount,
          totalEth: totalAmount,
          totalUsdc: null,
          paymentMethod: paymentMethod,
          paymentStatus: 'pending',
        };

        const order = await createOrderMutation.mutateAsync(orderData);
        setOrderId(order.id);
        console.log("Order created:", order.id);

        const merchantAddress = '0x742d35Cc6645090d22E0a99554cd4e9bBf4e4cE3';
        const transactionHash = await sendTransaction(
          merchantAddress,
          totalAmount.toString(),
          currency as 'ETH' | 'USDC'
        );

        await updateOrderMutation.mutateAsync({
          orderId: order.id,
          status: 'confirmed',
          transactionHash,
        });

        clearCart();

        // Show success toast and close modal
        toast({
          title: "Payment Successful!",
          description: `Your order #${order.id.slice(0, 8)} has been confirmed.`,
          variant: "default",
          bold: true,
          animated: true,
        });
        onClose();

      } else if (paymentMethod === 'card') {
        // Paystack Card Payment Integration
        // Call backend /api/pay to initialize Paystack transaction
        const email = wallet.address || "customer@example.com"; // Use wallet address as email or fallback
        const response = await apiRequest('POST', '/api/pay', { email, amount: totalAmount });
        const data = await response.json();

        if (!data || !data.data || !data.data.authorization_url) {
          throw new Error("Failed to initialize Paystack payment");
        }

        // Redirect user to Paystack hosted payment page
        // After payment, Paystack will redirect back or send webhook to /api/webhook
        window.location.href = data.data.authorization_url;
      }
    } catch (error: any) {
      console.error('Payment failed:', error);
      const errorMessage = error.message || 'Payment failed';

      // Show error toast
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
        bold: true,
        animated: true,
      });

      if (orderId) {
        await updateOrderMutation.mutateAsync({
          orderId,
          status: 'failed',
        });
      }
    }
  };



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center py-6">
          {transaction.isLoading || createOrderMutation.isPending || updateOrderMutation.isPending ? (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-16 w-16 animate-spin text-accent-blue" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Processing Transaction</h3>
              <p className="text-gray-600 mb-4">
                {paymentMethod === 'crypto'
                  ? 'Please confirm the transaction in your wallet and wait for blockchain confirmation.'
                  : 'Processing your payment...'}
              </p>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-xl mb-4">Confirm Payment</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-left text-sm mb-6">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold">
                      {totalAmount.toFixed(paymentMethod === 'crypto' ? 6 : 2)} {currency}
                    </span>
                  </div>
                  {paymentMethod === 'crypto' && (
                    <div className="flex justify-between">
                      <span>Gas Fee:</span>
                      <span>~0.005 ETH</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>Total:</span>
                    <span>
                      {(totalAmount + (paymentMethod === 'crypto' ? 0.005 : 0)).toFixed(
                        paymentMethod === 'crypto' ? 6 : 2
                      )} {currency}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handlePayment}
                className="w-full"
                disabled={paymentMethod === 'crypto' && !wallet.isConnected}
              >
                Confirm Payment
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
