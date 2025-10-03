import React from 'react'
import { Play, Star, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LindaForsterVideo() {
  const videoUrl = "https://youtu.be/jWIxH8L74Xk"
  
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${videoId}`
    }
    return url
  }

  return (
    <div className="section-white" style={{ padding: '2rem 0' }}>
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT COLUMN - Video & About Us - 50% width */}
          <div>
            
            {/* Extended Shaded Background Container - Covers Video AND About Us */}
            <div className="travel-card p-6" style={{
              background: 'linear-gradient(135deg, rgba(237, 125, 49, 0.08) 0%, rgba(0, 117, 204, 0.06) 100%)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}>
              
              {/* Video Section - Inside the shaded box */}
              <div style={{ marginBottom: '2rem' }}>
                <div className="w-full rounded-lg overflow-hidden shadow-lg bg-black relative" style={{ aspectRatio: '16/9', border: '3px solid var(--brand-blue)' }}>
                  {videoUrl ? (
                    <iframe
                      className="w-full h-full"
                      src={getYouTubeEmbedUrl(videoUrl)}
                      title="Linda's Welcome Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ 
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        objectFit: 'contain'
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <div className="text-center p-8 max-w-md">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto margin-bottom-small">
                            <Play className="w-10 h-10 text-white ml-1" />
                          </div>
                          <h3 className="text-description text-white margin-bottom-small" style={{ fontWeight: '600' }}>Linda's Welcome Video</h3>
                          <p className="text-description text-white/90">
                            Experience a personal welcome from Linda, your dedicated cruise and travel specialist.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* About Us Content - Also inside the shaded box */}
              <div>
                <h3 style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--brand-blue)',
                  marginBottom: '1rem',
                  lineHeight: '1.2'
                }}>
                  About Us
                </h3>
                <p style={{ 
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: 'var(--gray-600)',
                  marginBottom: '1.5rem'
                }}>
                  TravLin Travel has been established since June 2016, bringing a wealth of retail travel experience to every journey we craft. We have travelled near and far, experiencing everything from camping adventures to luxurious 5-star accommodations and everything in between. We love it all! We treat you as one of the family and enjoy putting together extraordinary trips that create lasting smiles and delicious memories to cherish for the rest of your life. You can trust TravLin Travel with all your travel needs as we remain committed to delivering professional service from start to finish.
                </p>
                
                {/* Orange slogan back in first column - 1 point bigger font */}
                <div className="text-center" style={{ marginTop: '2rem' }}>
                  <motion.p 
                    style={{ 
                      fontSize: '1.25rem', // Increased from 1.125rem (1 point bigger)
                      color: 'var(--brand-orange)', 
                      fontWeight: '700', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em', 
                      marginBottom: '0',
                      textAlign: 'center'
                    }}
                    animate={{ 
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    WE LOVE AND BREATHE TRAVEL... OUR 'FOREVER JOURNEY'
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Linda's Info - 50% width */}
          <div>
            
            {/* Linda's Header - Exact Match to Screenshot */}
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--brand-orange)', 
                marginBottom: '0.5rem',
                lineHeight: '1',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}>
                LINDA FORSTER
              </h1>
              <h2 style={{ 
                fontSize: '1.125rem',
                fontWeight: '700',
                color: 'var(--brand-blue)', 
                marginBottom: '1rem',
                lineHeight: '1.3',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}>
                BUSINESS OWNER/TRAVEL AND CRUISE SPECIALIST
              </h2>
              <div style={{ 
                height: '4px', 
                width: '120px', 
                backgroundColor: 'var(--brand-orange)',
                marginBottom: '2rem'
              }}></div>
            </div>

            {/* Linda's Description - Exact Text from Screenshot */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ 
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'var(--gray-600)',
                marginBottom: '2rem'
              }}>
                Linda Forster is a seasoned Travel Advisor and Cruise Specialist. She operates TravLin Travel from her home on the Mornington Peninsula and has been in the travel industry since 2006. With over 30 years of customer service experience, Linda holds ATAS accreditation and is recognized as a CLIA Cruise Master. Additionally, she proudly belongs to both ATIA (Australian Travel Industry Association) and Travellers Choice Independent Agency Group.
              </p>
            </div>

            {/* Service Cards - Animated headings without icons */}
            <div className="space-y-6">
              <div>
                <motion.h3 
                  style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: 'var(--brand-blue)',
                    marginBottom: '0.5rem',
                    cursor: 'default'
                  }}
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    scale: 1.05,
                    color: 'var(--brand-orange)'
                  }}
                >
                  Personalized Service at Your Fingertips
                </motion.h3>
                <p style={{ 
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: 'var(--gray-600)',
                  marginBottom: '0'
                }}>
                  Linda focuses on creating unforgettable travel experiences. Her mobile service allows her to meet clients locally, for the more complex of itineraries and large document delivery, saving them both time and money. Furthermore, she offers assistance outside regular hours, ensuring peace of mind during your travels.
                </p>
              </div>

              <div>
                <motion.h3 
                  style={{ 
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: 'var(--brand-orange)',
                    marginBottom: '0.5rem',
                    cursor: 'default'
                  }}
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  whileHover={{
                    scale: 1.05,
                    color: 'var(--brand-blue)'
                  }}
                >
                  A Passion for Travel
                </motion.h3>
                <p style={{ 
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: 'var(--gray-600)',
                  marginBottom: '0'
                }}>
                  Linda's extensive background includes working as a hotel concierge in Edinburgh and serving as an overseas travel representative on the beautiful Greek Island of Kos. Consequently, these experiences equip her to share valuable insights and recommendations.
                </p>
              </div>
            </div>

          </div>
        </div>
        
        {/* BLUE SLOGAN - CENTERED ABOVE NEXT SECTION, OFF ANY TILE */}
        <div className="w-full" style={{ 
          marginTop: '4rem', 
          marginBottom: '3rem', 
          padding: '0 1rem', 
          clear: 'both',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <motion.p 
            style={{ 
              fontSize: '1.25rem',
              color: 'var(--brand-blue)', 
              fontWeight: '700', 
              marginBottom: '0',
              textAlign: 'center',
              width: '100%',
              display: 'block'
            }}
            animate={{ 
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            TravLin... Where To Next?
          </motion.p>
        </div>
        
        {/* CREDENTIALS ROW - IN WHITE SPACE ACROSS FULL WIDTH */}
        <div className="w-full" style={{ 
          marginTop: '3rem', 
          textAlign: 'center',
          clear: 'both',
          display: 'flex',
          justifyContent: 'center',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            
            {/* ATAS Accredited - BLUE BORDER */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: 'var(--white)',
              padding: '0.375rem 0.75rem',
              borderRadius: '16px',
              border: '2px solid var(--brand-blue)'
            }}>
              <Star className="w-3.5 h-3.5" style={{ color: 'var(--brand-blue)' }} />
              <span style={{ 
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: 'var(--gray-700)'
              }}>
                ATAS Accredited
              </span>
            </div>
            
            {/* CLIA Cruise Master - ORANGE BORDER */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: 'var(--white)',
              padding: '0.375rem 0.75rem',
              borderRadius: '16px',
              border: '2px solid var(--brand-orange)'
            }}>
              <Star className="w-3.5 h-3.5" style={{ color: 'var(--brand-orange)' }} />
              <span style={{ 
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: 'var(--gray-700)'
              }}>
                CLIA Cruise Master
              </span>
            </div>
            
            {/* Mornington Peninsula - YELLOW BORDER */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: 'var(--white)',
              padding: '0.375rem 0.75rem',
              borderRadius: '16px',
              border: '2px solid var(--brand-yellow)'
            }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--brand-yellow)' }} />
              <span style={{ 
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: 'var(--gray-700)'
              }}>
                Mornington Peninsula
              </span>
            </div>
            
            {/* Since 2006 - BLACK BORDER */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: 'var(--white)',
              padding: '0.375rem 0.75rem',
              borderRadius: '16px',
              border: '2px solid var(--gray-900)'
            }}>
              <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: 'var(--gray-900)' }}></div>
              <span style={{ 
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: 'var(--gray-700)'
              }}>
                Since 2006
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}