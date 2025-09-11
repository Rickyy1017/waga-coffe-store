import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";

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
