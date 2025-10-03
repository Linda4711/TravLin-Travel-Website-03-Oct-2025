import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Award, Trophy, Star, Users, Check, Ship, Globe, Shield } from 'lucide-react'
import SectionDivider from './SectionDivider'

// ATIA Logo
const atiaLogoUrl = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759074349/ATIA_accredited_col_RGB_lzgo1y.jpg'
// NTIA Logo
const ntiaLogoUrl = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759075368/TCH380_-_NTIA_Peoples_Choice_WINNER_-_FB_Cover-1_wjwn5e.jpg'
// CLIA Master Cruise Consultant Logo
const cliaMasterLogoUrl = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759074428/2025_Master_Cruise_Consultant_qhcsj9.png'
// CLIA Member Logo
const cliaMemberLogoUrl = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759074429/2025_MEMBER_LOGO-_TRAVEL_AGENT_AUSTRALASIA_1_gp8pd3.png'
// Travellers Choice Logo
const travellersChoiceLogoUrl = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759074566/TC-Member-of_-_print_jyetwi.jpg'
// Winner 2024 Logo
const winner2024LogoUrl = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759076373/IMG_E1190_a3ymwi.jpg'
// TIDS Logo
const tidsLogoUrl = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759074378/TIDS_kmtlls.png'
// Travel Agent Finder Logo
const travelAgentFinderLogoUrl = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759076744/unnamed_281_29_nqcceg.webp'

const credentials = [
  {
    id: 1,
    title: 'ATIA Travel Tick Accredited',
    organization: 'Australian Travel Industry Association',
    year: '2025',
    description: 'ATIA accreditation protects your travel dreams. We meet rigorous industry standards ensuring every booking is secure with complete peace of mind.',
    logoAlt: 'ATIA Accredited Member',
    logoUrl: atiaLogoUrl,
    icon: Shield,
    category: 'accreditation',
    featured: true
  },
  {
    id: 2,
    title: 'NTIA 2022 winner - People\'s Choice Best Agency',
    organization: 'National Travel Industry Association',
    year: '2022',
    description: 'Award-winning Best Agency, recognised as the true people\'s choice. Our client entry was selected from over 11,000 public votes.',
    logoAlt: 'Travel Industry Excellence Award',
    logoUrl: ntiaLogoUrl,
    icon: Trophy,
    category: 'award',
    featured: true
  },
  {
    id: 3,
    title: 'CLIA Master Cruise Consultant',
    organization: 'CLIA Certification',
    year: '2025',
    description: 'Certified cruise masters with the highest level accreditation. Top 50 Australia ranking. Cruising is more than business—it\'s our passion.',
    logoAlt: 'CLIA Master Cruise Consultant 2025',
    logoUrl: cliaMasterLogoUrl,
    icon: Trophy,
    category: 'certification',
    featured: false
  },
  {
    id: 4,
    title: 'CLIA Australasia Member',
    organization: 'CLIA Australasia',
    year: '2025',
    description: 'Active CLIA Australasia membership connecting us with industry leaders and latest cruise innovations. We attend every annual conference across Australia.',
    logoAlt: 'CLIA Australasia 2025 Travel Agent Member',
    logoUrl: cliaMemberLogoUrl,
    icon: Ship,
    category: 'membership',
    featured: false
  },
  {
    id: 5,
    title: 'Travellers Choice Member',
    organization: 'Travellers Choice',
    year: '2025',
    description: 'Proud members of an award-winning premium travel professional network. Four consecutive NTIA Best Non-Branded Agency Network awards: 2021-2024.',
    logoAlt: 'Travellers Choice Member',
    logoUrl: travellersChoiceLogoUrl,
    icon: Star,
    category: 'membership',
    featured: true
  },
  {
    id: 6,
    title: 'Quality Business Winner 2024',
    organization: 'Quality Business Awards',
    year: '2024',  
    description: 'Awarded exceptional (95%+) quality rating for outstanding business excellence. Recognized as Frankston\'s Best Travel Agent for 2024.',
    logoAlt: 'Quality Business Winner 2024',
    logoUrl: winner2024LogoUrl,
    icon: Award,
    category: 'award',
    featured: true
  },
  {
    id: 7,
    title: 'IATA TIDS Agent',
    organization: 'International Air Transport Association',
    year: '2025',
    description: 'Accredited TIDS (Travel Industry Designator Service ) agent providing secure and professional booking services across global airline networks.',
    logoAlt: 'IATA TIDS Agent Accreditation',
    logoUrl: tidsLogoUrl,
    icon: Globe,
    category: 'accreditation',
    featured: false
  },
  {
    id: 8,
    title: 'Travel Agent Finder Member',
    organization: 'Travel Agent Finder',
    year: '2025',
    description: 'Proud member of Australia\'s premier travel agent search network, connecting travelers with accredited specialists nationwide.',
    logoAlt: 'Travel Agent Finder - Valued Member',
    logoUrl: travelAgentFinderLogoUrl,
    icon: Users,
    category: 'membership',
    featured: false
  }
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'award':
      return {
        bg: 'var(--brand-orange)',
        text: 'white',
        glow: 'rgba(237, 125, 49, 0.3)'
      }
    case 'certification':
      return {
        bg: 'var(--brand-blue)',
        text: 'white',
        glow: 'rgba(0, 117, 204, 0.3)'
      }
    case 'accreditation':
      return {
        bg: 'var(--brand-yellow)',
        text: 'var(--gray-800)',
        glow: 'rgba(255, 192, 0, 0.3)'
      }
    case 'membership':
      return {
        bg: 'var(--gray-600)',
        text: 'white',
        glow: 'rgba(108, 117, 125, 0.3)'
      }
    default:
      return {
        bg: 'var(--brand-blue)',
        text: 'white',
        glow: 'rgba(0, 117, 204, 0.3)'
      }
  }
}

export default function Credentials() {
  return (
    <section id="credentials" className="pt-12 pb-24 relative overflow-hidden" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-20 w-96 h-96 opacity-5" style={{
          background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)'
        }}></div>
        <div className="absolute bottom-32 left-20 w-80 h-80 opacity-5" style={{
          background: 'radial-gradient(circle, var(--brand-orange) 0%, transparent 70%)'
        }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-5" style={{
          background: 'radial-gradient(circle, var(--brand-yellow) 0%, transparent 70%)'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-20">
          <SectionDivider />
          <h2 className="section-heading">
            Our Credentials
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--gray-600)' }}>
            Recognized through industry awards, professional memberships,<br />
            and certifications for delivering exceptional travel service.
          </p>
        </div>

        {/* Unified Grid - All Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {credentials.map((credential, index) => {
            const categoryStyle = getCategoryColor(credential.category)
            return (
              <Card 
                key={credential.id}
                className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 relative overflow-hidden group"
                style={{ minHeight: '380px' }}
              >
                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <Badge 
                    className="text-xs font-bold px-2 py-1"
                    style={{ 
                      backgroundColor: categoryStyle.bg,
                      color: categoryStyle.text,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontSize: '10px'
                    }}
                  >
                    {credential.category}
                  </Badge>
                </div>

                {/* Glow Effect on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${categoryStyle.glow} 0%, transparent 50%)`
                  }}
                ></div>
                
                <CardContent className="p-6 relative">
                  {/* Logo and Icon Section - Side by Side */}
                  <div className="flex items-center justify-center mb-6 space-x-3">
                    {/* Professional Logo Container - ATIA & NTIA get full size, others get placeholder box */}
                    <div className="relative flex items-center justify-center" style={{ minHeight: '120px', width: '100%', maxWidth: '180px' }}>
                      {/* Display actual logos at full size without box for all credentials */}
                      {(credential.id === 1 || credential.id === 2 || credential.id === 3 || credential.id === 4 || credential.id === 5 || credential.id === 6 || credential.id === 7 || credential.id === 8) && credential.logoUrl ? (
                        <img 
                          src={credential.logoUrl}
                          alt={credential.logoAlt}
                          className="w-full h-auto object-contain"
                          style={{ 
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                            maxWidth: credential.id === 1 ? '110px' : // ATIA - smaller uniform
                                     credential.id === 2 ? '115px' : // NTIA - slightly wider certificate
                                     credential.id === 3 ? '105px' : // CLIA Master - smaller circle
                                     credential.id === 4 ? '105px' : // CLIA Member - smaller circle
                                     credential.id === 5 ? '110px' : // Travellers Choice - smaller rectangle
                                     credential.id === 6 ? '105px' : // Winner 2024 - smaller circle
                                     credential.id === 7 ? '105px' : // TIDS - smaller circle
                                     credential.id === 8 ? '110px' : '105px', // Travel Agent Finder - smaller rectangle
                            maxHeight: credential.id === 1 ? '85px' : // ATIA - smaller uniform height
                                      credential.id === 2 ? '85px' : // NTIA - smaller uniform height
                                      credential.id === 3 ? '105px' : // CLIA Master - smaller circle
                                      credential.id === 4 ? '105px' : // CLIA Member - smaller circle
                                      credential.id === 5 ? '75px' : // Travellers Choice - smaller rectangle height
                                      credential.id === 6 ? '105px' : // Winner 2024 - smaller circle
                                      credential.id === 7 ? '105px' : // TIDS - smaller circle
                                      credential.id === 8 ? '75px' : '75px', // Travel Agent Finder - smaller rectangle height
                            width: 'auto',
                            height: 'auto'
                          }}
                          onError={(e) => {
                            const logoName = credential.id === 1 ? 'ATIA' : 
                                           credential.id === 2 ? 'NTIA' : 
                                           credential.id === 3 ? 'CLIA Master' : 
                                           credential.id === 4 ? 'CLIA Member' :
                                           credential.id === 5 ? 'Travellers Choice' :
                                           credential.id === 6 ? 'Winner 2024' :
                                           credential.id === 7 ? 'TIDS' :
                                           credential.id === 8 ? 'Travel Agent Finder' : 'Logo';
                            console.log(`${logoName} Logo failed to load - showing fallback`);
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallbackDiv = target.nextElementSibling as HTMLElement;
                            if (fallbackDiv) {
                              fallbackDiv.style.display = 'block';
                            }
                          }}
                        />
                      ) : (
                        <>
                          {/* Glow background for other credentials */}
                          <div 
                            className="absolute inset-0 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                            style={{ backgroundColor: categoryStyle.bg }}
                          ></div>
                          
                          {/* Professional Logo Placeholders - Different shapes per requirement */}
                          <div 
                            className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm flex items-center justify-center"
                            style={{ 
                              // Travellers Choice = Rectangle  
                              width: credential.id === 5 ? '130px' :
                                     // CLIA, Winner 2024, TIDS, Travel Agent Finder = Squares for round logos
                                     '100px',
                              height: credential.id === 5 ? '85px' :
                                      '100px',
                              borderColor: categoryStyle.bg + '40'
                            }}
                          >
                            {/* Placeholder text for other credentials */}
                            <div className="text-center p-3">
                              <div 
                                className="font-medium mb-1 text-xs leading-tight"
                                style={{ 
                                  color: categoryStyle.bg,
                                  fontSize: '10px'
                                }}
                              >
                                {/* Logo Names - All credentials now show actual logos, no placeholders needed */}
                              </div>
                              <div 
                                className="text-xs opacity-60"
                                style={{ color: categoryStyle.bg }}
                              >
                                Logo Placeholder
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {/* ATIA Fallback - only shows if logo fails to load */}
                      {credential.id === 1 && (
                        <div 
                          className="text-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hidden"
                          style={{ 
                            width: '110px',
                            height: '85px',
                            borderColor: categoryStyle.bg + '40',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'none'
                          }}
                        >
                          <div 
                            className="font-medium mb-1 text-xs leading-tight"
                            style={{ 
                              color: categoryStyle.bg,
                              fontSize: '11px'
                            }}
                          >
                            ATIA Logo
                          </div>
                          <div 
                            className="text-xs opacity-60"
                            style={{ color: categoryStyle.bg }}
                          >
                            Logo Placeholder
                          </div>
                        </div>
                      )}
                      
                      {/* NTIA Fallback - only shows if logo fails to load */}
                      {credential.id === 2 && (
                        <div 
                          className="text-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hidden"
                          style={{ 
                            width: '115px',
                            height: '85px',
                            borderColor: categoryStyle.bg + '40',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'none'
                          }}
                        >
                          <div 
                            className="font-medium mb-1 text-xs leading-tight"
                            style={{ 
                              color: categoryStyle.bg,
                              fontSize: '11px'
                            }}
                          >
                            NTIA Logo
                          </div>
                          <div 
                            className="text-xs opacity-60"
                            style={{ color: categoryStyle.bg }}
                          >
                            Logo Placeholder
                          </div>
                        </div>
                      )}
                      
                      {/* CLIA Master Fallback - only shows if logo fails to load */}
                      {credential.id === 3 && (
                        <div 
                          className="text-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hidden"
                          style={{ 
                            width: '105px',
                            height: '105px',
                            borderColor: categoryStyle.bg + '40',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'none'
                          }}
                        >
                          <div 
                            className="font-medium mb-1 text-xs leading-tight"
                            style={{ 
                              color: categoryStyle.bg,
                              fontSize: '10px'
                            }}
                          >
                            CLIA Master Logo
                          </div>
                          <div 
                            className="text-xs opacity-60"
                            style={{ color: categoryStyle.bg }}
                          >
                            Logo Placeholder
                          </div>
                        </div>
                      )}
                      
                      {/* CLIA Member Fallback - only shows if logo fails to load */}
                      {credential.id === 4 && (
                        <div 
                          className="text-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hidden"
                          style={{ 
                            width: '105px',
                            height: '105px',
                            borderColor: categoryStyle.bg + '40',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'none'
                          }}
                        >
                          <div 
                            className="font-medium mb-1 text-xs leading-tight"
                            style={{ 
                              color: categoryStyle.bg,
                              fontSize: '10px'
                            }}
                          >
                            CLIA Member Logo
                          </div>
                          <div 
                            className="text-xs opacity-60"
                            style={{ color: categoryStyle.bg }}
                          >
                            Logo Placeholder
                          </div>
                        </div>
                      )}
                      
                      {/* Travellers Choice Fallback - only shows if logo fails to load */}
                      {credential.id === 5 && (
                        <div 
                          className="text-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hidden"
                          style={{ 
                            width: '110px',
                            height: '75px',
                            borderColor: categoryStyle.bg + '40',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'none'
                          }}
                        >
                          <div 
                            className="font-medium mb-1 text-xs leading-tight"
                            style={{ 
                              color: categoryStyle.bg,
                              fontSize: '10px'
                            }}
                          >
                            Travellers Choice Logo
                          </div>
                          <div 
                            className="text-xs opacity-60"
                            style={{ color: categoryStyle.bg }}
                          >
                            Logo Placeholder
                          </div>
                        </div>
                      )}
                      
                      {/* Winner 2024 Fallback - only shows if logo fails to load */}
                      {credential.id === 6 && (
                        <div 
                          className="text-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hidden"
                          style={{ 
                            width: '105px',
                            height: '105px',
                            borderColor: categoryStyle.bg + '40',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'none'
                          }}
                        >
                          <div 
                            className="font-medium mb-1 text-xs leading-tight"
                            style={{ 
                              color: categoryStyle.bg,
                              fontSize: '10px'
                            }}
                          >
                            Winner 2024 Logo
                          </div>
                          <div 
                            className="text-xs opacity-60"
                            style={{ color: categoryStyle.bg }}
                          >
                            Logo Placeholder
                          </div>
                        </div>
                      )}
                      
                      {/* TIDS Fallback - only shows if logo fails to load */}
                      {credential.id === 7 && (
                        <div 
                          className="text-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hidden"
                          style={{ 
                            width: '105px',
                            height: '105px',
                            borderColor: categoryStyle.bg + '40',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'none'
                          }}
                        >
                          <div 
                            className="font-medium mb-1 text-xs leading-tight"
                            style={{ 
                              color: categoryStyle.bg,
                              fontSize: '10px'
                            }}
                          >
                            TIDS Logo
                          </div>
                          <div 
                            className="text-xs opacity-60"
                            style={{ color: categoryStyle.bg }}
                          >
                            Logo Placeholder
                          </div>
                        </div>
                      )}
                      
                      {/* Travel Agent Finder Fallback - only shows if logo fails to load */}
                      {credential.id === 8 && (
                        <div 
                          className="text-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm hidden"
                          style={{ 
                            width: '110px',
                            height: '75px',
                            borderColor: categoryStyle.bg + '40',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'none'
                          }}
                        >
                          <div 
                            className="font-medium mb-1 text-xs leading-tight"
                            style={{ 
                              color: categoryStyle.bg,
                              fontSize: '10px'
                            }}
                          >
                            Travel Agent Finder Logo
                          </div>
                          <div 
                            className="text-xs opacity-60"
                            style={{ color: categoryStyle.bg }}
                          >
                            Logo Placeholder
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Icon alongside logo */}
                    <div 
                      className="w-12 h-12 flex items-center justify-center shadow-lg flex-shrink-0"
                      style={{ backgroundColor: categoryStyle.bg }}
                    >
                      <credential.icon className="w-6 h-6" style={{ color: categoryStyle.text }} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h4 className="text-lg font-bold mb-3 leading-tight text-center" style={{ color: 'var(--gray-800)' }}>
                      {credential.title}
                    </h4>
                    
                    <div className="flex items-center justify-center mb-4 text-sm" style={{ color: 'var(--gray-500)' }}>
                      <span>{credential.organization}</span>
                    </div>
                    
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                      {credential.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>


      </div>
    </section>
  )
}