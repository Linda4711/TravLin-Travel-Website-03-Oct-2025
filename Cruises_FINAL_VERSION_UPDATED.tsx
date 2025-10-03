import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import TravLinButton from './components/TravLinButton'
import { Button } from './components/ui/button'

import SectionDivider from './components/SectionDivider'
import { Input } from './components/ui/input'
import { Checkbox } from './components/ui/checkbox'
import { toast } from 'sonner'
// import emailjs from '@emailjs/browser' // Removed for build compatibility
import { 
  Ship, 
  Waves,
  Compass,
  Star,
  Search,
  Bot,
  Bell,
  Sparkles,
  Globe,
  ExternalLink,
  Calendar,
  Award,
  Shield,
  Users,
  CheckCircle,
  Anchor,
  MapPin,
  Heart
} from 'lucide-react'
import { motion } from 'framer-motion'

// LOCAL TESTING: Using Unsplash URLs (replace with figma:asset for deployment)
const cliaPromotionalImage = "https://images.unsplash.com/photo-1551287261-594c8fb5bce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDTElBJTIwY3J1aXNlJTIwY2VydGlmaWNhdGlvbiUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU4NTM5NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
const masterCruiseConsultantLogo = "https://images.unsplash.com/photo-1609771377023-7a7480af949a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXIlMjBjcnVpc2UlMjBjb25zdWx0YW50JTIwYmFkZ2V8ZW58MXx8fHwxNzU4NTM5NDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
const cruiseMonthOctoberLogo = "https://images.unsplash.com/photo-1728994532782-ea1e24406bdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY3RvYmVyJTIwY3J1aXNlJTIwbW9udGglMjBwcm9tb3Rpb25hbHxlbnwxfHx8fDE3NTg1Mzk0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"

interface CruisesProps {
  onNavigateBack?: () => void
  onNavigateToContact?: () => void
  onNavigateToServices?: () => void
  onNavigateToStories?: () => void
  onNavigateToAbout?: () => void
  onNavigateToHome?: () => void
  onNavigateToTravelOptions?: () => void
  onNavigateToCruises?: () => void
}

export default function Cruises({ onNavigateBack, onNavigateToContact, onNavigateToServices, onNavigateToStories, onNavigateToAbout, onNavigateToHome, onNavigateToTravelOptions, onNavigateToCruises }: CruisesProps) {
  // Subscription form state
  const [email, setEmail] = useState('')
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle subscription form submission
  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    
    if (!agreedToPrivacy) {
      toast.error('Please agree to the privacy policy')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Mock email functionality - replace with real implementation when emailjs is available
      console.log('AI subscription request:', {
        email,
        page: 'Cruises',
        timestamp: new Date().toISOString()
      })
      
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Thank you! You\'ll be notified as soon as our AI feature launches.')
      setEmail('')
      setAgreedToPrivacy(false)
    } catch (error) {
      console.error('EmailJS Error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Unified navigation handlers
  const handleNavigateToServices = () => {
    if (onNavigateToServices) {
      onNavigateToServices()
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

  const handleNavigateToAbout = () => {
    if (onNavigateToAbout) {
      onNavigateToAbout()
    }
  }

  const handleNavigateToHome = () => {
    if (onNavigateToHome) {
      onNavigateToHome()
    }
  }

  const handleNavigateToCruises = () => {
    if (onNavigateToCruises) {
      onNavigateToCruises()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const cruiseTypes = [
    {
      icon: Ship,
      iconColor: 'var(--brand-blue)',
      title: "Ocean Cruises",
      description: "Unpack once and step into pure indulgence! Luxurious dining, Broadway shows, pools, spas, and endless adventure aboard world-class ships with unique features like surf simulators. Your floating resort brings new horizons to your door each day."
    },
    {
      icon: Waves,
      iconColor: 'var(--brand-orange)',
      title: "River Cruises", 
      description: "Sail through the heart of history aboard intimate vessels exploring Europe's legendary Rhine, Danube, and Seine, Asia's mystical Mekong and Yangtze, plus Egypt's timeless Nile. Enjoy panoramic lounges, regional cuisine, and expert local guides who bring each destination's rich culture to life."
    },
    {
      icon: Compass,
      iconColor: 'var(--brand-yellow)',
      title: "Expedition Cruises",
      description: "Venture where few have gone before! Purpose-built ships unlock Antarctica, Arctic polar bear territories, and Galápagos wonders. Expert naturalists guide thrilling zodiac landings and unforgettable wildlife encounters in Earth's most remote frontiers."
    },
    {
      icon: Star,
      iconColor: '#000000',
      title: "Luxury Cruises",
      description: "All-suite accommodations with personal butlers, fine dining by Michelin-starred chefs, premium beverages, exclusive shore excursions, smaller ship capacity, personalised service, spa treatments, and curated experiences in marquee destinations worldwide."
    }
  ]

  return (
    <div className="min-h-screen bg-white relative">
      <SEOHead page="cruises" />

      <Header 
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={handleNavigateToTravelOptions}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToStories={handleNavigateToStories}
        onNavigateToAbout={handleNavigateToAbout}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={handleNavigateToHome}
      />
      
      {/* Hero Section - STRIKING MEDITERRANEAN CRUISE IMAGE */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24"
        style={{
          background: `linear-gradient(135deg, rgba(0, 117, 204, 0.45) 0%, rgba(237, 125, 49, 0.35) 100%), url("https://images.unsplash.com/photo-1526402935402-6659f6844efc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwJTIwY29sb3JmdWwlMjBtZWRpdGVycmFuZWFufGVufDF8fHx8MTc1ODQ0NjE0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="hero-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow-strong">
              Cruises
            </h1>
            <h2 className="text-2xl md:text-3xl text-white/95 mb-8 font-semibold text-shadow">
              Your Cruise Masters
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed text-shadow">
              Your ultimate adventure awaits with our agency - your go-to experts for unforgettable cruises! We specialise in all forms of cruise - Ocean, River, Expedition, Luxury. As proud CLIA Cruise Masters, we ensure expert guidance and unparalleled service.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-yellow-300/20 blur-lg floating-element" style={{animationDelay: '2s'}}></div>
      </section>

      {/* CLIA Specialists Section - CLEAN BADGE DISPLAY */}
      <section className="pt-16 pb-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-64 h-64 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <SectionDivider />
          </div>

          {/* Two Column Layout - FIXED PROPORTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* LEFT Column - RESTORED ORIGINAL LAYOUT */}
            <div className="relative">
              <div className="relative max-w-sm mx-auto lg:max-w-full">
                {/* Square Cruise Image - RESTORED ORIGINAL */}
                <div 
                  className="relative overflow-hidden"
                  style={{ 
                    borderRadius: '0px',
                    boxShadow: '0 20px 40px rgba(0, 117, 204, 0.08), 0 8px 16px rgba(237, 125, 49, 0.06)',
                    width: '320px',
                    height: '320px',
                    margin: '0 auto'
                  }}
                >
                  <img 
                    src={cliaPromotionalImage}
                    alt="CLIA - Cruise Lines International Association"
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '0px' }}
                  />
                </div>
                
                {/* CLIA Logo - OVERLAY ON TOP RIGHT CORNER - RESTORED ORIGINAL */}
                <div 
                  className="absolute -top-3 -right-6 z-10 w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52"
                  style={{
                    transform: 'rotate(-8deg)'
                  }}
                >
                  <div 
                    className="w-full h-full relative overflow-hidden"
                    style={{ 
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      border: '3px solid white'
                    }}
                  >
                    <img 
                      src={masterCruiseConsultantLogo}
                      alt="Master Cruise Consultant - CLIA Certified"
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT Column - ENHANCED CONTENT */}
            <div className="flex flex-col justify-center text-left">
              <div className="space-y-2">
                <p className="text-xl text-gray-700 leading-relaxed">
                  With extensive cruise industry training, CLIA certification, and personal sailing experience, we provide expert guidance that goes beyond basic booking. We understand ship layouts, dining options, excursion values, and cabin categories to ensure your investment delivers maximum enjoyment.
                </p>
                
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our specialization extends to group celebrations, multi-generational family gatherings, and milestone events at sea. From intimate river cruises through Europe to grand expedition voyages to Antarctica, we match your personality, budget, and dreams with the perfect cruise experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cruise Month is Coming Section - CLEAN VERSION */}
      <section className="pt-6 pb-12 relative overflow-hidden bg-gray-50">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-48 h-48 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-16 right-32 w-40 h-40 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '3s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <SectionDivider />
            
            {/* Heading with Logo to the Side - RESTORED ORIGINAL */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <h2 className="section-heading mb-0">Cruise Month is Coming!</h2>
              
              {/* Cruise Month October Logo - RESTORED ORIGINAL WITH UNSPLASH */}
              <div className="relative flex-shrink-0" style={{ transform: 'rotate(8deg)' }}>
                <div 
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 relative overflow-hidden drop-shadow-lg"
                  style={{ 
                    borderRadius: '50%',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <img 
                    src={cruiseMonthOctoberLogo}
                    alt="October is Cruise Month"
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '50%' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-orange-400/20 rounded-full blur-xl -z-10"></div>
              </div>
            </div>

            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get ready for the ultimate celebration of cruising! Discover exclusive promotions and spectacular special offers during Cruise Month October, featuring <strong style={{ color: 'var(--brand-blue)' }}>Ocean Week</strong>, <strong style={{ color: 'var(--brand-orange)' }}>River Week</strong>, <strong style={{ color: 'var(--brand-yellow)' }}>Expedition Week</strong>, and <strong style={{ color: '#000000' }}>Luxury Week</strong>. Whether you're dreaming of Mediterranean sunsets, Caribbean adventures, or Arctic expeditions to meet those adorable polar bears, we'll match you with the perfect cruise experience. There truly is a cruise for everyone - and October is your month to set sail!
            </p>
          </div>
        </div>
      </section>

      {/* Which Cruise is You Section - WITH CRUISE BACKGROUND */}
      <section 
        className="pt-16 pb-16 relative overflow-hidden" 
        style={{
          background: `linear-gradient(135deg, rgba(248, 249, 250, 0.75) 0%, rgba(233, 236, 239, 0.65) 100%), url("https://images.unsplash.com/photo-1694606025576-984337e79764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwJTIwb2NlYW4lMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1ODQ0Njk4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-10 right-20 w-28 h-28 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Which Cruise is You?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cruiseTypes.map((cruise, index) => {
                const IconComponent = cruise.icon
                return (
                  <div 
                    key={index}
                    className="travel-card text-center p-8 group hover:scale-105 transition-all duration-500 relative overflow-hidden watercolor-shadow"
                    style={{ 
                      minHeight: '320px',
                      borderRadius: index % 2 === 0 ? '20px 8px 20px 8px' : '8px 20px 8px 20px'
                    }}
                  >
                    {/* Decorative corner element - similar to TravLin Advantage */}
                    <div 
                      className="absolute top-0 right-0 w-16 h-16 opacity-15 floating-element"
                      style={{
                        background: index % 4 === 0 ? 'var(--brand-blue)' : 
                                   index % 4 === 1 ? 'var(--brand-orange)' : 
                                   index % 4 === 2 ? 'var(--brand-yellow)' : 
                                   'var(--gray-600)',
                        borderRadius: '0 20px 0 80%',
                        transform: 'scale(0.7)',
                        animationDelay: `${index * 0.3}s`
                      }}
                    ></div>
                    
                    {/* Subtle watercolor background blob */}
                    <div 
                      className="absolute bottom-4 left-4 w-12 h-12 opacity-10 floating-element"
                      style={{
                        background: `radial-gradient(ellipse at center, ${cruise.iconColor} 0%, ${cruise.iconColor} 30%, transparent 70%)`,
                        borderRadius: '60% 40% 70% 30%',
                        filter: 'blur(2px)',
                        animationDelay: `${index * 0.7}s`
                      }}
                    ></div>

                    {/* Geometric accent line */}
                    <div 
                      className="absolute top-6 left-6 w-8 h-0.5 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, ${cruise.iconColor} 0%, transparent 100%)`,
                        transform: `rotate(${index * 15}deg)`
                      }}
                    ></div>

                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 relative"
                      style={{ backgroundColor: cruise.iconColor }}
                    >
                      <IconComponent 
                        className={`w-8 h-8 ${cruise.iconColor === '#000000' ? 'text-white' : cruise.iconColor === 'var(--brand-yellow)' ? 'text-gray-800' : 'text-white'}`} 
                      />
                      
                      {/* Enhanced icon glow effect */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                        style={{ 
                          background: `radial-gradient(circle, ${cruise.iconColor} 0%, transparent 70%)`,
                          filter: 'blur(12px)',
                          transform: 'scale(1.8)'
                        }}
                      ></div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{cruise.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{cruise.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Cruise Journey Section - WITH WAVE ICONS */}
      <section className="pt-20 pb-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-56 h-56 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '3s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <SectionDivider />
            
            {/* HEADING WITH WAVE ICONS */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <Waves className="w-8 h-8 text-blue-500 animate-bounce" style={{animationDelay: '0s'}} />
              <h2 className="section-heading mb-0">Ready to Start your Cruise Journey?</h2>
              <Waves className="w-8 h-8 text-blue-500 animate-bounce" style={{animationDelay: '1s'}} />
            </div>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
              Choose how you'd like to proceed with planning your perfect cruise adventure. Our experienced CLIA-certified cruise specialists are also at human hand to help you perfect your voyage.
            </p>
          </div>

          {/* Single Column Layout */}
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* FIRST - Ready, Set, Sail and Save Box */}
            <div 
              className="bg-white border border-gray-200 p-10 relative overflow-hidden travel-card"
              style={{ 
                borderRadius: '16px',
                minHeight: '400px'
              }}
            >
              <div className="text-center h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--brand-blue)' }}>
                  Ready, Set, Sail and Save
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  As CLIA Cruise Specialists with firsthand cruise experience, we understand what makes each voyage special. Our cruise search feature offers access to over 60,000 sailings, cruise/air package deals, and exclusive discounts not even found direct with cruise lines. Whether you're planning your first cruise or you're a seasoned sailor, we can match you with the perfect ship, itinerary, and cabin to create unforgettable memories, so take the first step and start your search.
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="https://travlin-travel.cruiseco.com.au/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <TravLinButton
                      variant="blue"
                      size="reduced"
                      className="shadow-2xl square-button-force w-full sm:w-auto"
                      style={{
                        borderRadius: '4px',
                        minHeight: '38px',
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem'
                      }}
                    >
                      SEARCH CRUISES
                    </TravLinButton>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* SECOND - AI Cruise Section - Outside the Box Two Column Layout */}
            <div 
              data-ai-cruise-section
              className="relative overflow-hidden bg-gray-50 rounded-lg p-8" 
              style={{ 
                position: 'relative'
              }}
            >
              {/* COMING SOON Banner - Compact */}
              <div 
                className="absolute top-4 left-0 right-0 mx-auto w-fit rotate-2 text-gray-800 text-lg font-black px-8 py-3 rounded-lg z-40"
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

              {/* AI Content - Compact Two Column Layout */}
              <div className="relative z-10 pt-16">
                {/* Header with Icon and Title */}
                <div className="text-center mb-6">
                  <div className="relative mb-4 mx-auto">
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center relative mx-auto"
                      style={{ 
                        background: `linear-gradient(135deg, var(--brand-yellow) 0%, #ffcd33 50%, var(--brand-yellow) 100%)`,
                        boxShadow: '0 6px 20px rgba(255, 192, 0, 0.4)'
                      }}
                    >
                      <Star className="w-7 h-7 text-gray-800 animate-soft-flash" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--brand-yellow)' }}>
                    AI Cruise Planning is Coming!
                  </h3>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  
                  {/* LEFT COLUMN - Content */}
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Discover revolutionary AI cruise planning that transforms how you find your perfect voyage! Just imagine... a system that instantly matches your preferences with ideal itineraries, cabins, and experiences.
                    </p>
                    
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Whether you're a first-time cruiser, a seasoned sailor or planning milestone celebrations at sea, cutting-edge AI technology combined with trusted human expertise can help create your ultimate cruise planning experience! Something we are striving towards!
                    </p>
                  </div>

                  {/* RIGHT COLUMN - Form */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                      <p className="text-sm text-gray-800">
                        <strong>Be the First to pounce at Launch</strong>
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubscription} className="space-y-3">
                      <div>
                        <Input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-10 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacy-agreement"
                          checked={agreedToPrivacy}
                          onCheckedChange={setAgreedToPrivacy}
                          disabled={isSubmitting}
                          className="mt-1"
                        />
                        <label
                          htmlFor="privacy-agreement"
                          className="text-xs text-gray-600 leading-tight cursor-pointer"
                        >
                          I agree to receive emails about the AI feature launch and understand my data will be handled according to the privacy policy.
                        </label>
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 text-sm py-2 px-4 rounded font-medium transition-colors duration-200 disabled:opacity-50"
                        style={{ 
                          minHeight: '36px',
                          borderRadius: '4px'
                        }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-gray-800/30 border-t-gray-800 rounded-full animate-spin"></div>
                            <span>Subscribing...</span>
                          </div>
                        ) : (
                          'NOTIFY ME AT LAUNCH'
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        onContactClick={handleNavigateToContact}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToAbout={handleNavigateToAbout}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={handleNavigateToTravelOptions}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToStories={handleNavigateToStories}
      />
    </div>
  )
}