import { Header } from "../components/header";
import { ShoppingCart } from "../components/shopping-cart";
import { Footer } from "../components/footer";
import { EnhancedHeroSection } from "../components/enhanced-hero-section";
import { EnhancedProductCatalog } from "../components/enhanced-product-catalog";
import { EnhancedFeaturesSection } from "../components/features-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <ShoppingCart />
      <EnhancedHeroSection />
      <EnhancedProductCatalog />
      <EnhancedFeaturesSection />
      <Footer />
    </div>
  );
}
