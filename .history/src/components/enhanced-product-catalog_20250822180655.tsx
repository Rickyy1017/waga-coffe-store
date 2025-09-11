import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/shared";
import { EnhancedProductCard } from "./enhanced-product-card";
import { Web3Background } from "./web3-background";

export function EnhancedProductCatalog() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  return (
    <Web3Background pattern="particles" intensity="low">
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16 animate-slide-in-up">
            <h3 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Featured <span className="text-web3-gradient">Coffee Collection</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover our carefully curated selection of premium single-origin coffees, 
              each with unique flavor profiles and seamless crypto payment options.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden card-web3 animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200 loading-web3" />
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-200 rounded loading-web3" />
                      <div className="h-4 bg-gray-200 rounded loading-web3" />
                      <div className="h-4 bg-gray-200 rounded loading-web3 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
