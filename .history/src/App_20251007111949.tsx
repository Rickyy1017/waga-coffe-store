import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toast';
import { TooltipProvider } from "./components/ui/tooltip";
import { Web3Provider } from "./hooks/use-web3";
import { CartProvider } from "./hooks/use-cart";
import Home from "./pages/homepage";
import CoffeeBags from "./pages/coffee-bags";
import ProductDetails from "./pages/product-details";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/coffee-bags" component={CoffeeBags} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <CartProvider>
          <TooltipProvider>
            <ToastContainer position="top-right" />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
}

export default App;
