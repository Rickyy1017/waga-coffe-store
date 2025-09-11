import { Header } from "../components/header";
import { ShoppingCart } from "../components/shopping-cart";
import { Button } from "../components/ui/button";
import { useCart } from "../hooks/use-cart";
import { useToast } from "../hooks/use-toast";

export default function CoffeeBags() {
  const { addItem } = useCart();
  const { toast } = useToast();

  const coffeeBags = [
    {
      id: 'premium-coffee-bag',
      name: 'Premium Coffee Bag',
      priceUsd: '24.99',
      priceEth: '0.012',
      priceUsdc: '24.99',
      imageUrl: '/images/coffee bag.jpg',
      description: 'Premium single-origin coffee beans in an elegant bag. Perfect for coffee enthusiasts seeking exceptional quality and rich flavor profiles.',
      rating: 4.8,
      origin: 'Colombia',
      process: 'Washed',
      inventory: 15
    },
    {
      id: 'artisan-coffee-blend',
      name: 'Artisan Coffee Blend',
      priceUsd: '19.99',
      priceEth: '0.009',
      priceUsdc: '19.99',
      imageUrl: '/images/coffe2.jpg',
      description: 'Carefully crafted artisan blend combining beans from multiple origins for a complex, balanced flavor experience.',
      rating: 4.6,
      origin: 'Ethiopia & Brazil',
      process: 'Natural & Washed',
      inventory: 22
    }
  ];

  const handleAddToCart = (coffee: any) => {
    addItem({
      productId: coffee.id,
      quantity: 1,
      product: {
        id: coffee.id,
        name: coffee.name,
        priceUsd: coffee.priceUsd,
        priceEth: coffee.priceEth,
        priceUsdc: coffee.priceUsdc,
        imageUrl: coffee.imageUrl,
      }
    });

    toast({
      title: "Added to Cart",
      description: `${coffee.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ShoppingCart />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Coffee Bags Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of coffee bags, featuring single-origin beans and artisan blends
          </p>
        </div>

        {/* Grid layout for coffee bags */}
        <div className="grid grid-cols-1 jus lg:grid-cols-2 gap-8">
          {coffeeBags.map((coffee) => (
            <div key={coffee.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={coffee.imageUrl} 
                    alt={coffee.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold text-2xl text-gray-900 mb-2">{coffee.name}</h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {coffee.description}
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                      <div><strong>Origin:</strong> {coffee.origin}</div>
                      <div><strong>Process:</strong> {coffee.process}</div>
                      <div><strong>Rating:</strong> ⭐ {coffee.rating}</div>
                      <div><strong>Stock:</strong> {coffee.inventory} available</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">${coffee.priceUsd}</div>
                    <div className="text-sm text-gray-500">{coffee.priceEth} ETH | {coffee.priceUsdc} USDC</div>
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(coffee)}
                    className="w-full mt-6 bg-coffee-brown hover:bg-coffee-brown/90 text-white"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
