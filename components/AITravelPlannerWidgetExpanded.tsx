import React from 'react'
import { Card, CardContent } from './ui/card'
import { Brain, Sparkles, Calendar, MapPin } from 'lucide-react'

interface AITravelPlannerWidgetExpandedProps {
  onNavigateToContact?: () => void
}

export default function AITravelPlannerWidgetExpanded({ onNavigateToContact }: AITravelPlannerWidgetExpandedProps) {
  const handleContactClick = () => {
    if (onNavigateToContact) {
      onNavigateToContact()
    } else {
      window.location.href = '/contact'
    }
  }

  return (
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        <div 
          className="bg-white border border-gray-200 shadow-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden" 
          style={{ 
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 117, 204, 0.08), 0 8px 16px rgba(237, 125, 49, 0.06)'
          }}
        >
          {/* Content area */}
          <div className="flex justify-center mb-8">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative"
              style={{ backgroundColor: '#0075CC' }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">AI TravLin Travel Planner</h3>
            
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Coming Soon</span>
              </div>
              
              <div className="text-center mb-6">
                <button
                  className="inline-flex items-center justify-center font-semibold py-4 px-8 rounded-lg uppercase tracking-wide text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white cursor-not-allowed opacity-75"
                  style={{
                    backgroundColor: '#6c757d',
                    border: 'none'
                  }}
                  disabled
                >
                  AI Planner Coming Soon
                </button>
                <p className="text-xs text-gray-500 mt-2">Currently in development</p>
              </div>
              
              <div className="mb-6">
                <h5 className="text-xl font-bold text-gray-800 mb-2">Your Amazing TravLin 'Travel Planner' Experience is coming!</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Revolutionary AI-powered travel planning!</strong> We're developing a specialised travel planning experience designed to help you research and plan your perfect trip. This exciting interface will provide comprehensive travel research tools and planning assistance for all travel options beyond cruising.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="font-semibold text-gray-800 text-sm">Smart Destination Research</h6>
                    <p className="text-xs text-gray-600">AI-powered insights and recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="font-semibold text-gray-800 text-sm">Intelligent Itinerary Planning</h6>
                    <p className="text-xs text-gray-600">Personalised travel schedules and timing</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>How it works:</strong> Use our AI tools to research destinations, compare options, and plan your ideal trip. Then bring your research to our expert team to make it happen with our human touch and professional booking services.
                </p>
              </div>
            </div>
          </div>
          

          
          {/* Contact Us Section */}
          <div className="pt-8 border-t border-gray-200">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h4>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Let our experienced travel consultants help you plan and book your perfect travel experience with personalized service.
            </p>
            
            <button
              onClick={handleContactClick}
              className="inline-flex items-center justify-center font-semibold py-4 px-8 rounded-lg uppercase tracking-wide text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: '#ED7D31',
                color: 'var(--white)',
                border: 'none',
                boxShadow: '0 6px 20px rgba(237, 125, 49, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d16519';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(237, 125, 49, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ED7D31';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(237, 125, 49, 0.25)';
              }}
            >
              Contact Us
            </button>
          </div>
          
          {/* Decorative corner accents */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-orange-400 rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  )
}