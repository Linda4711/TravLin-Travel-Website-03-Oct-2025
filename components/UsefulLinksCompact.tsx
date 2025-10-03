import React from 'react'
import { Button } from './ui/button'
import { 
  Shield, 
  Globe, 
  Heart, 
  FileText
} from 'lucide-react'

export default function UsefulLinksCompact() {
  const usefulLinks = [
    {
      icon: Shield,
      title: 'Smart Traveller',
      link: 'https://www.smartraveller.gov.au/',
      color: '#0075CC'
    },
    {
      icon: Globe,
      title: 'Passport Services',
      link: 'https://www.passports.gov.au/',
      color: '#ED7D31'
    },
    {
      icon: Heart,
      title: 'Travel Health',
      link: 'https://www.health.gov.au/health-topics/travel-health',
      color: '#FFC000'
    },
    {
      icon: FileText,
      title: 'Visa Services',
      link: 'https://www.visasdirect.com.au/',
      color: '#0075CC'
    }
  ]

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background watercolor elements */}
      <div className="absolute top-10 left-10 w-32 h-32 watercolor-blob opacity-8 floating-element"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 watercolor-blob-coral opacity-10 floating-element" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-8">Useful Links and Resources</h2>
          
          {/* Compact Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {usefulLinks.map((link, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                    style={{ backgroundColor: link.color }}
                  >
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-lg font-bold text-gray-800 text-left flex-grow">{link.title}</h4>
                </div>
                
                {/* Visit Button */}
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold py-2 px-4 rounded-lg uppercase tracking-wide text-xs transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg no-underline text-white w-full justify-center"
                  style={{
                    backgroundColor: link.color,
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    const colors = {
                      '#0075CC': '#005aa3',
                      '#ED7D31': '#d16519',
                      '#FFC000': '#cc9a00'
                    };
                    e.currentTarget.style.backgroundColor = colors[link.color as keyof typeof colors] || link.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = link.color;
                  }}
                >
                  <link.icon className="w-3 h-3" />
                  Visit
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}