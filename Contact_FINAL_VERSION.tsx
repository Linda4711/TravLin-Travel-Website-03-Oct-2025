import React from 'react'
import Header from './components/Header'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import { Button } from './components/ui/button'
import TravLinButton from './components/TravLinButton'
import Testimonials from './components/Testimonials'
import SectionDivider from './components/SectionDivider'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react'


// Using TravLin Travel branded hero image for Contact Us
const contactHeroImage = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759077936/Why-Use-Travlin-travel-17_ee3rkv.png'


interface ContactPageProps {
  onNavigateBack?: () => void
  onNavigateToServices?: () => void
  onNavigateToCruises?: () => void
  onNavigateToTravelOptions?: () => void
  onNavigateToStories?: () => void
  onNavigateToAbout?: () => void
  onNavigateToAI?: () => void
  onNavigateToHome?: () => void
}

export default function ContactPage({ onNavigateBack, onNavigateToServices, onNavigateToCruises, onNavigateToTravelOptions, onNavigateToStories, onNavigateToAbout, onNavigateToAI, onNavigateToHome }: ContactPageProps) {
  const handleBackToHome = () => {
    if (onNavigateBack) {
      onNavigateBack()
      // Small delay to ensure page transition completes before scrolling
      setTimeout(() => {
        const readyToStartSection = document.getElementById('aibookingsystem')
        if (readyToStartSection) {
          readyToStartSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  // Unified navigation handlers
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
    if (onNavigateToAI) {
      onNavigateToAI()
    }
  }

  const handleNavigateToContact = () => {
    // Already on contact page, scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white relative">
      <SEOHead page="contact" />
      
      {/* Contact Form Styling */}
      <style jsx>{`
        .contact-form-container input,
        .contact-form-container select,
        .contact-form-container textarea {
          font-size: 14px !important;
          line-height: 1.4 !important;
          padding: 8px 12px !important;
        }
        
        .contact-form-container label {
          font-size: 13px !important;
          font-weight: 500 !important;
        }
        
        .contact-form-container button[type="submit"] {
          min-height: 38px !important;
          padding: 0.5rem 1rem !important;
          font-size: 14px !important;
          border-radius: 4px !important;
        }
        
        .contact-form-container h2 {
          font-size: 1.5rem !important;
          margin-bottom: 1.5rem !important;
        }
        
        @keyframes softPulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1.02); 
          }
        }
      `}</style>

      <Header 
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={handleNavigateToTravelOptions}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToStories={handleNavigateToStories}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={onNavigateToHome}
      />
      

      
      {/* Hero Section - Matching TravLin Stories Style */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24"
        style={{
          background: `linear-gradient(135deg, rgba(0, 117, 204, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.4) 100% 100%), url(${contactHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="hero-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow-strong">
              Contact Us
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 mb-8 text-shadow">
              Let's make it happen together
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed text-shadow mb-8">
              Ready to start planning your next adventure? Contact TravLin Travel today. We turn your travel dreams into reality with expert guidance and personalized service. Get in touch with our specialists to begin your unforgettable journey.
            </p>
          </div>
        </div>

        {/* Decorative Elements - Same as TravLin Stories */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-yellow-300/20 blur-lg floating-element" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Contact Us Section - Grey Background with Two White Containers */}
      <section className="section-spacing section-light">
        <div className="content-container">
          <SectionDivider />
          
          {/* Two Column Layout with White Containers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Split into Two Sections */}
            <div className="space-y-8">
              
              {/* Top Section - Contact Information */}
              <div className="bg-white p-6 rounded-lg">
                {/* Contact Information Header - Matching Send Us a Message Style */}
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
                </div>
                
                {/* Contact Details 2x2 Grid - Matching Screenshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  
                  {/* Phone - Top Left */}
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 text-sm">Phone</h4>
                      <p className="text-blue-500 font-medium text-sm">+61 415 355 851</p>
                    </div>
                  </div>
                  
                  {/* Email - Top Right */}
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ED7D31' }}>
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 text-sm">Email</h4>
                      <p className="text-blue-500 font-medium text-sm">hello@travlintravel.com.au</p>
                    </div>
                  </div>
                  
                  {/* Address - Bottom Left */}
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 text-sm">Address</h4>
                      <p className="text-gray-600 leading-tight text-sm">
                        PO BOX 7303<br />
                        KARINGAL CENTRE<br />
                        KARINGAL<br />
                        VIC 3199 AUSTRALIA
                      </p>
                    </div>
                  </div>
                  
                  {/* Business Hours - Bottom Right */}
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1 text-sm">Business Hours</h4>
                      <p className="text-gray-600 leading-tight text-sm">
                        Mon-Fri: 9:00AM - 5:30PM<br />
                        Sat: By appointment<br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                  
                </div>
                
                {/* Connect & Follow Section - Compact */}
                <div className="border-t pt-4">
                  <h4 className="text-center font-medium text-gray-700 mb-3 text-sm">CONNECT & FOLLOW</h4>
                  <div className="flex justify-center space-x-3">
                    <a 
                      href="https://facebook.com/travlintravel" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href="https://instagram.com/travlintravel" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href="https://youtube.com/@travlintravel" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                    >
                      <Youtube className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Bottom Section - AI Planner Interface */}
              <div className="bg-white p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 text-left">
                    For exploring and experimenting with any Cruise or Travel options before the human experts step in to finalize the plans, return to the AI world here.
                  </p>
                  
                  {/* Coming Soon Pulsating Button - Same as Cruises Page */}
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="px-8 py-3 text-gray-800 font-bold text-lg rounded-lg text-center"
                      style={{
                        background: `linear-gradient(135deg, var(--brand-yellow) 0%, #ffcd33 50%, var(--brand-yellow) 100%)`,
                        boxShadow: `0 15px 40px rgba(255, 192, 0, 0.8), 0 10px 25px rgba(255, 192, 0, 0.6), 0 5px 15px rgba(255, 192, 0, 0.4)`,
                        border: '3px solid rgba(255, 192, 0, 0.9)',
                        animation: 'softFlash 3s ease-in-out infinite',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      COMING SOON
                    </div>
                  </div>
                  
                  {/* Cruise Planner Button - Full Yellow */}
                  <div className="mb-3">
                    <button 
                      className="w-full py-3 px-6 text-gray-800 font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center"
                      style={{ 
                        backgroundColor: '#FFC000',
                        border: 'none',
                        borderRadius: '0px',
                        cursor: 'pointer'
                      }}
                      onClick={handleNavigateToCruises}
                    >
                      CRUISE PLANNER
                    </button>
                  </div>
                  
                  {/* Travel Planner Button - Full Yellow */}
                  <div>
                    <button 
                      className="w-full py-3 px-6 text-gray-800 font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center"
                      style={{ 
                        backgroundColor: '#FFC000',
                        border: 'none',
                        borderRadius: '0px',
                        cursor: 'pointer'
                      }}
                      onClick={handleNavigateToTravelOptions}
                    >
                      TRAVEL PLANNER
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Right Column - Contact Form with Improved Styling */}
            <div className="bg-white p-8 rounded-lg">
              <div className="contact-form-container">
                <ContactUs 
                  onNavigateToCruises={handleNavigateToCruises}
                  onNavigateToTravelOptions={handleNavigateToTravelOptions}
                  onNavigateToHome={onNavigateToHome}
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Testimonials: Auto-scrolling with Review Buttons - ONLY on Contact Page */}
      <Testimonials hideHeader={true} showReviewButtons={true} />

      
      <Footer 
        onContactClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={handleNavigateToTravelOptions}
        onNavigateToStories={handleNavigateToStories}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={onNavigateToHome}
      />
    </div>
  )
}
