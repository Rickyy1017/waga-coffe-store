import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Coffee, Users, Award, Heart } from "lucide-react";
import { Web3Background } from "./web3-background";

export function AboutUsSection() {
  return (
    <Web3Background pattern="blockchain" intensity="low">
      <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-accent-blue/10 text-accent-blue border-accent-blue/20">
              Our Story
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Crafting Exceptional Coffee Since 2018
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              WAGA Coffee was born from a passion for connecting coffee lovers with the finest beans from around the world. We believe that great coffee starts with respect for the land, the farmers, and the traditional methods that have been perfected over generations.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our commitment to quality means we work directly with small-scale farmers, ensuring fair prices and sustainable practices. Every bag of WAGA Coffee tells a story of dedication, craftsmanship, and the pursuit of perfection.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-blue mb-2">50+</div>
                <div className="text-gray-600">Farm Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-blue mb-2">15</div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>

            <Button className="btn-web3">
              Learn More About Our Process
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg">
                <Coffee className="h-8 w-8 text-amber-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Premium Beans</h3>
                <p className="text-gray-600 text-sm">
                  Carefully selected and roasted to perfection for optimal flavor.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Fair Trade</h3>
                <p className="text-gray-600 text-sm">
                  Supporting farmers with fair wages and sustainable practices.
                </p>
              </div>
            </div>

            <div className="space-y-6 mt-12">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                <Award className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                <p className="text-gray-600 text-sm">
                  Rigorous testing and quality control at every step.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg">
                <Heart className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Community Focused</h3>
                <p className="text-gray-600 text-sm">
                  Building lasting relationships with coffee communities worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Web3Background>
  );
}
