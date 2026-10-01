import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import WorkflowSection from '../components/landing/WorkflowSection';
import ValueProps, { CTASection } from '../components/landing/ValueProps';

export default function LandingPage({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar currentRoute="landing" onNavigate={onNavigate} />
      
      <main style={{ flex: 1 }}>
        <Hero 
          onStartCreating={() => onNavigate('workspace')} 
          onExploreBlogs={() => onNavigate('blogs')} 
        />
        <WorkflowSection />
        <ValueProps />
        <CTASection onStartCreating={() => onNavigate('workspace')} />
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
