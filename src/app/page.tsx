'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandStory } from '@/components/sections/BrandStory';
import { MenuExplorer } from '@/components/sections/MenuExplorer';
import { Experience } from '@/components/sections/Experience';
import { Locations } from '@/components/sections/Locations';
import { Franchise } from '@/components/sections/Franchise';
import { SmoothScrollProvider } from '@/hooks/useSmoothScroll';
import { ScrollProgress } from '@/components/animations/ScrollProgress';

// Dynamic imports for heavy components
const CursorFollower = dynamic(
  () => import('@/components/animations/CursorFollower').then((mod) => mod.CursorFollower),
  { ssr: false }
);

const SignatureDishes = dynamic(
  () => import('@/components/sections/SignatureDishes').then((mod) => mod.SignatureDishes),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Custom cursor */}
      <CursorFollower />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Brand Story */}
        <BrandStory />

        {/* Menu Explorer */}
        <MenuExplorer />

        {/* Signature Dishes */}
        <SignatureDishes />

        {/* Experience */}
        <Experience />

        {/* Locations */}
        <Locations />

        {/* Franchise & Careers */}
        <Franchise />
      </main>

      {/* Footer */}
      <Footer />
    </SmoothScrollProvider>
  );
}
