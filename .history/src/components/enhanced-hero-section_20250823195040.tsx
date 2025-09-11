import { Button } from "./ui/button";
import { Coins, CreditCard, ArrowRight } from "lucide-react";
import { SiPaypal } from "react-icons/si";
import { Web3Background } from "./web3-background";

export function EnhancedHeroSection() {
  return (
    <Web3Background pattern="gradient" intensity="low">
      <section className="relative py-20 text- overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-brown/90 to-saddle-brown/90 backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center">
            {/* Animated title */}
            <h2 className="font-bold text-4xl md:text-6xl mb-6 animate-slide-in-up">
              Premium Coffee, <br />
              <span className="text-web3-gradient animate-pulse-glow">
                Crypto Payments
              </span>
            </h2>
            
            {/* Animated description */}
            <p className="text-xl md:text-2xl mb-8 text-coffee-cream max-w-3xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              Experience the finest single-origin coffees from around the world. 
              Pay seamlessly with ETH, USDC, or traditional methods.
            </p>

            {/* Animated CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <Button className="btn-web3 btn-web3-primary px-8 py-4 text-lg font-semibold group">
                Shop Coffee
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all">
                Learn More
              </Button>
            </div>
            
            {/* Enhanced payment methods with animations */}
            <div className="mt-16 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              <span className="text-sm text-coffee-cream/80 mb-4 block">We Accept:</span>
              
              <div className="flex justify-center items-center space-x-6 md:space-x-8 text-coffee-cream">
                <div className="crypto-glow group">
                  <Coins className="h-10 w-10 text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="block text-sm mt-1 font-semibold group-hover:text-web3-gradient transition-colors">ETH</span>
                </div>
                
                <div className="crypto-glow group">
                  <div className="crypto-coin usdc h-10 w-10 mx-auto" />
                  <span className="block text-sm mt-1 font-semibold group-hover:text-web3-gradient transition-colors">USDC</span>
                </div>
                
                <div className="crypto-glow group">
                  <CreditCard className="h-10 w-10 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="block text-sm mt-1 font-semibold group-hover:text-web3-gradient transition-colors">Card</span>
                </div>
                
                <div className="crypto-glow group">
                  <SiPaypal className="h-10 w-10 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="block text-sm mt-1 font-semibold group-hover:text-web3-gradient transition-colors">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating coffee beans animation */}
        <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-4 h-6 bg-coffee-brown rounded-full rotate-45 opacity-60" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-3 h-5 bg-saddle-brown rounded-full rotate-12 opacity-60" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-5 h-7 bg-coffee-brown rounded-full rotate-30 opacity-60" />
        </div>
      </section>
    </Web3Background>
  );
}
