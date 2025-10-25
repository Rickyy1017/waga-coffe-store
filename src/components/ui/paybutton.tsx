import React, { useState } from "react";
import { Button } from "./button";
import { Alert, AlertDescription } from "./alert";
import { Loader2, CreditCard } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  email: string;
}

interface PayButtonProps {
  product: Product;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
  className?: string;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PayButton: React.FC<PayButtonProps> = ({
  product,
  onSuccess,
  onError,
  disabled = false,
  className = ""
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const payWithPaystack = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get Paystack public key from environment or use test key
      const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_your_key_here";

      if (!window.PaystackPop) {
        throw new Error("Paystack library not loaded");
      }

      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: product.email,
        amount: Math.round(product.price * 100), // Convert to kobo and ensure it's an integer
        currency: "NGN",
        ref: `waga_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
        callback: function (response: any) {
          // Call the success callback
          if (onSuccess) {
            onSuccess(response);
          }
        },
        onClose: function () {
          setIsLoading(false);
          alert("Payment window closed.");
        },
      });

      handler.openIframe();
    } catch (err: any) {
      console.error("Paystack initialization error:", err);
      setError(err.message || "Failed to initialize payment");
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        onClick={payWithPaystack}
        disabled={disabled || isLoading}
        className={`w-full ${className}`}
        variant="outline"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay ₦{product.price.toLocaleString()} with Paystack
          </>
        )}
      </Button>
    </div>
  );
};

export default PayButton;
