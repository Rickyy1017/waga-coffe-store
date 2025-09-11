import { Button } from "./ui/button";
import { Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-xl mb-4 flex items-center">
              <img 
                src="/images/WAGA.jpg" 
                alt="WAGA Coffee Store" 
                className="h-6 w-6 rounded-full mr-2 object-cover"
              />
              WAGA-coffee-store
            </h4>
            <p className="text-gray-400 mb-4">
              Premium coffee meets blockchain technology for the ultimate brewing experience.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Products</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Single Origin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blends</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Decaf</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brewing Equipment</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Brewing Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crypto Payments Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Newsletter</h5>
            <p className="text-gray-400 mb-4">Get updates on new coffees and crypto features.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
              />
              <Button className="bg-accent-orange hover:bg-orange-600 px-4 py-2 rounded-r-lg rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 WAGA. All rights reserved.</p>
          {/* <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
