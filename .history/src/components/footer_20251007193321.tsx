import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Twitter, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Web3Background } from "./web3-background";

export function Footer() {
  return (
    <Web3Background pattern="blockchain" intensity="low">
      <footer className="bg-[#032524] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/images/WAGA.jpg"
                alt="WAGA Coffee Store"
                className="h-8 w-8 rounded-full mr-3 object-cover"
              />
              <h4 className="font-bold text-xl">WAGA COFFEE</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium coffee meets blockchain technology for the ultimate
              brewing experience. Discover exceptional beans from around the world.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="font-semibold text-lg">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="/coffee-bags" className="text-gray-400 hover:text-amber-400 transition-colors">Coffee Bags</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h5 className="font-semibold text-lg">Customer Service</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#shipping" className="text-gray-400 hover:text-amber-400 transition-colors">Shipping Info</a></li>
              <li><a href="#returns" className="text-gray-400 hover:text-amber-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-amber-400 transition-colors">FAQ</a></li>
              <li><a href="#support" className="text-gray-400 hover:text-amber-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h5 className="font-semibold text-lg">Contact Us</h5>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2 text-amber-400" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2 text-amber-400" />
                <span>+251 911 123 456</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2 text-amber-400" />
                <span>team@wagatoken.io</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2025 WAGA COFFEE. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#cookies" className="text-gray-400 hover:text-amber-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
    </Web3Background>
  );
}
