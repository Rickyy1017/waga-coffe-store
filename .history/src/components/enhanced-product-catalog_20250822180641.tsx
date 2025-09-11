import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/shared";
import { EnhancedProductCard } from "./enhanced-product-card";
import { Web3Background } from "./web3-background";

export function EnhancedProductCatalog() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  return (
    <Web3Background pattern="particles" intensity="low">
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16 animate-slide-in-up">
