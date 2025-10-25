import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import { useWeb3 } from "../hooks/use-web3";
import { useState } from "react";
import { TransactionModal } from "./transaction-modal";
import toast from "react-hot-toast";

import PayButton from "./ui/paybutton";

export function ShoppingCart() {
  const {
    isOpen,
    closeCart,
    items,
    totalUsd,
    totalEth,
    totalUsdc,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();

  const { wallet } = useWeb3();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto');

  const shippingCost = 5.99;
  const finalTotalUsd = totalUsd + shippingCost;
  const finalTotalEth = totalEth + (shippingCost * 0.00028); // Approximate ETH conversion
  const finalTotalUsdc = totalUsdc + shippingCost;

  const handleCheckout = (method: 'crypto' | 'card') => {
    setPaymentMethod(method);
    if (method === 'crypto' && !wallet.isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    setShowTransactionModal(true);
    closeCart();
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={closeCart}>
        <SheetContent className="w-full bg-white/10 backdrop-blur-md border-l border-white/30">
          <SheetHeader>
            <SheetTitle className="text-white">Shopping Cart</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col  ">
            <div className="flex-1 overflow-y-auto py-6">
              {items.length === 0 ? (
                <div className="text-center text-white/80 mt-8">
                  <p className="text-2xl font-semibold text-red-400 mb-6 ">Your cart is empty!☹  </p>
                  <p className="text-lg mt-2">Add some coffee to get started!</p>
                </div>
              ) : (
                <div className="space-y-4 ">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-4 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{item.product.name}</h4>
                        <p className="text-sm text-white/80">
                          ${item.product.priceUsd} | {item.product.priceEth} ETH
                        </p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-400/30 backdrop-blur-sm"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-3 font-semibold text-white">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-400/30 backdrop-blur-sm"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4 " />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/30 pt-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-white/80">
                    <span>Subtotal</span>
                    <span>${totalUsd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/80">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-white/30" />
                  <div className="flex justify-between font-semibold text-lg text-white">
                    <span>Total</span>
                    <div className="text-right">
                      <div>${finalTotalUsd.toFixed(2)}</div>
                      <div className="text-sm text-white/60 font-normal">
                        {finalTotalEth.toFixed(6)} ETH | {finalTotalUsdc.toFixed(2)} USDC
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => handleCheckout('crypto')}
                    className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                  >
                    <Badge className="mr-2 bg-orange-500 text-white">ETH</Badge>
                    Pay with Crypto
                  </Button>
                  <PayButton
                    product={{
                      id: "cart-total",
                      name: "Cart Total",
                      price: finalTotalUsd,
                      email: wallet.address || "customer@example.com"
                    }}
                    onSuccess={(response) => {
                      console.log("Paystack payment successful:", response);
                      clearCart();
                      toast.success("Your order has been processed successfully.");
                    }}
                    onError={(error) => {
                      console.error("Paystack payment error:", error);
                      toast.error("There was an error processing your payment. Please try again.");
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        paymentMethod={paymentMethod}
        totalAmount={paymentMethod === 'crypto' ? finalTotalEth : finalTotalUsd}
        currency={paymentMethod === 'crypto' ? 'ETH' : 'USD'}
        items={items}
      />
    </>
  );
}
