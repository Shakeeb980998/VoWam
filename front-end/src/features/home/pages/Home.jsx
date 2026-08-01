import React from 'react';
import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import ProblemSolution from '../components/ProblemSolution';
import IndustrySelector from '../components/IndustrySelector';
import HowItWorks from '../components/HowItWorks';
import AILayerShowcase from '../components/AILayerShowcase';
import FeatureGrid from '../components/FeatureGrid';
import SecurityStrip from '../components/SecurityStrip';
import SocialProof from '../components/SocialProof';
import PricingTeaser from '../components/PricingTeaser';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  return (
    <div className="home-page-container">
      <HeroSection />
      <TrustBar />
      <ProblemSolution />
      <IndustrySelector />
      <HowItWorks />
      <AILayerShowcase />
      <FeatureGrid />
      <SecurityStrip />
      <SocialProof />
      <PricingTeaser />
      <FinalCTA />
    </div>
  );
}
