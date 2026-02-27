import React from 'react';
import NavigationMinimal from '@/components/NavigationMinimal';
import HeroMinimal from '@/components/HeroMinimal';
import ServicesMinimal from '@/components/ServicesMinimal';
import PortfolioMinimal from '@/components/PortfolioMinimal';
import AboutMinimal from '@/components/AboutMinimal';
import ContactMinimal from '@/components/ContactMinimal';
import FooterMinimal from '@/components/FooterMinimal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationMinimal />
      <HeroMinimal />
      <PortfolioMinimal />
      <ServicesMinimal />
      <AboutMinimal />
      <ContactMinimal />
      <FooterMinimal />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
