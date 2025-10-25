import { LiaEthereum } from "react-icons/lia";
import { IoLogoUsd } from "react-icons/io";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaCcPaypal } from "react-icons/fa";

import { Web3Background } from "./web3-background";
import SprinkleSvg from "../assets/Sprinkle.svg";

export function HeroSection() {
  return (
    <Web3Background pattern="blockchain" intensity="low">
      <section className="relative py-20  bg-[#032524e7] text-white overflow-hidden">
        {/* Sprinkle SVG background */}
        <div className="absolute inset-0">
          <img 
            src={SprinkleSvg} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center">
            {/* Animated title */}
            <h2 className="font-bold text-4xl md:text-6xl mb-6 animate-slide-in-up">
              Premium WAGA Coffee Bags, <br />
              <span className="text animate-pulse-glow">
                Made Easy with Crypto Payments 
              </span>
            </h2>
            
            {/* Animated description */}
            <p className="text-xl md:text-2xl mb-8 text-coffee-cream max-w-3xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              Experience the finest single-origin coffees from around the world. 
              Pay seamlessly with ETH, USDC, or traditional methods.
            </p>

         
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            
            </div>
            
            {/* Enhanced payment methods with animations */}
            <div className="mt-16 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              <span className="text-2xl font-semibold text-coffee-cream/80 mb-4 block">We Accept:</span>
              
              <div className="flex justify-center items-center space-x-6 md:space-x-8 text-coffee-cream">
                <div className="crypto-glow group ">
                  <LiaEthereum  className=" h-10 w-10 text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="block text-sm mt-1 font-semibold ">ETH</span>
                </div>
                
                <div className="crypto-glow group">
                  <IoLogoUsd className=" h-10 w-10 mx-auto" />
                  <span className="block text-sm mt-1 font-semibold ">USDC</span>
                </div>
                
                <div className="crypto-glow group">
                  <FaMoneyBillTransfer className=" h-10 w-10 text-blue-400 group-hover:scalem" />
                  <span className="block text-sm mt-1 font-semibold ">Card</span>
                </div>
                
                <div className="crypto-glow group">
                  <FaCcPaypal className="h-10 w-10 text-blue-600 " />
                  <span className="block text-sm mt-1 font-semibold ">PayPal</span>
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
