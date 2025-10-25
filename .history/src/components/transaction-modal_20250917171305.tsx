 import { Dialog, DialogContent } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useWeb3 } from "../hooks/use-web3";
import { useCart } from "../hooks/use-cart";
import { CartItem } from "../../shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useEffect, useState } from "react";
import PaystackPop from "@paystack/inline-js";

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
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      resetTransaction();
      setOrderId(null);
      setPaymentError(null);
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
      setPaymentError(null);
      const orderData = {
        walletAddress: wallet.address,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.priceUsd,
        })),
        totalUsd: totalAmount,
        totalEth: paymentMethod === 'crypto' ? totalAmount : null,
        totalUsdc: null,
        paymentMethod: paymentMethod,
        paymentStatus: 'pending',
      };

      const order = await createOrderMutation.mutateAsync(orderData);
      setOrderId(order.id);
      console.log("Order created:", order.id);

      if (paymentMethod === 'crypto') {
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
      } else if (paymentMethod === 'card') {
        console.log("Calling handlePaystackPayment");
        // Use Paystack payment gateway
        handlePaystackPayment(order.id);
      }
    } catch (error: any) {
      console.error('Payment failed:', error);
      setPaymentError(error.message || 'Payment failed');
      if (orderId) {
        await updateOrderMutation.mutateAsync({
          orderId,
          status: 'failed',
        });
      }
    }
  };

  const handlePaystackPayment = (orderId: string) => {
    console.log("Paystack key:", import.meta.env.VITE_PAYSTACK_PUBLIC_KEY);
    console.log("Order ID:", orderId);
    console.log("Amount:", Math.round(totalAmount * 100));
    console.log("Currency:", currency);

    if (!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY) {
      setPaymentError("Paystack public key is not configured");
      return;
    }

    const paystack = new PaystackPop({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: wallet.address || "customer@example.com",
      amount: Math.round(totalAmount * 100), // Paystack expects amount in kobo
      currency: currency,
      onSuccess: async (transaction: any) => {
        console.log("Paystack success:", transaction);
        try {
          await updateOrderMutation.mutateAsync({
            orderId,
            status: 'confirmed',
            transactionHash: transaction.reference,
          });
          clearCart();
          setOrderId(orderId);
        } catch (error) {
          console.error("Failed to update order status:", error);
        }
      },
      onCancel: () => {
        console.log("Paystack cancelled");
        setPaymentError("Payment was cancelled.");
        updateOrderMutation.mutateAsync({
          orderId,
          status: 'failed',
        });
      },
      onError: (error: any) => {
        console.log("Paystack error:", error);
        setPaymentError(error.message || "Payment error occurred.");
        updateOrderMutation.mutateAsync({
          orderId,
          status: 'failed',
        });
      },
    });

    console.log("Opening Paystack iframe");
    paystack.openIframe();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center py-6">
          {paymentError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{paymentError}</AlertDescription>
            </Alert>
          )}
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
          ) : transaction.status === 'confirmed' || updateOrderMutation.isSuccess ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">
                Your order has been confirmed and will be processed shortly.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left text-sm mb-4">
                {transaction.hash && (
                  <>
                    <div className="font-semibold mb-1">Transaction Hash:</div>
                    <div className="font-mono text-xs break-all text-gray-600 mb-2">
                      {transaction.hash}
                    </div>
                  </>
                )}
                {orderId && (
                  <div>
                    <span className="font-semibold">Order ID:</span> #{orderId.slice(0, 8)}
                  </div>
                )}
              </div>
              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </>
          ) : transaction.status === 'failed' || createOrderMutation.isError ? (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Transaction Failed</h3>
              <p className="text-gray-600 mb-4">
                There was an issue processing your payment. Please try again.
              </p>
              <div className="space-y-2">
                <Button onClick={handlePayment} className="w-full">
                  Try Again
                </Button>
                <Button variant="outline" onClick={onClose} className="w-full">
                  Cancel
                </Button>
              </div>
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
