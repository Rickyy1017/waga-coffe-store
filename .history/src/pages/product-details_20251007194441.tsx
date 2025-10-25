import { useParams } from "wouter";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Star, ShoppingCart, Zap, ArrowLeft, MapPin, Coffee, Award, Truck, Shield } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import toast from "react-hot-toast";
import { products } from "../data/products";
import { useState } from "react";
import { Link } from "wouter";

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#032524]/10 to-[#032524]/5">
        <div className="text-center">
          <div className="mb-6">
            <Coffee className="h-24 w-24 text-[#032524] mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Not Found</h1>
            <p className="text-gray-600">The coffee you're looking for seems to have been brewed elsewhere.</p>
          </div>
          <Link href="/">
            <Button className="bg-[#032524] hover:bg-[#032524]/90 text-white">
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

    toast.success(`${product.name} has been added to your cart`);

    setIsAdding(false);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    toast.success(`Proceeding to checkout for ${product.name}`);
  };

  // Mock additional images for the product
  const productImages = [
    product.imageUrl,
    product.imageUrl, // In a real app, you'd have multiple images
    product.imageUrl,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#032524]/10 via-white to-[#032524]/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#032524]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" className="text-[#032524] hover:bg-[#032524]/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-2xl border border-[#032524]/20">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#032524] shadow-lg'
                      : 'border-gray-200 hover:border-[#032524]/60'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {product.name}

            {/* Payment Methods */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-sm border-blue-300 text-blue-600 px-3 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  ETH
                </Badge>
                <Badge variant="outline" className="text-sm border-green-300 text-green-600 px-3 py-1">
                  <Shield className="h-3 w-3 mr-1" />
                  USDC
                </Badge>
                <Badge variant="outline" className="text-sm border-purple-300 text-purple-600 px-3 py-1">
                  <Truck className="h-3 w-3 mr-1" />
                  Card
                </Badge>
                {product.inventory > 0 && product.inventory <= 10 && (
                  <Badge variant="secondary" className="text-sm animate-pulse bg-red-50 text-red-700 border-red-200">
                    Only {product.inventory} left in stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleBuyNow}
                  className="h-14 text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={product.inventory === 0}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Buy Now
                </Button>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="h-14 text-lg font-bold border-2 border-amber-500 text-amber-700 hover:bg-amber-50 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={product.inventory === 0 || isAdding}
                >
                  {isAdding ? (
                    <div className="flex items-center">
                      <div className="loading-dots mr-2"></div>
                      Adding...
                    </div>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>

              {product.inventory === 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-700 font-semibold">Out of Stock</p>
                  <p className="text-red-600 text-sm mt-1">This coffee will be back soon!</p>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-100">
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-600">Blockchain verified</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Fast Shipping</p>
                <p className="text-xs text-gray-600">Worldwide delivery</p>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Premium Quality</p>
                <p className="text-xs text-gray-600">Ethically sourced</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
