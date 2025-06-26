import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/useAuth';
import { useTheme } from '@/contexts/useTheme';
import { coreModules, testimonials, inspirationalQuotes } from '@/data/landingData';
import LandingNavigation from '@/components/landing/LandingNavigation';
import LandingHero from '@/components/landing/LandingHero';
import CoreModulesSection from '@/components/landing/CoreModulesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import InspirationSection from '@/components/landing/InspirationSection';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const navigateToAuth = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <LandingNavigation 
        theme={theme}
        setTheme={setTheme}
        onSignIn={navigateToAuth}
        onGetStarted={navigateToAuth}
      />
      <main>
        <LandingHero onGetStarted={navigateToAuth} onLearnMore={handleLearnMore} />
        <CoreModulesSection coreModules={coreModules} />
        <TestimonialsSection testimonials={testimonials} />
        <CTASection onGetStarted={navigateToAuth} />
        <InspirationSection quotes={inspirationalQuotes} />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
