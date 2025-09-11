import { Shield, Zap, Percent, Lock, Rocket, Globe } from "lucide-react";
import { Web3Background } from "./web3-background";

export function EnhancedFeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your transactions are secured by blockchain technology with no need to share sensitive financial information.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Fast Settlement",
      description: "Payments are processed instantly without waiting for traditional banking clearance times.",
      color: "orange"
    },
    {
      icon: Percent,
      title: "Lower Fees",
      description: "Enjoy reduced transaction costs compared to traditional payment methods and credit cards.",
      color: "brown"
    },
    {
      icon: Lock,
      title: "Transparent",
      description: "Every transaction is recorded on the blockchain, providing complete transparency and traceability.",
      color: "green"
    },
    {
      icon: Rocket,
      title: "Global Access",
      description: "Access your funds and make payments from anywhere in the world without borders or restrictions.",
      color: "purple"
    },
    {
      icon: Globe,
      title: "Eco-Friendly",
      description: "Support sustainable coffee farming and carbon-neutral blockchain solutions for a better planet.",
      color: "teal"
    }
  ];

  const colorClasses = {
    blue: "bg-accent-blue",
    orange: "bg-accent-orange",
    brown: "bg-coffee-brown",
    green: "bg-green-500",
    purple: "bg-purple-500",
    teal: "bg-teal-500"
  };

  return (
    <Web3Background pattern="blockchain" intensity="low">
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16 animate-slide-in-up">
            <h3 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Why Choose <span className="text-web3-gradient">Web3 Payments</span>?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience the future of commerce with secure, fast, and transparent blockchain payments 
              that revolutionize how you enjoy your coffee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="stagger-item card-web3 p-6 text-center group hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 crypto-glow`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h4 className="font-semibold text-xl mb-3 text-gray-900 group-hover:text-web3-gradient transition-colors">
