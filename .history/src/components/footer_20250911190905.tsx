import { Button } from "./ui/button";
import { Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#032524] text-white py-12">
      <div className="max-w-7xl flx items-center mx-auto px-4 sm:px-6 lg:px-8">
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

          

          

          
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 WAGA-COFFEE. All rights reserved.</p>
        
        </div>
      </div>
    </footer>
  );
}
