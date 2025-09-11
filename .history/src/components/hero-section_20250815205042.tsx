import { Button } from "./ui/button";
import { Coins, CreditCard } from "lucide-react";
import { SiPaypal } from "react-icons/si";

export function HeroSection() {
  return (
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
  );
}
