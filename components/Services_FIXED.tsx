import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Plane, MapPin, Calendar, Users, Shield, Package, Globe, FileText, Ship, ExternalLink } from 'lucide-react'

const services = [
  {
    icon: Ship,
    title: 'Cruise Holidays',
    description: 'Discover the world from the comfort of luxury cruise ships with expertly planned itineraries and exceptional onboard experiences.',
    color: '#0075CC'
  },
  {
    icon: Users,
    title: 'Group Travel',
    description: 'Specialized planning for family reunions, and special celebrations.',
    color: '#ED7D31'
  },
  {
    icon: Calendar,
    title: 'Escorted Tours',
    description: 'Expertly designed itineraries that showcase the best of each destination with local insights.',
    color: '#FFC000'
  },
  {
    icon: Plane,
    title: 'Air/Land Packages',
    description: 'Complete travel solutions combining flights and accommodations with seamless booking and coordination.',
    color: '#0075CC'
  },
  {
    icon: MapPin,
    title: 'Independent Travel',
    description: 'Customized travel solutions combining flights, accommodation, meals, and activities tailored to your preferences.',
    color: '#ED7D31'
  },
  {
    icon: Shield,
    title: 'Travel Protection',
    description: 'Comprehensive coverage options to protect your investment and provide complete peace of mind.',
    color: '#FFC000'
  },
  {
    icon: Globe,
    title: 'Visa Assistance',
    description: 'Navigate visa requirements with ease through our expert guidance and document support.',
    color: '#0075CC'
  },
  {
    icon: FileText,
    title: 'Document Preparation & Delivery',
    description: 'Complete document handling including visa applications, and secure delivery services.',
    color: '#ED7D31'
  }
]

export default function Services() {
  return (
    <section id="services" className="pt-8 pb-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/30 relative overflow-hidden">
      {/* Background watercolor elements */}
      <div className="absolute top-20 left-10 w-56 h-56 watercolor-blob opacity-8 floating-element"></div>
      <div className="absolute bottom-32 right-20 w-40 h-40 watercolor-blob-coral opacity-12 floating-element" style={{animationDelay: '3s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 opacity-15 floating-element" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Services Grid - Simplified Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card 
                key={index} 
                className="group bg-white border-0 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative"
                style={{
                  borderRadius: '20px',
                  boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Subtle top border accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-[20px]"
                  style={{ backgroundColor: service.color }}
                ></div>
                
                <CardContent className="p-8 text-center relative">
                  {/* Large Icon */}
                  <div 
                    className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: service.color }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                  
                  {/* Service Description - Larger and more readable */}
                  <p className="text-base text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  

                </CardContent>
              </Card>
            )
          })}
        </div>


      </div>
    </section>
  )
}