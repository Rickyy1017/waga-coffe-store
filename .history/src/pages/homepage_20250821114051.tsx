import { Header } from "../components/header";
import { ShoppingCart } from "../components/shopping-cart";
import { HeroSection } from "../components/hero-section";
import { ProductCatalog } from "../components/product-catalog";
import { FeaturesSection } from "../components/features-section";
import { Footer } from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#032524]">
      <Header />
      <ShoppingCart />
      <HeroSection />
      <ProductCatalog />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
