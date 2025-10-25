import { Button } from "./ui/button";
import { Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#032524] text-white py-12">
      <div className="flex justify-between md:flex-row  text-center w-[80%] m-auto items-center ">
        <div className="">
          <div>
            <h4 className="font-bold text-xl mb-4 flex items-center">
              <img
                src="/images/WAGA.jpg"
                alt="WAGA Coffee Store"
                className="h-6 w-6 rounded-full mr-2 object-cover"
              />
              WAGA COFFE STORE 
            </h4>
            <p className="text-gray-400 text-md mb-4">
              Premium coffee meets blockchain technology for the ultimate
              brewing experience.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="">
          <p className="text-gray-400 text-md">
            © 2025 WAGA-COFFEE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
