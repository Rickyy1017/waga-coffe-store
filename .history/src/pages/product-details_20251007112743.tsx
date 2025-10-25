import { useParams } from "wouter";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Star, ShoppingCart, Zap, ArrowLeft } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import toast from "react-hot-toast";
import { products } from "../data/products";
import { useState } from "react";
import { Link } from "wouter";

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);

    await new Promise(resolve => setTimeout(resolve, 300));

    addItem({
      productId: product.id,
      quantity: 1,
      product: {
        id: product.id,
        name: product.name,
        priceUsd: product.priceUsd.toString(),
        priceEth: product.priceEth.toString(),
        priceUsdc: product.priceUsdc.toString(),
        imageUrl: product.imageUrl,
      }
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });

    setIsAdding(false);
  };

  const handleBuyNow = () => {
    // For now, just add to cart and show toast
    handleAddToCart();
    toast({
      title: "Buy Now",
      description: `Proceeding to checkout for ${product.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-lg text-gray-600 ml-1">{product.rating}</span>
                </div>
                <Badge className="ml-4 bg-accent-blue/90 backdrop-blur-sm border-0">
                  <Zap className="h-3 w-3 mr-1" />
                  {product.priceEth} ETH
                </Badge>
              </div>
            </div>

            <div className="text-4xl font-bold text-gray-900">
              ${product.priceUsd}
              <div className="text-lg text-gray-500 mt-1">
                {product.priceEth} ETH | {product.priceUsdc} USDC
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Origin</h4>
                  <p className="text-gray-600">{product.origin}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Process</h4>
                  <p className="text-gray-600">{product.process}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs border-blue-300 text-blue-600">
                  ETH
                </Badge>
                <Badge variant="outline" className="text-xs border-green-300 text-green-600">
                  USDC
                </Badge>
                {product.inventory > 0 && product.inventory <= 10 && (
                  <Badge variant="secondary" className="text-xs animate-pulse">
                    Only {product.inventory} left in stock
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                onClick={handleBuyNow}
                className="flex-1 btn-web3"
                disabled={product.inventory === 0}
              >
                <Zap className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1"
                disabled={product.inventory === 0 || isAdding}
              >
                {isAdding ? (
                  <div className="loading-dots">Adding</div>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {product.inventory === 0 && (
              <p className="text-red-600 font-semibold">Out of Stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
