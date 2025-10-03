import React from 'react'
import Header from './components/Header'
import LindaForsterVideo from './components/LindaForsterVideo'
import Services from './components/Services_FIXED'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import SectionDivider from './components/SectionDivider'

const aboutHeroImage = "https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759077921/office-1548297_1280_wdtekt.webp"

interface AboutUsPageProps {
  onNavigateBack?: () => void
  onNavigateToContact?: () => void
  onNavigateToServices?: () => void
  onNavigateToCruises?: () => void
  onNavigateToTravelOptions?: () => void
  onNavigateToStories?: () => void
  onNavigateToHome?: () => void
}

export default function AboutUsPage({ onNavigateBack, onNavigateToContact, onNavigateToServices, onNavigateToCruises, onNavigateToTravelOptions, onNavigateToStories, onNavigateToHome }: AboutUsPageProps) {
  // Unified navigation handlers
  const handleNavigateToAbout = () => {
    // Already on about page, scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateToServices = () => {
    if (onNavigateToServices) {
      onNavigateToServices()
    }
  }

  const handleNavigateToCruises = () => {
    if (onNavigateToCruises) {
      onNavigateToCruises()
    }
  }

  const handleNavigateToTravelOptions = () => {
    if (onNavigateToTravelOptions) {
      onNavigateToTravelOptions()
    }
  }

  const handleNavigateToStories = () => {
    if (onNavigateToStories) {
      onNavigateToStories()
    }
  }

  const handleNavigateToAI = () => {
    if (onNavigateToContact) {
      onNavigateToContact()
    }
  }

  const handleNavigateToContact = () => {
    if (onNavigateToContact) {
      onNavigateToContact()
    } else {
      window.location.href = '/contact'
    }
  }

  return (
    <div className="min-h-screen bg-white relative">
      <SEOHead page="about" />

      <Header 
        onNavigateToAbout={handleNavigateToAbout}
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={handleNavigateToTravelOptions}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToStories={handleNavigateToStories}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={onNavigateToHome}
      />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24"
        style={{
          background: `linear-gradient(135deg, rgba(0, 117, 204, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.4) 100% 100%), url("${aboutHeroImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="hero-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow-strong">
                About Us
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 mb-8 text-shadow">You Dream, We Create</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed text-shadow">
                Established in June 2016 by Linda Forster, with travel industry experience since 2006. We specialize in creating extraordinary TravLin journeys, transforming travel dreams into reality with focused passion, expertise, and genuine care.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-yellow-300/20 blur-lg floating-element" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Linda Forster and Video Section */}
      <section className="section-spacing section-white">
        <div className="content-container">
          <SectionDivider />
          <LindaForsterVideo />
        </div>
      </section>
      
      {/* Our Services Section */}
      <section id="our-services" className="section-spacing section-light">
        <div className="content-container">
          <SectionDivider />
          <div className="text-center margin-bottom-large">
            <h2 className="section-heading">
              Our Services
            </h2>
            <p className="text-description-large max-w-3xl mx-auto">
              From luxury ocean cruises and intimate river voyages to expedition adventures and customized independent travel, we create comprehensive travel solutions perfectly tailored to your dreams.
            </p>
          </div>
          <Services />
        </div>
      </section>
      
      <Footer 
        onContactClick={handleNavigateToContact}
        onNavigateToAbout={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={handleNavigateToTravelOptions}
        onNavigateToStories={handleNavigateToStories}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={onNavigateToHome}
      />
    </div>
  )
}