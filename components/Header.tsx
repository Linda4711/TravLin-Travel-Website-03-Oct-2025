import React, { useState, useEffect } from 'react'
import TravLinButton from './TravLinButton'
import { Menu, X, Phone } from 'lucide-react'
import { toast } from 'sonner'
// Replaced figma:asset with working URL for deployment
const signpostIcon = 'https://images.unsplash.com/photo-1702478001496-e08620d8ad58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWducG9zdCUyMGRpcmVjdGlvbiUyMHRyYXZlbCUyMGljb258ZW58MXx8fHwxNzU4MDA0ODc5fDA&ixlib=rb-4.1.0&q=80&w=200'

interface HeaderProps {
  onNavigateToServices?: () => void
  onNavigateToCruises?: () => void
  onNavigateToTravelOptions?: () => void
  onNavigateToContact?: () => void
  onNavigateToStories?: () => void
  onNavigateToAbout?: () => void
  onNavigateToAI?: () => void
  onNavigateToHome?: () => void
  forceBlue?: boolean
}

export default function Header({ onNavigateToServices, onNavigateToCruises, onNavigateToTravelOptions, onNavigateToContact, onNavigateToStories, onNavigateToAbout, onNavigateToAI, onNavigateToHome, forceBlue = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  
  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const phoneNumber = '61 415 355 851'
    const displayNumber = '+61 415 355 851'
    const telNumber = 'tel:+61415355851'
    
    console.log('📞 Header phone button clicked!')
    
    // Try to open dialer first (mobile-friendly)
    try {
      window.location.href = telNumber;
      toast.success(`📞 Calling: ${displayNumber}`, {
        description: 'Linda Forster - Your Travel Expert',
        duration: 3000,
      })
    } catch (error) {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(displayNumber).then(() => {
        toast.success(`📞 Phone number copied: ${displayNumber}`, {
          description: 'Tap to call or paste anywhere - Linda Forster',
          duration: 5000,
        })
      }).catch(() => {
        // Fallback for older browsers
        toast.success(`📞 Call Linda: ${displayNumber}`, {
          description: 'Your travel specialist is ready to help',
          duration: 5000,
        })
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollPosition / documentHeight) * 100
      
      setIsScrolled(scrollPosition > 100)
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMobileMenuOpen && !target.closest('.mobile-menu-dropdown') && !target.closest('button')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (href: string) => {
    if (href === '#home') {
      if (onNavigateToHome) {
        onNavigateToHome()
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      toggleMobileMenu()
      return
    }
    
    if (href === '/cruises') {
      if (onNavigateToCruises) {
        onNavigateToCruises()
      }
      toggleMobileMenu()
      return
    }
    
    if (href === '/travel-options') {
      if (onNavigateToTravelOptions) {
        onNavigateToTravelOptions()
      }
      toggleMobileMenu()
      return
    }
    
    if (href === '/contact') {
      if (onNavigateToContact) {
        onNavigateToContact()
      }
      toggleMobileMenu()
      return
    }
    
    if (href === '/TravLin-Stories') {
      if (onNavigateToStories) {
        onNavigateToStories()
      }
      toggleMobileMenu()
      return
    }
    
    if (href === '/about') {
      if (onNavigateToAbout) {
        onNavigateToAbout()
      }
      toggleMobileMenu()
      return
    }
    
    if (href === '/ai-planner') {
      if (onNavigateToAI) {
        onNavigateToAI()
      }
      toggleMobileMenu()
      return
    }

    // Handle cross-page anchor navigation (services#travelinsurance)
    if (href.includes('#') && href.startsWith('/')) {
      const [page, anchor] = href.split('#')
      
      // If we're already on the target page, just scroll to anchor
      const element = document.querySelector(`#${anchor}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        toggleMobileMenu()
        return
      }
      
      // If we're on a different page, navigate and then scroll
      if (page === '/cruises' && onNavigateToCruises) {
        onNavigateToCruises()
        setTimeout(() => {
          const element = document.querySelector(`#${anchor}`)
          if (element) {
            // Account for fixed header height
            const headerHeight = 80
            const elementPosition = element.offsetTop - headerHeight
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      } else if (page === '/travel-options' && onNavigateToTravelOptions) {
        onNavigateToTravelOptions()
        setTimeout(() => {
          const element = document.querySelector(`#${anchor}`)
          if (element) {
            // Account for fixed header height
            const headerHeight = 80
            const elementPosition = element.offsetTop - headerHeight
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      } else if (page === '/TravLin-Stories' && onNavigateToStories) {
        onNavigateToStories()
        setTimeout(() => {
          const element = document.querySelector(`#${anchor}`)
          if (element) {
            // Account for fixed header height
            const headerHeight = 80
            const elementPosition = element.offsetTop - headerHeight
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      } else if (page === '/about' && onNavigateToAbout) {
        onNavigateToAbout()
        setTimeout(() => {
          const element = document.querySelector(`#${anchor}`)
          if (element) {
            // Account for fixed header height
            const headerHeight = 80
            const elementPosition = element.offsetTop - headerHeight
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      }
      toggleMobileMenu()
      return
    }
    
    // Handle same-page anchor navigation
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        // Account for fixed header height
        const headerHeight = 80
        const elementPosition = element.offsetTop - headerHeight
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
      toggleMobileMenu()
    }
  }

  // FIXED navigation structure for 5-page TravLin Travel website
  const navigationItems = [
    { 
      name: 'Home', 
      href: '#home'
    },
    { 
      name: 'About Us', 
      href: '/about'
    },
    { 
      name: 'Cruises', 
      href: '/cruises'
    },
    { 
      name: 'Travel Options', 
      href: '/travel-options'
    },
    { 
      name: 'TravLin Stories', 
      href: '/TravLin-Stories'
    },
    { 
      name: 'Contact Us', 
      href: '/contact'
    }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled || forceBlue ? 'header-scrolled' : 'header-transparent'
      }`}
      style={{ zIndex: 9999 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Brand - Logo Placeholder */}
          <div className="flex items-center flex-shrink-0">
            <button 
              className="flex items-center hover:scale-105 transition-all duration-300" 
              onClick={() => {
                if (onNavigateToHome) {
                  onNavigateToHome()
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            >
              <div className="flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759070661/2025_graphic_only_on_clear_with_blue_circle_millpa.png"
                  alt="TravLin Travel - Logo"
                  className="h-8 w-auto sm:h-10 lg:h-12 object-contain hover:rotate-3 transition-transform duration-300 hover:scale-105"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', border: 'none', outline: 'none', background: 'transparent' }}
                  onError={(e) => {
                    console.log('TravLin Logo failed to load - showing fallback');
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallbackDiv = target.nextElementSibling as HTMLElement;
                    if (fallbackDiv) {
                      fallbackDiv.style.display = 'flex';
                    }
                  }}
                  onLoad={() => console.log('✅ TravLin ACTUAL Cloudinary logo loaded successfully from dgpwz1nqr!')}
                />
                <div 
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center
                    bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg shadow-lg
                    hover:rotate-3 transition-all duration-300 hover:scale-105"
                  style={{ 
                    display: 'none',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    fontSize: 'clamp(16px, 3vw, 24px)',
                    fontWeight: 'bold',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  TL
                </div>
              </div>
            </button>
          </div>

          {/* Center Title - Explore Dream Discover */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block pointer-events-none">
            <div className="text-center">
              <p 
                className="text-sm lg:text-lg font-bold tracking-wider uppercase drop-shadow-md transition-colors duration-300 whitespace-nowrap"
                style={{ color: 'var(--brand-yellow)' }}
              >
                Explore • Dream • Discover
              </p>
            </div>
          </div>
          
          {/* CTA and Menu Button - ALL SCREEN SIZES */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="px-2 py-2 sm:px-3 sm:py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-3 square-button-force font-bold uppercase tracking-wide text-xs lg:text-sm transition-all duration-300 shadow-lg min-h-[40px] lg:min-h-[44px] touch-manipulation"
              style={{
                backgroundColor: 'var(--brand-orange)',
                color: 'white',
                border: 'none',
                pointerEvents: 'auto',
                zIndex: 100,
                position: 'relative'
              }}
              onClick={handlePhoneClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--brand-orange-dark)';
                if (window.innerWidth >= 1024) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(237, 125, 49, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--brand-orange)';
                if (window.innerWidth >= 1024) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(237, 125, 49, 0.3)';
                }
              }}
            >
              <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-white" style={{ fill: 'white', stroke: 'white', strokeWidth: '2px' }} />
            </button>
            
            <button 
              className={`
                ${isMobileMenuOpen ? 'p-2 lg:p-2' : 'p-2 lg:p-3'} rounded-md transition-all duration-300 min-h-[48px] min-w-[48px] lg:min-h-[52px] lg:min-w-[52px] 
                touch-manipulation flex items-center justify-center border-2 cursor-pointer
                ${isMobileMenuOpen 
                  ? 'bg-yellow-400/15 border-transparent text-yellow-400 shadow-md' 
                  : 'hover:bg-white/8 border-transparent text-white hover:border-white/15'
                }
              `}
              onClick={toggleMobileMenu}
              style={{
                WebkitTapHighlightColor: 'transparent',
                userSelect: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              {isMobileMenuOpen ? (
                <X 
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-400 drop-shadow-lg pointer-events-none" 
                  strokeWidth={3}
                  style={{ 
                    filter: 'drop-shadow(0 0 15px #FFC000) drop-shadow(0 0 8px #FFC000)'
                  }} 
                />
              ) : (
                <Menu 
                  className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 drop-shadow-md pointer-events-none ${
                    (isScrolled || forceBlue) ? 'text-white' : 'text-yellow-400'
                  }`} 
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
        </div>

        {/* Hamburger Menu - Clean Dropdown Only */}
        {isMobileMenuOpen && (
            <div 
              className="mobile-menu-dropdown absolute top-full right-4 bg-gray-900 border border-white/20 shadow-xl max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg mt-2"
              style={{ 
                width: '250px', 
                maxWidth: 'calc(100vw - 2rem)',
                zIndex: 9996,
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <nav className="flex flex-col p-4 space-y-1">
                {navigationItems.map((item) => (
                  <div key={item.name} className="border-b border-white/10 last:border-b-0">
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="font-medium uppercase tracking-wide text-sm transition-all duration-300 py-3 text-left touch-manipulation w-full text-white hover:text-yellow-400 nav-link"
                      style={{ 
                        color: '#FFFFFF',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--brand-yellow)'
                        e.currentTarget.style.textShadow = '0 0 8px rgba(255, 192, 0, 0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#FFFFFF'
                        e.currentTarget.style.textShadow = 'none'
                      }}
                    >
                      {item.name}
                    </button>
                  </div>
                ))}
              </nav>
            </div>
        )}
      </div>
      
      {/* Scroll Progress Indicator */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 transition-all duration-300 ease-out" 
        style={{ width: `${scrollProgress}%` }} 
      />
    </header>
  )
}
