import { ProductCard } from "./product-card";
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/shared";

export function ProductCatalog() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="font-bold text-3xl text-gray-900 mb-4">Featured Coffee Collection</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium single-origin coffees, 
            each with unique flavor profiles and brewing recommendations.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Static featured coffee bags */}
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
            
            {/* API products */}
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button className="bg-accent-orange hover:bg-orange-600 text-white px-8 py-3">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
