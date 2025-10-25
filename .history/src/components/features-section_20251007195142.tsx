import { Shield, Zap, Percent, Lock, Rocket, Globe } from "lucide-react";
import { Web3Background } from "./web3-background";

export function FeaturesSection() {
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
    orange: "bg-[#032524]",
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
                  {feature.title}
                </h4>
                
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                
                <div className="w-0 h-0.5 bg-gradient-to-r from-transparent via-accent-blue to-transparent mx-auto mt-4 group-hover:w-16 transition-all duration-300" />
              </div>
            ))}
          </div>

          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-3xl md:text-4xl font-bold text-web3-gradient mb-2">99.9%</div>
              <div className="text-gray-600 text-sm">Uptime</div>
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="text-3xl md:text-4xl font-bold text-web3-gradient mb-2">2s</div>
              <div className="text-gray-600 text-sm">Avg. Settlement</div>
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-3xl md:text-4xl font-bold text-web3-gradient mb-2">0.5%</div>
              <div className="text-gray-600 text-sm">Transaction Fee</div>
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '0.9s' }}>
              <div className="text-3xl md:text-4xl font-bold text-web3-gradient mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Global Support</div>
            </div>
          </div>
        </div>

        {/* Floating blockchain nodes */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-20 w-4 h-4 bg-purple-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-10 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '2.5s' }} />
      </section>
    </Web3Background>
  );
}
