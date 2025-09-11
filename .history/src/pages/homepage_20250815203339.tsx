import { Header } from "../components/header";
import { ProductCard } from "../components/product-card";
import { ShoppingCart } from "../components/shopping-cart";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Shield, Zap, Percent, Coffee, Coins, CreditCard, Twitter, Instagram } from "lucide-react";
import { SiPaypal } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/shared";

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  return (
    <div className="min-h-screen bg-[#032524] ">
      <Header />
      <ShoppingCart />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-coffee-brown to-saddle-brown text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-bold text-4xl md:text-6xl mb-6">
              Premium Coffee, <br />
              <span className="text-accent-orange">Crypto Payments</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-coffee-cream max-w-3xl mx-auto">
              Experience the finest single-origin coffees from around the world. 
              Pay seamlessly with ETH, USDC, or traditional methods.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent-orange hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-coffee-brown px-8 py-3 text-lg"
              >
                Learn About Crypto Payment
              </Button>
            </div> */}
            
            {/* Payment Methods */}
            <div className="mt-12 flex justify-center items-center space-x-8 text-coffee-cream">
              <span className="text-sm">We Accept:</span>
              <Coins className="h-8 w-8" />
              <span className="font-semibold">USDC</span>
              <CreditCard className="h-8 w-8" />
              <SiPaypal className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
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

      {/* Features Section */}
      <section className="py-16 bg-coffee-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-bold text-3xl text-gray-900 mb-4">Why Choose Crypto Payments?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of commerce with secure, fast, and transparent blockchain payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-xl mb-2">Secure & Private</h4>
              <p className="text-gray-600">
                Your transactions are secured by blockchain technology with no need to share sensitive financial information.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-xl mb-2">Fast Settlement</h4>
              <p className="text-gray-600">
                Payments are processed instantly without waiting for traditional banking clearance times.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-coffee-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Percent className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-xl mb-2">Lower Fees</h4>
              <p className="text-gray-600">
                Enjoy reduced transaction costs compared to traditional payment methods and credit cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-xl mb-4 flex items-center">
                <img 
                  src="/images/WAGA.jpg" 
                  alt="WAGA Coffee Store" 
                  className="h-6 w-6 rounded-full mr-2 object-cover"
                />
                WAGA-coffee-store
              </h4>
              <p className="text-gray-400 mb-4">
                Premium coffee meets blockchain technology for the ultimate brewing experience.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Products</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Single Origin</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blends</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Decaf</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Brewing Equipment</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Brewing Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crypto Payments Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Newsletter</h5>
              <p className="text-gray-400 mb-4">Get updates on new coffees and crypto features.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                />
                <Button className="bg-accent-orange hover:bg-orange-600 px-4 py-2 rounded-r-lg rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 BrewChain. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
