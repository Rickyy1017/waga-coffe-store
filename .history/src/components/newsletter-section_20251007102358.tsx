import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, Coffee } from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter. Stay tuned for coffee updates!",
    });

    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Coffee className="h-16 w-16 text-white mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Our Coffee Community
          </h2>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Get exclusive access to new coffee releases, brewing tips, and special offers.
            Be the first to know about our latest discoveries from coffee farms around the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/90 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-amber-600 hover:bg-gray-50 font-semibold px-8"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-amber-100">
          <p className="text-sm">
            By subscribing, you agree to receive marketing emails from WAGA Coffee.
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
