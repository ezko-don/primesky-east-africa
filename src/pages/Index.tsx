import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import NavigationMinimal from '@/components/NavigationMinimal';
import ClientMarquee from '@/components/ClientMarquee';
import CinematicShowreel from '@/components/CinematicShowreel';
import ProcessTerminal from '@/components/ProcessTerminal';
import TechArsenal from '@/components/TechArsenal';
import AboutMinimal from '@/components/AboutMinimal';
import ContactMinimal from '@/components/ContactMinimal';
import FooterMinimal from '@/components/FooterMinimal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

// Lazy load heavy components
const Hero3D = lazy(() => import('@/components/Hero3D'));
const Services3D = lazy(() => import('@/components/Services3D'));
const Portfolio3D = lazy(() => import('@/components/Portfolio3D'));

// Loading fallback component
const SectionLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-black">
    <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      <NavigationMinimal />
      <Suspense fallback={<SectionLoader />}>
        <Hero3D />
      </Suspense>
      <ClientMarquee />
      <Suspense fallback={<SectionLoader />}>
        <Services3D />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Portfolio3D />
      </Suspense>
      <CinematicShowreel />
      <ProcessTerminal />
      <TechArsenal />
      <AboutMinimal />
      <ContactMinimal />
      <FooterMinimal />
      <FloatingWhatsApp />
    </motion.div>
  );
};

export default Index;
