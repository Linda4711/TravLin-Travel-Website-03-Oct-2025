import React from 'react'
import { Heart, Shield, Infinity, Phone, Car, Anchor, Camera, DollarSign } from 'lucide-react'
// import { Button } from './ui/button' // Removed - using TravLinButton instead
import TravLinButton from './TravLinButton'
import SectionDivider from './SectionDivider'

interface OurValuesProps {
  onNavigateToServices?: () => void
}

export default function OurValues({ onNavigateToServices }: OurValuesProps) {
  const values = [
    {
      icon: Infinity,
      title: "Forever Journey",
      description: "Our business is a \"forever journey\". Built for the long haul, we navigate travel challenges with resilience, giving you peace of mind every step of the way."
    },
    {
      icon: Shield,
      title: "Award-winning",
      description: "As 2022 NTIA winners, we deliver proven excellence with meticulous attention to detail. Secure, dependable arrangements you can trust."
    },
    {
      icon: Anchor,
      title: "Cruise Masters",
      description: "Cruise is our passion—ocean, river, expedition, luxury. As industry Cruise Masters, we continually enhance our expertise in Australia's fastest growing travel sector."
    },
    {
      icon: Heart,
      title: "Care and Support",
      description: "We treat you as family, bringing authentic passion to every interaction. Your travel dreams matter deeply, and we're committed to making them reality."
    },
    {
      icon: Car,
      title: "Mobile Meetup",
      description: "For complex itineraries, our mobile meetup service brings our expertise directly to you, simplifying planning and saving precious time."
    },
    {
      icon: Phone,
      title: "24/7 Emergency",
      description: "We're here 24/7—emergency support ensures help is just a phone call away. Your safety and comfort are our priority throughout your entire journey."
    },
    {
      icon: DollarSign,
      title: "Value for Money",
      description: "We listen to your needs to craft the best value holiday within budget. Exceeding expectations while creating your personalized dream getaway."
    },
    {
      icon: Camera,
      title: "Social Media Video",
      description: "Optional social media videos capture your TravLin journey highlights. We strive for exceptional service at every turn. Please ask for more info."
    }
  ]

  return (
    <section id="ourvalues" className="py-24 bg-white relative overflow-hidden">
      {/* Background watercolor elements */}
      <div className="absolute top-20 left-10 w-56 h-56 watercolor-blob opacity-10 floating-element"></div>
      <div className="absolute bottom-32 right-20 w-40 h-40 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '3s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 opacity-20 floating-element" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <SectionDivider />
          <h2 className="section-heading">The TravLin Advantage</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover what sets TravLin Travel apart—exceptional service advantages that make every journey extraordinary and unforgettable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
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
                index % 3 === 0 ? 'watercolor-blob' : 
                index % 3 === 1 ? 'watercolor-blob-coral' : 
                'bg-gradient-to-br from-yellow-300 to-yellow-400'
              }`} style={{
                borderRadius: '0 30px 0 100%',
                transform: 'scale(0.8)'
              }}></div>
              
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl"
                style={{ 
                  background: index % 3 === 0 ? 'var(--brand-blue)' : 
                             index % 3 === 1 ? 'var(--brand-orange)' : 
                             'var(--brand-yellow)',
                  color: index % 3 === 2 ? 'var(--gray-800)' : 'white',
                  boxShadow: `0 8px 25px ${
                    index % 3 === 0 ? 'rgba(0, 117, 204, 0.3)' : 
                    index % 3 === 1 ? 'rgba(237, 125, 49, 0.3)' : 
                    'rgba(255, 192, 0, 0.3)'
                  }`
                }}
              >
                <value.icon className="w-8 h-8" />
              </div>
              
              <h3 className="mb-4 text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors duration-300" style={{ color: 'var(--gray-800)' }}>
                {value.title}
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Our Services Button */}
        <div className="text-center mt-16">
          <TravLinButton
            onClick={() => {
              if (onNavigateToServices) {
                onNavigateToServices()
              }
            }}
            variant="orange"
            size="reduced"
            className="shadow-2xl"
            style={{
              borderRadius: '4px',
              minHeight: '38px',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem'
            }}
          >
            VIEW OUR SERVICES
          </TravLinButton>
        </div>
      </div>
    </section>
  )
}