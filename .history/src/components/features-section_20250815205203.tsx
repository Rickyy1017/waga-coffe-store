import { Shield, Zap, Percent } from "lucide-react";

export function FeaturesSection() {
  return (
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
  );
}
