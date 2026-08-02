import React from 'react';
import HeroSection from '../components/HeroSection';
import DashboardShowcase from '../components/DashboardShowcase';
import TrustBar from '../components/TrustBar';
import FeatureGrid from '../components/FeatureGrid';
import IndustrySelector from '../components/IndustrySelector';
import WhyVowam from '../components/WhyVowam';
import ScreenshotsGallery from '../components/ScreenshotsGallery';
import PricingTeaser from '../components/PricingTeaser';
import FaqSection from '../components/FaqSection';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
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
