import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsPrivacy from './components/TermsPrivacy';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';

interface TermsPrivacyPageProps {
  onNavigateToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToCruises: () => void;
  onNavigateToTravelOptions: () => void;
  onNavigateToContact: () => void;
  onNavigateToStories: () => void;
}

const TermsPrivacyPage: React.FC<TermsPrivacyPageProps> = ({
  onNavigateToHome,
  onNavigateToAbout,
  onNavigateToCruises,
  onNavigateToTravelOptions,
  onNavigateToContact,
  onNavigateToStories
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'complaint' | 'customer-acceptance'>('terms');

  const handleClose = () => {
    // Navigate back to home page when closing
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <SEOHead 
        title="Terms & Privacy - TravLin Travel | Legal Information & Policies"
        description="Read TravLin Travel's Terms & Conditions, Privacy Policy, and Customer Acceptance Form. Professional travel agency policies, legal information, and service fees."
        page="contact"
      />

      {/* Header */}
      <Header 
        onNavigateToHome={onNavigateToHome}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCruises={onNavigateToCruises}
        onNavigateToTravelOptions={onNavigateToTravelOptions}
        onNavigateToContact={onNavigateToContact}
        onNavigateToStories={onNavigateToStories}
      />

      {/* Terms & Privacy Modal - Always Open */}
      <TermsPrivacy 
        isOpen={true}
        onClose={handleClose}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Footer - Hidden behind modal but present for SEO */}
      <div style={{ visibility: 'hidden', height: 0, overflow: 'hidden' }}>
        <Footer 
          onContactClick={onNavigateToContact}
          onNavigateToHome={onNavigateToHome}
          onNavigateToAbout={onNavigateToAbout}
          onNavigateToCruises={onNavigateToCruises}
          onNavigateToTravelOptions={onNavigateToTravelOptions}
          onNavigateToContact={onNavigateToContact}
          onNavigateToStories={onNavigateToStories}
        />
      </div>
    </div>
  );
};

export default TermsPrivacyPage;
