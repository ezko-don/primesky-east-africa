import React from 'react';
import NavigationMinimal from '@/components/NavigationMinimal';
import Hero3D from '@/components/Hero3D';
import Portfolio3D from '@/components/Portfolio3D';
import Services3D from '@/components/Services3D';
import AboutMinimal from '@/components/AboutMinimal';
import ContactMinimal from '@/components/ContactMinimal';
import FooterMinimal from '@/components/FooterMinimal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationMinimal />
      <Hero3D />
      <Portfolio3D />
      <Services3D />
      <AboutMinimal />
      <ContactMinimal />
      <FooterMinimal />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
