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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="mb-6">
            <Coffee className="h-24 w-24 text-amber-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Not Found</h1>
            <p className="text-gray-600">The coffee you're looking for seems to have been brewed elsewhere.</p>
          </div>
          <Link href="/">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" className="text-amber-700 hover:bg-amber-50">
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
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-2xl border border-amber-100">
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
                      ? 'border-amber-500 shadow-lg'
                      : 'border-gray-200 hover:border-amber-300'
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
                </h1>
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-4 py-2 text-sm font-semibold">
                  <Award className="h-4 w-4 mr-1" />
                  Premium
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                  <Star className="h-5 w-5 text-amber-400 fill-current" />
                  <span className="text-lg font-semibold text-gray-900 ml-1">{product.rating}</span>
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
