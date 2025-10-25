import { Header } from "../components/header";
import { ShoppingCart } from "../components/shopping-cart";
import { Footer } from "../components/footer";
import { HeroSection } from "../components/hero-section";
import { SourceSection } from "../components/source-section";
import { ProductCatalog } from "../components/product-catalog";
import { FeaturesSection } from "../components/features-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <ShoppingCart />
      <HeroSection />
      <ProductCatalog />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
