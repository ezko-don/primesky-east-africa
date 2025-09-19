import React from 'react';
import MinimalNavigation from '@/components/MinimalNavigation';
import MinimalHero from '@/components/MinimalHero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Contact from '@/components/Contact';
import MinimalFooter from '@/components/MinimalFooter';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <MinimalNavigation />
      <MinimalHero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <MinimalFooter />
      <FloatingWhatsApp />
      <AnalyticsDashboard />
    </div>
  );
};

export default Index;
