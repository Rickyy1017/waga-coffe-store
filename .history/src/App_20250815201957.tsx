import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { Web3Provider } from "./hooks/use-web3";
import { CartProvider } from "./hooks/use-cart";
import Home from "./pages/home";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
}

export default App;
