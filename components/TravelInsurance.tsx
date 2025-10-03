import React, { useState } from 'react'
import { Shield, ExternalLink, Phone, Users, Plus, Minus, Heart, FileText, Luggage, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
// import { Button } from './ui/button' // Removed - using TravLinButton instead
import { Card, CardContent } from './ui/card'
import SectionDivider from './SectionDivider'
import TravLinButton from './TravLinButton'
import { toast } from 'sonner'

export default function TravelInsurance() {
  const covermoreLink = "https://secure.covermore.com.au/agent/home.aspx?AlphaCode=CTV0181"
  const phoneNumber = "1300728822"  // 1300 72 88 22
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Non-clickable benefits - combined into one tile
  const mainBenefits = [
    {
      title: "Agency Connected Service",
      description: "Direct agency connection ensures seamless support and assistance throughout your travel experience."
    },
    {
      title: "Multiple Provider Access", 
      description: "Access to various leading insurance providers for comprehensive coverage comparison and selection."
    }
  ]

  // Clickable benefit - separate square tile
  const clickableBenefit = {
    title: "Medical Assessment",
    description: "Professional assessment is available for travellers with pre-existing medical conditions not automatically covered. Obtain your quote and then call.",
    isClickable: true
  }

  const faqs = [
    {
      question: "When should I purchase travel insurance?",
      answer: "Ideally, purchase travel insurance soon after booking your trip to ensure maximum coverage benefits, including cancellation protection from the purchase date."
    },
    {
      question: "What does travel insurance typically cover?",
      answer: "Standard coverage includes medical emergencies, trip cancellation/interruption, luggage protection, and travel delays. Specific coverage varies by policy."
    },
    {
      question: "Do I need travel insurance for domestic travel?",
      answer: "While not mandatory, domestic travel insurance can provide valuable protection for trip cancellation, medical emergencies, and luggage issues even within Australia."
    },
    {
      question: "How do pre-existing medical conditions affect coverage?",
      answer: "Pre-existing conditions may require disclosure and medical assessment. Contact us for professional guidance on appropriate coverage options."
    }
  ]

  return (
    <div id="travelinsurance" className="relative overflow-hidden">
      {/* Subtle Background Decorative Elements - Specific to Travel Insurance Section */}
      <div className="absolute top-16 left-8 w-28 h-28 rounded-full opacity-[0.03] pointer-events-none z-0" 
           style={{ background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-12 right-10 w-20 h-20 rounded-full opacity-[0.04] pointer-events-none z-0" 
           style={{ background: 'radial-gradient(circle, var(--brand-orange) 0%, transparent 70%)' }}></div>
      <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full opacity-[0.02] pointer-events-none z-0" 
           style={{ background: 'radial-gradient(ellipse, var(--brand-yellow) 0%, transparent 80%)' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Matching Separator Spacing from "Ready to Plan" Section */}
        <div className="text-center mb-6">
          <SectionDivider />
          <h2 className="section-heading">Travel Insurance</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Travel with complete peace of mind. Our trusted insurance solutions provide comprehensive protection and safeguard your investment from departure to return.
          </p>
        </div>

        {/* Essential Coverage Areas - Horizontal Badge Layout */}
        <div className="mb-8">
          <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">Essential Coverage Areas</h3>
          
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {/* Medical */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 bg-white shadow-sm">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--brand-blue)' }}>
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800 text-sm">Medical</span>
            </div>

            {/* Cancellation */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-orange-500 bg-white shadow-sm">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--brand-orange)' }}>
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800 text-sm">Cancellation</span>
            </div>

            {/* Luggage */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-yellow-500 bg-white shadow-sm">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--brand-yellow)' }}>
                <Luggage className="w-4 h-4 text-gray-800" />
              </div>
              <span className="font-semibold text-gray-800 text-sm">Luggage</span>
            </div>

            {/* Disruption */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 bg-white shadow-sm">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--brand-blue)' }}>
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800 text-sm">Disruption</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout - Equal Height Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* LEFT COLUMN - Benefits */}
          <div className="flex flex-col h-full">
            {/* Animated Heading */}
            <motion.h3 
              className="text-xl font-bold text-center text-gray-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Why Choose Us
            </motion.h3>
            
            {/* Benefits Tile - Flex Grow to Match Right Column */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 flex-1">
              <div className="space-y-4">
                {mainBenefits.map((benefit, index) => (
                  <div key={index}>
                    <h5 className="font-semibold text-gray-800 mb-1 text-sm">
                      {benefit.title}
                    </h5>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - FAQs */}
          <div className="flex flex-col h-full">
            {/* Animated Heading */}
            <motion.h3 
              className="text-xl font-bold text-center text-gray-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Frequently Asked Questions
            </motion.h3>
            
            {/* FAQ Items - Flex Grow to Match Left Column */}
            <div className="flex-1 space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                     style={{ borderRadius: '4px' }}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-4 py-2.5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-gray-800 pr-3 leading-tight">{faq.question}</h4>
                    {expandedFaq === index ? (
                      <Minus className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-3 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-2 text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Width Medical Assessment & Quote Section - Ultra Compact */}
        <div className="mt-4">
          <div 
            className="w-full border-2 p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
            style={{ 
              borderRadius: '4px',
              borderColor: 'var(--brand-blue)'
            }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
              
              {/* Orange Quote Button - First - NO ICON */}
              <div className="flex-shrink-0">
                <TravLinButton 
                  onClick={() => window.open(covermoreLink, '_blank')}
                  variant="orange"
                  size="reduced"
                  className="shadow-2xl"
                  style={{
                    borderRadius: '4px',
                    minHeight: '36px',
                    paddingTop: '0.4rem',
                    paddingBottom: '0.4rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    fontSize: '18px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap'
                  }}
                >
                  GET COVERMORE QUOTE
                </TravLinButton>
              </div>
              
              {/* Medical Assessment Content - Middle - TWO LINES ON DESKTOP */}
              <div className="flex-1">
                <h4 className="text-base text-gray-800 mb-1">
                  <span className="font-bold block lg:inline" style={{ fontSize: '15.5px' }}>{clickableBenefit.title}</span>
                  <span className="block lg:inline" style={{ fontSize: '15.5px' }}> - {clickableBenefit.description}</span>
                </h4>
              </div>
              
              {/* Blue CALL Button - Last - WRAPPED TO TEXT WIDTH */}
              <div className="flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    
                    const tel = `tel:${phoneNumber}`;
                    const displayNumber = '1300 72 88 22';
                    
                    console.log('📞 Travel Insurance call button clicked!')
                    
                    // Try to open dialer first
                    try {
                      window.location.href = tel;
                      toast.success(`📞 Calling: ${displayNumber}`, {
                        description: 'Medical assessment support line',
                        duration: 3000
                      });
                    } catch (error) {
                      // Fallback - copy number and show toast
                      navigator.clipboard.writeText(displayNumber).then(() => {
                        toast.success(`📞 Phone number copied: ${displayNumber}`, {
                          description: 'Medical assessment support - tap to call',
                          duration: 5000
                        });
                      }).catch(() => {
                        toast.success(`📞 Call us: ${displayNumber}`, {
                          description: 'Medical assessment support',
                          duration: 5000
                        });
                      });
                    }
                  }}
                  className="text-white shadow-lg hover:opacity-90 transition-all duration-300"
                  style={{
                    borderRadius: '4px',
                    minHeight: '36px',
                    paddingTop: '0.4rem',
                    paddingBottom: '0.4rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    border: 'none',
                    backgroundColor: 'var(--brand-blue)',
                    fontSize: '18px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    zIndex: 100,
                    position: 'relative'
                  }}
                  title="Call 1300 72 88 22 for medical assessment support"
                >
                  CALL
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}