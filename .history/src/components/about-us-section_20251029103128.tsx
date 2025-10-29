import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Coffee, Users, Award, Heart } from "lucide-react";

export function AboutUsSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-white/10 backdrop-blur-sm">
              Our Story
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              Crafting Exceptional Coffee Since 2018
            </h2>
            <p className="text-lg text-white/80 mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              WAGA Coffee was born from a passion for connecting coffee lovers with the finest beans from around the world. We believe that great coffee starts with respect for the land, the farmers, and the traditional methods that have been perfected over generations.
            </p>
            <p className="text-lg text-white/80 mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              Our commitment to quality means we work directly with small-scale farmers, ensuring fair prices and sustainable practices. Every bag of WAGA Coffee tells a story of dedication, craftsmanship, and the pursuit of perfection.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-white/80">Farm Partners</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-2">15</div>
                <div className="text-white/80">Countries</div>
              </div>
            </div>

            <Button className="bg-white/10 backdrop-blur-sm hover:bg-white/20">
              Learn More About Our Process
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-transparent backdrop-blur-sm rounded-lg p-4 hover:bg-white/5 transition-colors">
                <Coffee className="h-8 w-8 text-amber-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Premium Beans</h3>
                <p className="text-white/80 text-sm">
                  Carefully selected and roasted to perfection for optimal flavor.
                </p>
              </div>

              <div className="bg-transparent backdrop-blur-sm rounded-lg p-4 hover:bg-white/5 transition-colors">
                <Users className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Fair Trade</h3>
                <p className="text-white/80 text-sm">
                  Supporting farmers with fair wages and sustainable practices.
                </p>
              </div>
            </div>

            <div className="space-y-6 mt-12">
              <div className="bg-transparent backdrop-blur-sm rounded-lg p-4 hover:bg-white/5 transition-colors">
                <Award className="h-8 w-8 text-green-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Quality Assured</h3>
                <p className="text-white/80 text-sm">
                  Rigorous testing and quality control at every step.
                </p>
              </div>

              <div className="bg-transparent backdrop-blur-sm rounded-lg p-4 hover:bg-white/5 transition-colors">
                <Heart className="h-8 w-8 text-red-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Community Focused</h3>
                <p className="text-white/80 text-sm">
                  Building lasting relationships with coffee communities worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
