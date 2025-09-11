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
        
