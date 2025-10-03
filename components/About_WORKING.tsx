import React from 'react'
import { Award, Star, Heart, Globe, Users, Ship } from 'lucide-react'
import SectionDivider from './SectionDivider'
// Replaced figma:asset with working URL for deployment
const ntiaTeamPhoto = 'https://images.unsplash.com/photo-1659100947220-48b5d5738148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwcGhvdG8lMjBidXNpbmVzcyUyMHRyYXZlbHxlbnwxfHx8fDE3NTgwMDU1NDZ8MA&ixlib=rb-4.1.0&q=80&w=400'

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 watercolor-blob opacity-10 floating-element"></div>
      <div className="absolute bottom-32 right-20 w-48 h-48 watercolor-blob-coral opacity-12 floating-element" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Divider */}
        <div className="text-center mb-16">
          <SectionDivider />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* LEFT COLUMN - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="section-heading mb-4">Linda Forster</h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--brand-orange)' }}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--brand-orange)' }}>FOUNDER & CRUISE SPECIALIST</h3>
                  <div className="w-24 h-1 rounded-full mt-2" style={{ backgroundColor: 'var(--brand-orange)' }}></div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="relative p-8 rounded-xl" style={{ backgroundColor: 'var(--white)' }}>
              <div className="absolute top-4 left-4 text-6xl opacity-20" style={{ color: 'var(--brand-blue)' }}>"</div>
              <p className="text-xl italic leading-relaxed mb-4 pl-8" style={{ color: 'var(--gray-700)' }}>
                Travel isn't just about visiting new places—it's about discovering new perspectives, creating meaningful connections, and collecting experiences that enrich your soul for a lifetime.
              </p>
              <p className="font-semibold pl-8" style={{ color: 'var(--brand-orange)' }}>- Linda Forster</p>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--brand-blue)' }}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-2" style={{ color: 'var(--gray-800)' }}>NTIA Winner 2022</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    National Travel Industry Awards recognition for exceptional service
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--brand-orange)' }}>
                  <Ship className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-2" style={{ color: 'var(--gray-800)' }}>CLIA Certified</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    Cruise Lines International Association specialist accreditation
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--brand-yellow)' }}>
                  <Users className="w-5 h-5" style={{ color: 'var(--gray-800)' }} />
                </div>
                <div>
                  <h4 className="font-bold mb-2" style={{ color: 'var(--gray-800)' }}>Since 2006</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    Nearly two decades of travel industry expertise
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--brand-blue)' }}>
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-2" style={{ color: 'var(--gray-800)' }}>Global Experience</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                    Worked in Edinburgh hotels and Greek islands
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Image and Details */}
          <div className="space-y-8">
            {/* Professional Photo */}
            <div className="relative">
              <div 
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                style={{ 
                  background: `linear-gradient(135deg, rgba(0, 117, 204, 0.15) 0%, rgba(237, 125, 49, 0.15) 100%)`,
                  padding: '2px'
                }}
              >
                <div className="bg-white rounded-2xl p-6">
                  <img 
                    src={ntiaTeamPhoto}
                    alt="Linda Forster - TravLin Travel Team" 
                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                  />
                  <div className="mt-4 text-center">
                    <h4 className="font-bold text-lg" style={{ color: 'var(--gray-800)' }}>Linda Forster</h4>
                    <p className="text-sm" style={{ color: 'var(--brand-orange)' }}>Founder & Travel Specialist</p>
                  </div>
                </div>
              </div>

              {/* Award Badge */}
              <div 
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transform rotate-12"
                style={{ backgroundColor: 'var(--brand-yellow)' }}
              >
                <div className="text-center">
                  <Star className="w-6 h-6 mx-auto mb-1" style={{ color: 'var(--gray-800)' }} />
                  <div className="text-xs font-bold" style={{ color: 'var(--gray-800)' }}>NTIA<br/>2022</div>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold mb-4" style={{ color: 'var(--brand-blue)' }}>Our Journey Since 2016</h4>
                <p className="text-base leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                  <span className="font-bold" style={{ color: 'var(--brand-orange)' }}>Established in June 2016</span>, TravLin Travel brings extensive retail travel experience to every journey. From camping adventures to luxurious 5-star accommodations, we've experienced it all and love every aspect of travel.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold mb-4" style={{ color: 'var(--brand-blue)' }}>Trusted Expertise</h4>
                <p className="text-base leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                  With years experience since 2006 and three decades of customer service excellence, Linda brings unparalleled knowledge to your travel planning. Her commitment to continuous learning ensures you receive current, tailored advice for every journey.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold mb-4" style={{ color: 'var(--brand-blue)' }}>Personal Service</h4>
                <p className="text-base leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                  Operating from the beautiful Mornington Peninsula, Linda is available beyond regular hours for peace of mind. Her passion for travel organization shines through every interaction, and she genuinely loves hearing about clients' adventures when they return home.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Bar */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4" style={{ borderColor: 'var(--brand-blue)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-xl mb-2" style={{ color: 'var(--gray-800)' }}>Ready to Start Planning?</h4>
              <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
                Let Linda's expertise turn your travel dreams into unforgettable memories
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+61415355851"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--brand-blue)', 
                  color: 'var(--white)',
                  textDecoration: 'none'
                }}
              >
                📞 +61 415 355 851
              </a>
              <a 
                href="mailto:hello@travlintravel.com.au"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--brand-orange)', 
                  color: 'var(--white)',
                  textDecoration: 'none'
                }}
              >
                ✉️ hello@travlintravel.com.au
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}