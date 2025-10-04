import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import SectionDivider from './components/SectionDivider'
import TravLinButton from './components/TravLinButton'
import { Button } from './components/ui/button'

import { Input } from './components/ui/input'
import { Checkbox } from './components/ui/checkbox'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
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
const cliaPromotionalImage = "https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759074515/CLIA_Image_9_web7uj.png"
const masterCruiseConsultantLogo = "https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759074414/2024_Master_Cruise_Consultant_undated_izynfv.png"
const cruiseMonthOctoberLogo = "https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759074482/October_is_Cruise_Month_yeiifn.png"

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
      // EmailJS Configuration - LIVE
      const serviceId = 'service_rlnjyuj'
      const templateId = 'template_aiumzob'
      const publicKey = 'GY6ImN3fkI91A6mGw'
      
      const templateParams = {
        from_name: 'AI Cruise Subscription',
        from_email: email,
        message: `New AI Cruise Planner subscription from ${email}. User wants to be notified when AI cruise planning feature becomes available.`,
        to_email: 'hello@travlintravel.com.au'
      }
      
      // Send email via EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('✅ AI Cruise notification subscription sent via EmailJS')
      
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
      title: "Ocean",
      description: "Unpack once and explore all seven seas! Intimate ships to mega-ships with Broadway shows, pools, spas, and surf simulators. Every budget and demographic across the Caribbean, Mediterranean, Pacific, Atlantic, and beyond."
    },
    {
      icon: Waves,
      iconColor: 'var(--brand-orange)',
      title: "River", 
      description: "Sail through history aboard intimate vessels exploring Europe's Rhine, Danube, and Seine, Asia's Mekong and Yangtze, plus Egypt's Nile. Panoramic lounges, regional cuisine, and expert local guides bring each destination's culture to life."
    },
    {
      icon: Compass,
      iconColor: 'var(--brand-yellow)',
      title: "Expedition",
      description: "Venture where few have gone before! Purpose-built ships unlock Antarctica, Arctic polar bear territories, and Galápagos wonders. Expert naturalists guide zodiac landings and wildlife encounters in Earth's most remote frontiers."
    },
    {
      icon: Star,
      iconColor: '#000000',
      title: "Luxury",
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
      
      {/* Hero Section - AZURE LAGOON CRUISE DESTINATION */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24"
        style={{
          background: `linear-gradient(135deg, rgba(0, 117, 204, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.4) 100% 100%), url("https://images.unsplash.com/photo-1592036930568-5c7543f818eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwJTIwZGVzdGluYXRpb24lMjBhenVyZSUyMGxhZ29vbnxlbnwxfHx8fDE3NTg0MzQwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
          backgroundSize: window.innerWidth <= 768 ? 'cover' : 'cover',
          backgroundPosition: window.innerWidth <= 768 ? 'center 40%' : 'center bottom',
          backgroundAttachment: window.innerWidth <= 768 ? 'scroll' : 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="hero-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white text-shadow-strong">
              Cruises
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 font-semibold text-white text-shadow">
              Your Cruise Masters
            </h2>
            <p className="text-xl max-w-5xl mx-auto leading-relaxed text-white text-shadow">
              Your ultimate adventure awaits with our agency - your go-to experts for unforgettable cruises! We specialise in all forms of cruise - Ocean, River, Expedition, Luxury. As proud CLIA Cruise Masters, we ensure expert guidance and unparalleled service.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-yellow-300/20 blur-lg floating-element" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Why Choose TravLin Travel Section */}
      <section className="section-spacing section-white">
        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-64 h-64 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '2s'}}></div>
        
        <div className="content-container">
          <SectionDivider />

          {/* Two Column Layout - FIXED PROPORTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT Column - RESTORED ORIGINAL LAYOUT */}
            <div className="relative">
              <div className="relative max-w-sm mx-auto lg:max-w-full">
                {/* Square Cruise Image - RESTORED ORIGINAL */}
                <div 
                  className="relative overflow-hidden"
                  style={{ 
                    borderRadius: '0px',
                    boxShadow: '0 20px 40px rgba(0, 117, 204, 0.08), 0 8px 16px rgba(237, 125, 49, 0.06)',
                    width: '360px',
                    height: '360px',
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
              <p className="text-description-large margin-bottom">
                With extensive cruise industry training, CLIA certification at the highest level, and personal cruise experience, we provide expert guidance beyond booking. We understand ship layouts, dining, excursions, and cabins to maximize your cruise experience.
              </p>
              
              <p className="text-description-large">
                Whether celebrating with a group, planning a family trip, or marking a milestone at sea, we tailor the perfect cruise to fit your personality, budget, and dreams. From oceans to river cruises through Europe to expeditions in Antarctica, we match you with the ideal voyage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cruise Month is Coming Section - ENHANCED BACKGROUND GRADIENT */}
      <section 
        className="py-12 bg-gray-50 relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, rgba(249, 250, 251, 0.3) 0%, rgba(249, 250, 251, 0.8) 25%, #f9fafb 50%, #f9fafb 100%)`
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-48 h-48 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-16 right-32 w-40 h-40 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '3s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionDivider />
          <div className="text-center">
            
            {/* Heading with Logo to the Side - RESTORED ORIGINAL */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-0">Cruise Month is Coming!</h2>
              
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

            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Every October, the world's leading cruise lines showcase the very best of cruising. With themed weeks including <strong style={{ color: 'var(--brand-blue)' }}>Ocean Week</strong>, <strong style={{ color: 'var(--brand-orange)' }}>River Week</strong>, <strong style={{ color: 'var(--brand-yellow)' }}>Expedition Week</strong>, and <strong style={{ color: '#000000' }}>Luxury Week</strong>, it's the perfect time to discover the incredible variety of experiences cruising can offer. Whether you dream of Mediterranean sunsets, Caribbean adventures, or Arctic expeditions to spot polar bears, when it comes to cruising, there truly is something for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Which Cruise is You Section - WITH CRUISE BACKGROUND */}
      <section 
        className="py-16 bg-white relative overflow-hidden" 
        style={{
          background: `linear-gradient(135deg, rgba(248, 249, 250, 0.75) 0%, rgba(233, 236, 239, 0.65) 100%), url("https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759077911/b987ead2-b0b6-4c13-83fa-83894a3e671e_hvxzwq.jpg")`,
          backgroundSize: window.innerWidth <= 768 ? 'cover' : 'cover',
          backgroundPosition: window.innerWidth <= 768 ? 'center 30%' : 'center',
          backgroundAttachment: window.innerWidth <= 768 ? 'scroll' : 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-10 right-20 w-28 h-28 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionDivider />
          <div className="text-center mb-20">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8">Which Cruise is You?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cruiseTypes.map((cruise, index) => {
                const IconComponent = cruise.icon
                return (
                  <div 
                    key={index}
                    className="group watercolor-shadow border-0 overflow-hidden bg-white hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 relative p-8 text-center"
                    style={{ 
                      borderRadius: index % 2 === 0 ? '30px 10px 30px 10px' : '10px 30px 10px 30px',
                      minHeight: '320px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start'
                    }}
                  >
                    {/* Decorative corner */}
                    <div className={`absolute top-0 right-0 w-20 h-20 opacity-20 ${
                      index % 4 === 0 ? 'watercolor-blob' : 
                      index % 4 === 1 ? 'watercolor-blob-coral' : 
                      index % 4 === 2 ? 'bg-gradient-to-br from-yellow-300 to-yellow-400' :
                      'bg-gradient-to-br from-gray-600 to-gray-700'
                    }`} style={{
                      borderRadius: '0 30px 0 100%',
                      transform: 'scale(0.8)'
                    }}></div>
                    
                    <div
                      className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl"
                      style={{ 
                        background: cruise.iconColor,
                        color: cruise.iconColor === 'var(--brand-yellow)' ? 'var(--gray-800)' : 'white',
                        boxShadow: `0 8px 25px ${
                          cruise.iconColor === 'var(--brand-blue)' ? 'rgba(0, 117, 204, 0.3)' : 
                          cruise.iconColor === 'var(--brand-orange)' ? 'rgba(237, 125, 49, 0.3)' : 
                          cruise.iconColor === 'var(--brand-yellow)' ? 'rgba(255, 192, 0, 0.3)' :
                          'rgba(0, 0, 0, 0.3)'
                        }`
                      }}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <h3 className="mb-4 text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors duration-300" style={{ color: 'var(--gray-800)' }}>
                      {cruise.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {cruise.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Cruise Journey Section - WITH WAVE ICONS */}
      <section className="pt-16 pb-24 bg-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-56 h-56 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '3s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionDivider />
          <div className="text-center mb-12">
            
            {/* HEADING WITH WAVE ICONS */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <Waves className="w-8 h-8 text-blue-500 animate-bounce" style={{animationDelay: '0s'}} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-0">Ready to Start your Cruise Journey?</h2>
              <Waves className="w-8 h-8 text-blue-500 animate-bounce" style={{animationDelay: '1s'}} />
            </div>
            
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Start your cruise journey your way — search cruises at your own pace or explore a cruise conversation with AI. Rest assured, our standard of excellence through CLIA-certified cruise specialists is always on hand to help you tailor and perfect exactly what your ideal cruise experience looks like.
            </p>
          </div>

          {/* Single Column Layout */}
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* FIRST - Ready, Set, Sail and Save Box */}
            <div 
              className="bg-white border border-gray-200 p-10 relative overflow-hidden watercolor-shadow"
              style={{ 
                borderRadius: '16px',
                minHeight: '400px'
              }}
            >
              <div className="text-center h-full flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--brand-blue)' }}>
                  Ready, Set, Sail and Save
                </h3>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  As CLIA-certified Cruise Specialists, we know what makes cruise voyages special. With access to over 60,000 sailings, exclusive cruise-and-air packages, and savings you won't find elsewhere, we'll help match you to the right ship, itinerary, and stateroom for memories that last a lifetime.
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
                        borderRadius: '0px',
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
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--brand-yellow)' }}>
                    AI Cruise Planning is Coming!
                  </h3>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  
                  {/* LEFT COLUMN - Content */}
                  <div className="space-y-3">
                    <p className="text-base text-gray-600 leading-relaxed">
                      Discover a fun way to start planning your perfect cruise with revolutionary AI technology. Imagine this... a smart assistant that helps you find your best cruise, whether as a first-time cruiser, a seasoned sailor, or planning that celebration at sea. We're still crafting this innovative tool with aim to enhance your TravLin experience right from the onset—but rest assured, our cruise specialists will always be behind the scenes, guiding you every step of the way, and then making it happen.
                    </p>
                  </div>

                  {/* RIGHT COLUMN - Form */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                      <p className="text-sm text-gray-800">
                        <strong>Be the first to pounce</strong>
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubscription} className="space-y-3">
                      <div>
                        <Input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacy-agreement"
                          checked={agreedToPrivacy}
                          onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                          className="mt-1"
                        />
                        <label htmlFor="privacy-agreement" className="text-xs text-gray-600 leading-relaxed">
                          I agree to receive email updates about AI cruise planning features and acknowledge the privacy policy.
                        </label>
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-3 px-6 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: isSubmitting ? 'var(--gray-400)' : 'var(--brand-yellow)',
                          color: 'var(--gray-800)'
                        }}
                      >
                        {isSubmitting ? 'Subscribing...' : 'NOTIFY ME'}
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
