import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Star, ShoppingCart, Zap } from "lucide-react";
import type { Product } from "../types/shared";
import { useCart } from "../hooks/use-cart";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";

interface EnhancedProductCardProps {
  product: Product;
}

export function EnhancedProductCard({ product }: EnhancedProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate a brief processing animation for web3 feel
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

  return (
    <Card 
      className="card-web3 hover-lift overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Web3 overlay effect */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Crypto price badge */}
        <Badge className="absolute top-3 left-3 bg-accent-blue/90 backdrop-blur-sm border-0 animate-pulse-glow">
          <Zap className="h-3 w-3 mr-1" />
          {product.priceEth} ETH
        </Badge>
        
        {/* Hover overlay with quick actions */}
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            onClick={handleAddToCart}
            disabled={product.inventory === 0 || isAdding}
            className="btn-web3 btn-web3-primary transform scale-90 group-hover:scale-100 transition-transform duration-300"
          >
            {isAdding ? (
              <div className="loading-dots">Adding</div>
            ) : product.inventory === 0 ? (
              'Out of Stock'
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-xl text-gray-900 group-hover:text-web3-gradient transition-colors">
            {product.name}
          </h4>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            <div><strong>Origin:</strong> {product.origin}</div>
            <div><strong>Process:</strong> {product.process}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl text-gray-900 group-hover:text-web3-gradient transition-colors">
              ${product.priceUsd}
            </div>
            <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
              {product.priceEth} ETH | {product.priceUsdc} USDC
            </div>
          </div>
        </div>
        
        {/* Crypto payment badges */}
        <div className="flex gap-2 mb-4">
          <Badge variant="outline" className="text-xs border-blue-300 text-blue-600">
            ETH
          </Badge>
          <Badge variant="outline" className="text-xs border-green-300 text-green-600">
            USDC
          </Badge>
