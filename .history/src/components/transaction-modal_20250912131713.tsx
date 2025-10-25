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

  const handlePaystackPayment = (orderId: string) => {
    const paystack = new PaystackPop({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: wallet.address || "customer@example.com",
      amount: Math.round(totalAmount * 100), // Paystack expects amount in kobo
      currency: currency,
      onSuccess: async (transaction) => {
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
        setPaymentError("Payment was cancelled.");
        updateOrderMutation.mutateAsync({
          orderId,
          status: 'failed',
        });
      },
