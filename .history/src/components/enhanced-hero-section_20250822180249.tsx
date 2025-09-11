import { Button } from "./ui/button";
import { Coins, CreditCard, ArrowRight } from "lucide-react";
import { SiPaypal } from "react-icons/si";
import { Web3Background } from "./web3-background";
import { HeroSection } from "./hero-section";

export function EnhancedHeroSection() {
  return (
    <Web3Background pattern="gradient" intensity="low">
      <section className="relative py-20 text-white overflow-hidden">
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
