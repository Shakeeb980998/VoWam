import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import DashboardShowcase from '../components/DashboardShowcase';
import TrustBar from '../components/TrustBar';
import FeatureGrid from '../components/FeatureGrid';
import IndustrySelector from '../components/IndustrySelector';
import WhyVowam from '../components/WhyVowam';
import AboutSection from '../components/AboutSection';
import ScreenshotsGallery from '../components/ScreenshotsGallery';
import PricingTeaser from '../components/PricingTeaser';
import FaqSection from '../components/FaqSection';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const elem = document.getElementById(id);
      if (elem) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = elem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
               top: offsetPosition,
               behavior: "smooth"
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="home-page fade-in">
      <HeroSection />
      
      {/* 2. Trusted by businesses (future) */}
      <TrustBar />

      {/* 3. Dashboard showcase */}
      <DashboardShowcase />
      
      {/* 4. Core features */}
      <FeatureGrid />
      
      {/* 5. Industry solutions */}
      <IndustrySelector />
      
      {/* 6. Why Vowam */}
      <WhyVowam />

      {/* 6.5 About */}
      <AboutSection />
      
      {/* 7. Screenshots */}
      <ScreenshotsGallery />
      
      {/* 8. Pricing (later) */}
      <PricingTeaser />

      {/* 9. FAQ */}
      <FaqSection />
      
      {/* 10. Contact / Demo */}
      <FinalCTA />
    </div>
  );
}
