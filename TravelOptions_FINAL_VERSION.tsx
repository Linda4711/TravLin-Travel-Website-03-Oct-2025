import React, { useState } from 'react'
import Header from './components/Header'
import WhatsTrending from './components/WhatsTrending'
import TravelInsurance from './components/TravelInsurance'
import UsefulLinksCompact from './components/UsefulLinksCompact'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import SectionDivider from './components/SectionDivider'

import { ImageWithFallback } from './components/figma/ImageWithFallback'
import TravLinButton from './components/TravLinButton'
import { Input } from './components/ui/input'
import { Checkbox } from './components/ui/checkbox'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import { 
  Home, 
  Globe, 
  CheckCircle, 
  Users, 
  Heart, 
  Shield, 
  MapPin, 
  Plane, 
  Car,
  FileText,
  Phone,
  Headphones,
  CreditCard,
  Calendar,
  Star
} from 'lucide-react'
import { motion } from 'framer-motion'

interface TravelOptionsProps {
  onNavigateBack?: () => void
  onNavigateToContact?: () => void
  onNavigateToServices?: () => void
  onNavigateToStories?: () => void
  onNavigateToAbout?: () => void
  onNavigateToHome?: () => void
  onNavigateToCruises?: () => void
  onNavigateToTravelOptions?: () => void
}

export default function TravelOptions({ onNavigateBack, onNavigateToContact, onNavigateToServices, onNavigateToStories, onNavigateToAbout, onNavigateToHome, onNavigateToCruises, onNavigateToTravelOptions }: TravelOptionsProps) {
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
        from_name: 'AI Travel Subscription',
        from_email: email,
        message: `New AI Travel Planner subscription from ${email}. User wants to be notified when AI travel planning feature becomes available.`,
        to_email: 'hello@travlintravel.com.au'
      }
      
      // Send email via EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('✅ AI Travel notification subscription sent via EmailJS')
      
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

  // Travel services data - improved titles and balanced content
  const travelServices = [
    {
      title: 'Escorted Touring',
      benefit: 'Discover destinations with insider knowledge and cultural insights through expert local guides while enjoying hassle-free group travel, small group adventures, or semi-independent touring with like-minded explorers for authentic experiences'
    },
    {
      title: 'Independent Travel',
      benefit: 'Experience air and land packages with fully tailored private itineraries utilizing our access to our trusted network of air and accommodation suppliers, perfectly coordinated for your complete freedom and personalized travel experience'
    },
    {
      title: 'Transport Solutions',
      benefit: 'Your journey matters more than just booking - experience seamless stress-free travel via expert advice surrounding car hire, rail connections, transfers, and internal air services that prioritize your comfort and enjoyment whilst away'
    },
    {
      title: 'Visas, Insurance, Advice',
      benefit: 'Navigate visa requirements effortlessly with Visa Services expert assistance, stay informed with real-time travel updates and safety alerts, and protect your investment with comprehensive travel insurance coverage and ongoing support'
    }
  ]

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

  return (
    <div className="min-h-screen bg-white relative">
      <SEOHead page="travel-options" />

      

      <Header 
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={onNavigateToTravelOptions || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToStories={handleNavigateToStories}
        onNavigateToAbout={handleNavigateToAbout}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={handleNavigateToHome}
      />
      
      {/* Hero Section - Travel Options Focused with Iconic Mykonos Windmills at Sunset */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24"
        style={{
          background: `linear-gradient(135deg, rgba(0, 117, 204, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.4) 100% 100%), url("https://images.unsplash.com/photo-1696519668789-ce564581ddf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteWtvbm9zJTIwd2luZG1pbGxzJTIwd2hpdGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU4NDUyNTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
          backgroundSize: window.innerWidth <= 768 ? 'cover' : '115%',
          backgroundPosition: window.innerWidth <= 768 ? 'center 35%' : 'center 65%',
          backgroundAttachment: window.innerWidth <= 768 ? 'scroll' : 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="hero-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow-strong">
              Travel Options
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/95 mb-6 text-shadow">
              Complete Travel Solutions
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed text-shadow mb-8">
              Beyond cruising, we deliver complete travel solutions through trusted partnerships. From escorted tours and independent adventures to accommodation, transport, visa services and travel insurance - we exceed expectations at every step.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-yellow-300/20 blur-lg floating-element" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Travel Options Services Section - White Background */}
      <section id="travel-options-services" className="section-spacing section-white relative overflow-hidden">
        {/* Background watercolor elements */}
        <div className="absolute top-20 left-10 w-56 h-56 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 watercolor-blob-coral opacity-15 floating-element" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 opacity-20 floating-element" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <SectionDivider />
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Travel Solutions</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive travel services designed to exceed your expectations at every step of your journey.
            </p>
          </div>
          
          {/* Travel Services - Improved Grid Layout with Better Spacing */}
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 max-w-6xl mx-auto">
            {travelServices.map((service, index) => (
              <div key={index} className="flex items-start space-x-4 group hover:transform hover:scale-102 transition-all duration-300">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" 
                     style={{ backgroundColor: '#22c55e' }}>
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight transition-colors duration-300 group-hover:text-[var(--brand-blue)]">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {service.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Trending Section */}
      <section className="section-spacing section-light">
        <WhatsTrending onNavigateToContact={onNavigateToContact} />
      </section>

      {/* Ready to Plan Your Adventure Section - WITH PLANE ICONS */}
      <section className="section-spacing section-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-56 h-56 watercolor-blob opacity-10 floating-element"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '3s'}}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <SectionDivider />
          <div className="text-center mb-12">
            
            {/* HEADING WITH PLANE ICONS */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <Plane className="w-8 h-8 text-orange-500 animate-bounce" style={{animationDelay: '0s'}} />
              <h2 className="section-heading mb-0">Ready to Plan Your Adventure?</h2>
              <Plane className="w-8 h-8 text-orange-500 animate-bounce" style={{animationDelay: '1s'}} />
            </div>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
              Choose how you'd like to begin planning your ideal travel experience. Have fun exploring options with AI, while our 'human' travel specialists are at the ready to step in and help you discover incredible destinations to create those unforgettable memories.
            </p>
          </div>

          {/* Single Column Layout */}
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* AI Travel Section - Outside the Box Two Column Layout */}
            <div 
              data-ai-travel-section
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
                    AI Travel Planning is Coming!
                  </h3>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  
                  {/* LEFT COLUMN - Content */}
                  <div className="space-y-3">
                    <p className="text-base text-gray-600 leading-relaxed">
                      Discover an exciting way to start planning your perfect travel adventure with revolutionary AI technology. Imagine a smart assistant that helps you find your ideal travel experience, whether it's escorted tours, independent exploration, romantic getaways, or milestone celebrations abroad. We're crafting this innovative tool to enhance your TravLin experience—but rest assured, our travel specialists will always be guiding you every step of the way.
                    </p>
                  </div>

                  {/* RIGHT COLUMN - Form */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                      <p className="text-sm text-gray-800">
                        <strong>Be the first to jump around</strong>
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
                          I agree to receive email updates about AI travel planning features and acknowledge the privacy policy.
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

      {/* Travel Insurance Section - REFRESHED */}
      <section className="py-4 section-white">
        <TravelInsurance />
      </section>
      
      <Footer 
        onNavigateToContact={onNavigateToContact}
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToStories={handleNavigateToStories}
        onNavigateToAbout={handleNavigateToAbout}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={handleNavigateToHome}
      />
    </div>
  )
}
