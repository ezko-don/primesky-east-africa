import React from 'react';
import MinimalNavigation from '@/components/MinimalNavigation';
import MinimalHero from '@/components/MinimalHero';
import Services from '@/components/Services';
import PortfolioPublic from '@/components/PortfolioPublic';
import About from '@/components/About';
import Contact from '@/components/Contact';
import MinimalFooter from '@/components/MinimalFooter';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <MinimalNavigation />
      <div className="pt-16">
        <MinimalHero />
      <Services />
      <PortfolioPublic />
      <About />
      <Contact />
      <MinimalFooter />
      <FloatingWhatsApp />
      <AnalyticsDashboard />
      </div>
    </div>
  );
};

export default Index;
