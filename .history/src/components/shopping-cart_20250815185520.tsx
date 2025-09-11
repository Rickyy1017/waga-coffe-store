import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import { useWeb3 } from "../hooks/use-web3";
import { useState } from "react";
import { TransactionModal } from "./transaction-modal";

export function ShoppingCart() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    totalUsd, 
    totalEth, 
    totalUsdc, 
    updateQuantity, 
    removeItem 
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
      alert('Please connect your wallet first');
      return;
    }
    setShowTransactionModal(true);
    closeCart();
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={closeCart}>
        <SheetContent className="w-full bg-white">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col  ">
            <div className="flex-1 overflow-y-auto py-6">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p className="text-2xl font ">Your cart is empty ☹ </p>
                  <p className="text-sm mt-2">Add some coffee to get started!</p>
                </div>
              ) : (
                <div className="space-y-4 ">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">
                          ${item.product.priceUsd} | {item.product.priceEth} ETH
                        </p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-red-600 text-white"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-3 font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-green-600"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4 " />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
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
              <div className="border-t pt-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalUsd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <div className="text-right">
                      <div>${finalTotalUsd.toFixed(2)}</div>
                      <div className="text-sm text-gray-500 font-normal">
                        {finalTotalEth.toFixed(6)} ETH | {finalTotalUsdc.toFixed(2)} USDC
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => handleCheckout('crypto')}
                    className="w-full bg-accent-blue hover:bg-blue-600"
                  >
                    <Badge className="mr-2 bg-orange-500">ETH</Badge>
                    Pay with Crypto
                  </Button>
                  <Button
                    onClick={() => handleCheckout('card')}
                    variant="outline"
                    className="w-full"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay with Card
                  </Button>
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
