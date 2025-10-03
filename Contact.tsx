import React from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import TravLinButton from './components/TravLinButton'

interface ContactPageProps {
  onNavigateToHome: () => void
  onNavigateToAbout: () => void
  onNavigateToCruises: () => void
  onNavigateToTravelOptions: () => void
  onNavigateToStories: () => void
}

export default function ContactPage({
  onNavigateToHome,
  onNavigateToAbout,
  onNavigateToCruises,
  onNavigateToTravelOptions,
  onNavigateToStories
}: ContactPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      <SEOHead page="contact" />
      
      <Header 
        onNavigateToHome={onNavigateToHome}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCruises={onNavigateToCruises}
        onNavigateToTravelOptions={onNavigateToTravelOptions}
        onNavigateToContact={() => {}}
        onNavigateToStories={onNavigateToStories}
      />
      
      <main className="pt-20">
        <section className="section-spacing section-white">
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              className="section-heading text-center mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Contact Us
            </motion.h1>
            
            <motion.div 
              className="max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="mb-6">
                Ready to start planning your dream vacation? Our travel experts are here to help 
                you create the perfect getaway. Contact us today to begin your journey.
              </p>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h3>
                <p className="mb-4">
                  <strong>Phone:</strong> 1-800-TRAVLIN (1-800-872-8546)
                </p>
                <p className="mb-4">
                  <strong>Email:</strong> info@travlintravel.com
                </p>
                <p>
                  <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TravLinButton 
                variant="blue"
                size="lg" 
                onClick={onNavigateToHome}
              >
                BACK TO HOME
              </TravLinButton>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer 
        onContactClick={() => {}}
        onNavigateToHome={onNavigateToHome}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCruises={onNavigateToCruises}
        onNavigateToTravelOptions={onNavigateToTravelOptions}
        onNavigateToContact={() => {}}
        onNavigateToStories={onNavigateToStories}
      />
    </motion.div>
  )
}