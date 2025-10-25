import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/shared";
import { ProductCard } from "./product-card";
import { Web3Background } from "./web3-background";

export function ProductCatalog() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  return (
    <Web3Background pattern="particles" intensity="low">
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16 animate-slide-in-up">
            <h1 className=" absolute top-[-5%] left-0 text-8xl capitalize border-8 w-full z " style={{ color: "transparent", WebkitTextStroke: ".8px #032524" }} >our Collection</h1>
            <h3 className="font-bold relative text-3xl md:text-4xl text-gray-900 mb-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Static featured coffee bags with enhanced styling */}
              <ProductCard product={{
                id: 'featured-coffee-bag-1',
                name: 'Premium Coffee Bag',
                priceUsd: 24.444,
                priceEth: '0.012',
                priceUsdc: '24.99',
                imageUrl: '/images/coffee bag.jpg',
                description: 'Premium single-origin coffee beans in an elegant bag. Perfect for coffee enthusiasts seeking exceptional quality and rich flavor profiles.',
                rating: 4.8,
                origin: 'Colombia',
                process: 'Washed',
                inventory: 15
              }} />
              
              <ProductCard product={{
                id: 'featured-coffee-bag-2',
                name: 'Artisan Coffee Blend',
                priceUsd: 19.99,
                priceEth: '0.009',
                priceUsdc: '19.99',
                imageUrl: '/images/coffe2.jpg',
                description: 'Carefully crafted artisan blend combining beans from multiple origins for a complex, balanced flavor experience.',
                rating: 4.6,
                origin: 'Ethiopia & Brazil',
                process: 'Natural & Washed',
                inventory: 22
              }} />
              
              {/* Additional featured product for better grid layout */}
              <ProductCard product={{
                id: 'featured-coffee-bag-3',
                name: 'Special Reserve Blend',
                priceUsd: 29.99,
                priceEth: '0.015',
                priceUsdc: '29.99',
                imageUrl: '/images/coffee bag.jpg',
                description: 'Exclusive limited edition blend with rare beans from sustainable farms. A true connoisseur\'s choice.',
                rating: 4.9,
                origin: 'Costa Rica',
                process: 'Honey Process',
                inventory: 8
              }} />
              
              {/* API products */}
              {products?.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-16 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <Button className="btn-web3 btn-web3-secondary px-8 py-4 text-lg font-semibold group">
              View All Products
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </div>
        </div>

        <div className="absolute top-1/4 left-1/4 w-4 h-6 bg-coffee-brown rounded-full rotate-45 opacity-40 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-5 bg-saddle-brown rounded-full rotate-12 opacity-40 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-5 h-7 bg-coffee-brown rounded-full rotate-30 opacity-40 animate-float" style={{ animationDelay: '2s' }} />
      </section>
    </Web3Background>
  );
}
