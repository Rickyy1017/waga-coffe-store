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
