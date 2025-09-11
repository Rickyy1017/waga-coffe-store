import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "../types/shared";
import { useCart } from "../hooks/use-cart";
import { useToast } from "../hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
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
  };

  return (
    <Card className="overflow-hidd hover:shadow-xl transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-xl text-gray-900">{product.name}</h4>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            <div><strong>Origin:</strong> {product.origin}</div>
            <div><strong>Process:</strong> {product.process}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl text-gray-900">${product.priceUsd}</div>
            <div className="text-sm text-gray-500">
              {product.priceEth} ETH | {product.priceUsdc} USDC
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-coffee-brown hover:bg-coffee-brown/90 text-white"
          disabled={product.inventory === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        {product.inventory > 0 && product.inventory <= 10 && (
          <Badge variant="secondary" className="mt-2 text-xs">
            Only {product.inventory} left in stock
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
