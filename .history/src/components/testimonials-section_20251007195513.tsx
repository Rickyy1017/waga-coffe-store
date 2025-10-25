import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { Web3Background } from "./web3-background";

const testimonials = [
  {
    id: 1,
    name: "da",
    role: "Coffee Enthusiast",
    image: "/images/testimonial1.jpg",
    rating: 5,
    text: "WAGA Coffee has transformed my morning routine. The quality and flavor are unmatched. Every cup feels like a journey to the coffee farms of Ethiopia."
  },
  {
    id: 2,
    name: "eric",
    role: "student",
    image: "/images/testimonial2.jpg",
    rating: 5,
    text: "As a professional barista, I'm impressed by the consistency and depth of flavor in WAGA's beans. They make my job easier and my customers happier."
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Home Brewer",
    image: "/images/testimonial3.jpg",
    rating: 5,
    text: "The attention to detail in sourcing and roasting is evident in every sip. WAGA Coffee has become my go-to for both daily brewing and special occasions."
  }
];

export function TestimonialsSection() {
  return (
    <Web3Background pattern="blockchain" intensity="low">
      <section className="py-20 bg-gradient-to-br from-[#032524]/10 to-[#032524]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of coffee lovers who have discovered the perfect cup with WAGA Coffee
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="card-web3 hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#032524] to-[#032524]/80 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </Web3Background>
  );
}
