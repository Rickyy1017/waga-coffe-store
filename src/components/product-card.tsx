import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, ShoppingCart, Zap } from "lucide-react";
import type { Product } from "../types/shared";
import { useCart } from "../hooks/use-cart";
import toast from "react-hot-toast";
import { useState } from "react";
import { useLocation } from "wouter";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [, setLocation] = useLocation();

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

  return (
    <Card
      className="overflow-hidden group cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setLocation(`/product/${product.id}`)}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
       
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-white/20 backdrop-blur-sm border-0 text-white animate-pulse-glow">
            <Zap className="h-3 w-3 mr-1" />
            {product.priceEth} ETH
          </Badge>
          {product.badges && product.badges.map((badge, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border-0 ${
                badge === 'New' ? 'text-green-300' :
                badge === 'Bestseller' ? 'text-orange-300' :
                badge === 'Limited Edition' ? 'text-purple-300' :
                badge === 'Premium' ? 'text-yellow-300' :
                badge === 'Organic' ? 'text-green-300' :
                'text-gray-300'
              }`}
            >
              {badge}
            </Badge>
          ))}
        </div>
        
        {/* Hover overlay with quick actions */}
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-xl text-white group-hover:text-web3-gradient transition-colors">
            {product.name}
          </h4>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-white/80 ml-1">{product.rating}</span>
          </div>
        </div>

        <p className="text-white/80 text-sm mb-4 line-clamp-3 group-hover:text-white transition-colors">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
            <div><strong>Origin:</strong> {product.origin}</div>
            <div><strong>Process:</strong> {product.process}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl text-white group-hover:text-web3-gradient transition-colors">
              ${product.priceUsd}
            </div>
            <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
              {product.priceEth} ETH | {product.priceUsdc} USDC
            </div>
          </div>
        </div>
        
        {/* Crypto payment badges */}
        <div className="flex align-middle items-center justify-between gap-2 mb-4">
          <div className="flex gap-2 ">
             <Badge variant="outline" className="text-xs border-blue-300 text-blue-600">
            ETH
          </Badge>
          <Badge variant="outline" className="text-xs border-green-300 text-green-600">
            USDC
          </Badge>
          </div>
          
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={product.inventory === 0 || isAdding}
            className="bg-[#032524] hover:bg-[#032524]/90 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300"
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

        {product.inventory > 0 && product.inventory <= 10 && (
          <Badge variant="secondary" className="mt-2 text-xs animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-ping" />
            Only {product.inventory} left in stock
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
