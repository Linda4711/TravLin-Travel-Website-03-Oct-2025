import React from 'react'
import { Shield, Users } from 'lucide-react'

export default function TestimonialsAddition() {
  return (
    <section className="section-spacing-small section-light">
      <div className="content-container-narrow">
        <div className="text-center">
          <div className="content-container-narrow mx-auto">

            {/* Subtle Gradient Container */}
            <div className="bg-gradient-to-b from-gray-50 to-white shadow-sm p-8 max-w-4xl mx-auto rounded-lg border border-gray-100 my-8">
              
              {/* Call-to-Action Text */}
              <p className="text-description-small text-gray-700 margin-bottom max-w-3xl mx-auto text-center">
                <strong>Share Your TravLin Experience!</strong> Whether it's a cruise, holiday, or travel consultation, sharing your journey helps other travelers discover professional, personalized service. We would love it and your journey story could inspire others!
              </p>
              
              {/* Review Platform Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                
                {/* Google Review */}
                <a 
                  href="https://g.page/r/CaUGOF_jq8VGEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-md p-3 hover:border-red-500 hover:bg-red-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 bg-red-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-xs">G</span>
                    </div>
                    <h4 className="text-xs font-semibold text-gray-800">Google Review</h4>
                  </div>
                </a>

                {/* Travel Agent Review */}
                <a 
                  href="https://www.travelagentfinder.com.au/agent/travlin-travel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-md p-3 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 bg-teal-500 rounded-md flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="text-xs font-semibold text-gray-800">Travel Agent Review</h4>
                  </div>
                </a>

                {/* ATIA Review */}
                <a 
                  href="https://traveltick.com.au/members/travlin-travel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-md p-3 hover:border-black hover:bg-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 bg-black rounded-md flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="text-xs font-semibold text-gray-800">ATIA Review</h4>
                  </div>
                </a>

                {/* Facebook Review */}
                <a 
                  href="https://www.facebook.com/travlintravel/reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-md p-3 hover:border-blue-600 hover:bg-blue-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 bg-blue-600 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-xs">f</span>
                    </div>
                    <h4 className="text-xs font-semibold text-gray-800">Facebook Review</h4>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}