import { Header } from "../components/header";
import { ShoppingCart } from "../components/shopping-cart";
import { Footer } from "../components/footer";
import { HeroSection } from "../components/hero-section";
import { SourceSection } from "../components/source-section";
import { ProductCatalog } from "../components/product-catalog";
import { FeaturesSection } from "../components/features-section";
import { TestimonialsSection } from "../components/testimonials-section";
import { AboutUsSection } from "../components/about-us-section";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <ShoppingCart />
      
      <HeroSection />
      <section id="about">
        <AboutUsSection />
      </section>

      <section id="products">
        <ProductCatalog />
      </section>
      <section id="source">
        <SourceSection />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}
