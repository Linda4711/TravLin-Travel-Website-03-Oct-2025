import React, { useState, useEffect } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const travelImages = [
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=180&h=120&fit=crop&q=85',
    alt: 'Stunning lake reflection with mountains',
    caption: 'Mirror Lakes'
  },
  {
    src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=180&h=120&fit=crop&q=85',
    alt: 'Turquoise waters of Maldives bungalows',
    caption: 'Tropical Paradise'
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=180&h=120&fit=crop&q=85',
    alt: 'Dramatic mountain peaks at sunrise',
    caption: 'Alpine Sunrise'
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=180&h=120&fit=crop&q=85',
    alt: 'Crystal clear tropical beach paradise',
    caption: 'Paradise Beach'
  },
  {
    src: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=180&h=120&fit=crop&q=85',
    alt: 'African safari golden hour wildlife',
    caption: 'Safari Dreams'
  },
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=180&h=120&fit=crop&q=85',
    alt: 'Vibrant hot air balloons over valleys',
    caption: 'Sky High'
  },
  {
    src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=180&h=120&fit=crop&q=85',
    alt: 'Stunning grand canyon vista',
    caption: 'Grand Vistas'
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=180&h=120&fit=crop&q=85',
    alt: 'Adventurous mountain hiking trail',
    caption: 'Trail Adventures'
  },
  {
    src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=180&h=120&fit=crop&q=85',
    alt: 'Luxury cruise ship at sunset',
    caption: 'Ocean Luxury'
  },
  {
    src: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=180&h=120&fit=crop&q=85',
    alt: 'Romantic Paris city of lights',
    caption: 'City of Light'
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=180&h=120&fit=crop&q=85',
    alt: 'Dense mystical forest canopy',
    caption: 'Enchanted Forest'
  }
]

export default function SlidingImageSeparator() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Triple the images for seamless loop
  const tripleImages = [...travelImages, ...travelImages, ...travelImages]

  // Function to get variable overlap for each photo
  const getVariableMargin = (index: number) => {
    const baseMargin = -18 // Moderate overlap
    const variation = Math.sin(index * 0.7) * 12 // Controlled variation
    return Math.max(-30, Math.min(-5, baseMargin + variation)) // Reasonable range for overlapping
  }

  // Function to get straighter rotation angles (reduced range)
  const getRotationAngle = (index: number) => {
    return -2 + Math.sin(index * 0.8) * 3 // Much smaller rotation range (-5° to +1°)
  }

  // Function to get minimal vertical offset
  const getVerticalOffset = (index: number) => {
    return Math.cos(index * 0.5) * 5 // Reduced vertical variation
  }

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#f8f6f0', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      {/* TRAVEL PLANNING MAP BACKGROUND - PERFECT BUFFER */}
      <div className="absolute inset-0">
        {/* MAIN MAP BACKGROUND */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            filter: 'sepia(25%) saturate(1.1) contrast(1.2) brightness(1.1)'
          }}
        ></div>
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,117,204,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,117,204,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Smaller and lower positioned overlapping photos */}
        <div className="angled-photos-container" style={{ height: '180px', marginTop: '10px' }}>
          <div 
            className="angled-photos-track" 
            style={{ 
              animationDuration: '90s',
              width: `${185 * tripleImages.length}px` // Adjusted for smaller photos
            }}
          >
            {tripleImages.map((image, index) => (
              <div
                key={`angled-${index}`}
                className="angled-photo-wrapper"
                style={{
                  width: '180px', // Smaller photos
                  height: '120px', // Smaller height
                  transform: `rotate(${getRotationAngle(index)}deg) translateY(${getVerticalOffset(index)}px)`,
                  zIndex: tripleImages.length - (index % 25),
                  marginRight: `${getVariableMargin(index)}px`,
                  border: '6px solid white', // Thinner borders
                  borderRadius: '5px',
                  boxShadow: `
                    0 8px 25px rgba(0, 0, 0, 0.14),
                    0 4px 12px rgba(0, 0, 0, 0.08),
                    0 2px 6px rgba(0, 0, 0, 0.05),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                }}
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="angled-photo"
                  style={{
                    filter: 'contrast(1.03) saturate(1.05) brightness(1.01)',
                    borderRadius: '2px'
                  }}
                />
                
                {/* Enhanced photo shadow overlay */}
                <div 
                  className="photo-shadow"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      rgba(237, 125, 49, 0.08) 0%,
                      rgba(255, 192, 0, 0.06) 30%,
                      rgba(0, 117, 204, 0.08) 70%,
                      rgba(237, 125, 49, 0.08) 100%
                    )`
                  }}
                ></div>
                
                {/* Enhanced caption styling */}
                <div 
                  className="photo-caption-angled"
                  style={{
                    bottom: '-45px',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#5D4E37',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    background: 'rgba(255, 252, 245, 0.98)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.18)',
                    border: '2px solid rgba(180, 140, 100, 0.3)',
                    letterSpacing: '0.2px'
                  }}
                >
                  {image.caption}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text positioned very close under the carousel for map buffer below */}
        <div className="text-center -mt-4 sm:-mt-2">
          <p className="text-2xl leading-relaxed font-medium max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
            Every picture tells a story, what's yours?
          </p>
        </div>
      </div>
    </section>
  )
}																																																																																																																																																																											