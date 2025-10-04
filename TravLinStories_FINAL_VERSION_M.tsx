import React, { useState } from 'react'
import { Calendar, Clock, ChevronDown, ChevronUp, ArrowLeft, Bell } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Header from './components/Header'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import SectionDivider from './components/SectionDivider'

// IMPORT CLEAN DATA STRUCTURE
import { allArticles, getArticleById, getFeaturedArticles, ArticleData } from './data/articles-index'
// IMPORT MODULAR ARTICLE CONTENT SYSTEM
import { getArticleContent } from './data/articleContent'

// Adventure storytelling hero image
const storiesHeroImage = 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBzdG9yeXRlbGxpbmclMjBhZHZlbnR1cmUlMjBtZW1vcmllcyUyMGJsb2d8ZW58MXx8fHwxNzU4NDU4NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'

interface TravLinStoriesProps {
  onNavigateBack: () => void
  onNavigateToContact: () => void
  onNavigateToServices?: () => void
  onNavigateToCruises?: () => void
  onNavigateToTravelOptions?: () => void
  onNavigateToAbout?: () => void
  onNavigateToHome?: () => void
}

// INLINE COMPONENTS - No external dependencies
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white border border-gray-200 shadow-sm ${className || ''}`}>
    {children}
  </div>
)

const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 ${className || ''}`}>
    {children}
  </div>
)

const Badge = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <span className={`inline-flex items-center px-3 py-1 text-xs font-medium ${className || ''}`} style={style}>
    {children}
  </span>
)

const Button = ({ children, onClick, disabled, className, style }: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  disabled?: boolean, 
  className?: string,
  style?: React.CSSProperties 
}) => (
  <button 
    onClick={onClick} 
    disabled={disabled} 
    className={`inline-flex items-center justify-center px-4 py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed square-button-force ${className || ''}`}
    style={style}
  >
    {children}
  </button>
)

const SimpleImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className} 
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUI5QkE0Ii8+Cjwvc3ZnPgo=';
    }} 
  />
)

export default function TravLinStories({ 
  onNavigateBack, 
  onNavigateToContact, 
  onNavigateToServices, 
  onNavigateToCruises, 
  onNavigateToTravelOptions, 
  onNavigateToAbout, 
  onNavigateToHome 
}: TravLinStoriesProps) {
  const [showMoreArticles, setShowMoreArticles] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)
  
  // Email functionality states
  const [dreamDestination, setDreamDestination] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmittingGuide, setIsSubmittingGuide] = useState(false)
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)

  // USE CLEAN DATA STRUCTURE
  const featuredArticle = getFeaturedArticles()[0] || allArticles[0]
  const regularArticles = allArticles.filter(article => article.id !== featuredArticle.id)
  const visibleArticles = showMoreArticles ? regularArticles : regularArticles.slice(0, 3)
  const hiddenArticles = regularArticles.slice(3)

  // UPDATED CATEGORY SYSTEM
  const getCategoryColor = (category: string) => {
    // Brand Blue: CRUISE, TRAVEL, TIPS
    if (category === 'CRUISE' || category === 'cruise' || category === 'Travel and Cruise Tips' || category.includes('Cruise') || category.includes('Travel') || category.includes('Tips')) {
      return 'var(--brand-blue)'
    }
    // Brand Orange: INSIGHTS, INDUSTRY, NEWS  
    if (category === 'INSIGHTS' || category === 'INDUSTRY' || category === 'Industry Insights' || category.includes('Industry') || category.includes('News')) {
      return 'var(--brand-orange)'
    }
    // Brand Yellow: DESTINATION
    if (category === 'DESTINATION' || category === 'Destinations' || category.includes('Destinations') || category.includes('Destination')) {
      return 'var(--brand-yellow)'
    }
    return 'var(--brand-blue)' // Default fallback
  }

  const getCategoryBadgeStyle = (category: string) => {
    const baseStyle = {
      borderRadius: '0px !important',
      fontWeight: '500',
      fontSize: '11px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      padding: '4px 8px'
    }
    // Brand Blue: CRUISE, TRAVEL, TIPS
    if (category === 'CRUISE' || category === 'cruise' || category === 'Travel and Cruise Tips' || category.includes('Cruise') || category.includes('Travel') || category.includes('Tips')) {
      return { ...baseStyle, backgroundColor: 'var(--brand-blue)', color: 'white' }
    }
    // Brand Orange: INSIGHTS, INDUSTRY, NEWS
    if (category === 'INSIGHTS' || category === 'INDUSTRY' || category === 'Industry Insights' || category.includes('Industry') || category.includes('News')) {
      return { ...baseStyle, backgroundColor: 'var(--brand-orange)', color: 'white' }
    }
    // Brand Yellow: DESTINATION
    if (category === 'DESTINATION' || category === 'Destinations' || category.includes('Destinations') || category.includes('Destination')) {
      return { ...baseStyle, backgroundColor: 'var(--brand-yellow)', color: 'var(--gray-800)' }
    }
    return { ...baseStyle, backgroundColor: 'var(--brand-blue)', color: 'white' }
  }

  const getCategoryWord = (category: string) => {
    // Brand Orange: INSIGHTS, INDUSTRY, NEWS identifiers
    if (category === 'INSIGHTS') return 'INSIGHTS'
    if (category === 'INDUSTRY') return 'INDUSTRY'
    if (category.includes('News')) return 'NEWS'
    if (category.includes('Industry')) return 'INDUSTRY'
    if (category === 'Industry Insights') return 'INDUSTRY'
    
    // Brand Blue: CRUISE, TRAVEL, TIPS identifiers
    if (category === 'CRUISE') return 'CRUISE'
    if (category === 'cruise') return 'CRUISE'
    if (category === 'Travel and Cruise Tips') return 'CRUISE'
    if (category.includes('Cruise')) return 'CRUISE'
    if (category.includes('Travel')) return 'TRAVEL'
    if (category.includes('Tips')) return 'TIPS'
    
    // Brand Yellow: DESTINATION identifiers
    if (category === 'DESTINATION') return 'DESTINATION'
    if (category === 'Destinations') return 'DESTINATION'
    if (category.includes('Destinations')) return 'DESTINATION'
    if (category.includes('Destination')) return 'DESTINATION'
    
    return 'TRAVEL' // Default fallback
  }

  // Badge sizing utility for orange badges
  const getBadgeSize = (category: string) => {
    const isOrange = getCategoryColor(category) === 'var(--brand-orange)'
    return {
      minHeight: isOrange ? '36px' : '28px',
      height: isOrange ? '36px' : '28px',
      width: isOrange ? '130px' : '100px',
      fontSize: isOrange ? '0.875rem' : '0.75rem'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear().toString().slice(-2)
    return `${month}-${year}`
  }

  const handleViewMore = () => setShowMoreArticles(true)
  const handleViewLess = () => setShowMoreArticles(false)
  
  const handleReadArticle = (articleId: number) => {
    setSelectedArticle(articleId)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }
  
  const handleBackToStories = () => {
    setSelectedArticle(null)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }

  // Navigation handlers
  const handleNavigateToServices = () => onNavigateToServices?.()
  const handleNavigateToCruises = () => onNavigateToCruises?.()
  const handleNavigateToTravelOptions = () => onNavigateToTravelOptions?.()
  const handleNavigateToStories = () => {
    if (selectedArticle) {
      // If viewing an article, go back to main stories view
      handleBackToStories()
    } else {
      // If on main stories page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  const handleNavigateToAI = () => onNavigateToContact?.()
  const handleNavigateToContact = () => onNavigateToContact ? onNavigateToContact() : (window.location.href = '/contact')

  // Email functionality
  const handleCustomGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dreamDestination.trim()) {
      toast.error('Please enter a destination for your custom guide.')
      return
    }
    setIsSubmittingGuide(true)
    setTimeout(() => {
      toast.success(`Custom guide request for ${dreamDestination} sent! We'll email it to you soon.`)
      setDreamDestination('')
      setIsSubmittingGuide(false)
    }, 1000)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Please enter your email address.')
      return
    }
    
    setIsSubmittingNewsletter(true)
    
    try {
      // EmailJS Configuration - LIVE
      const serviceId = 'service_rlnjyuj'
      const templateId = 'template_aiumzob'
      const publicKey = 'GY6ImN3fkI91A6mGw'
      
      const templateParams = {
        from_name: 'TravLin Stories Subscriber',
        from_email: email,
        message: `New TravLin Stories newsletter subscription from ${email}.
        
Email: ${email}
Source: TravLin Stories Page Newsletter Signup
Subscription Type: Travel Stories & Tips Newsletter
Timestamp: ${new Date().toISOString()}

Please add this email to the TravLin Stories newsletter mailing list for travel insights, destination guides, and special offers.`,
        subscriber_email: email,
        source: 'TravLin Stories Newsletter Signup',
        subscription_type: 'Travel Stories Newsletter',
        timestamp: new Date().toISOString(),
        to_email: 'hello@travlintravel.com.au'
      }
      
      // Send email via EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('✅ TravLin Stories newsletter subscription sent via EmailJS')
      
      toast.success('🎉 Successfully subscribed to TravLin Stories!', {
        description: "You'll receive our latest travel stories and insider tips.",
        duration: 5000
      })
      
      setEmail('')
    } catch (error) {
      console.error('EmailJS Error:', error)
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setIsSubmittingNewsletter(false)
    }
  }

  // INDIVIDUAL ARTICLE VIEW
  if (selectedArticle) {
    const article = getArticleById(selectedArticle)
    if (!article) return null
    
    return (
      <div className="min-h-screen bg-white">
        <SEOHead page="stories" />
        
        <Header 
          onNavigateToHome={onNavigateToHome}
          onNavigateToAbout={onNavigateToAbout}
          onNavigateToCruises={onNavigateToCruises}
          onNavigateToTravelOptions={onNavigateToTravelOptions}
          onNavigateToContact={onNavigateToContact}
          onNavigateToStories={handleNavigateToStories}
        />

        {/* Article Hero Image - Clean No Text Overlay */}
        <section 
          className="relative h-[85vh] article-hero-mobile-optimized article-hero-enhanced"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.15)), url('${article.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: window.innerWidth <= 480 ? 'center 35%' : window.innerWidth <= 768 ? 'center 40%' : window.innerWidth <= 1024 ? 'center 45%' : 'center 50%',
            backgroundAttachment: window.innerWidth <= 768 ? 'scroll' : 'fixed',
            backgroundRepeat: 'no-repeat',
            imageRendering: '-webkit-optimize-contrast',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)'
          }}
        >
        </section>

        {/* Article Content - COMPACT WITH SUBTLE SHADING */}
        <main className="py-8 bg-gray-50">
          <div className="content-container-narrow">
            
            {/* Back Button - Clean and Simple */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div 
                onClick={handleBackToStories}
                className="inline-flex items-center cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ color: 'var(--brand-blue)' }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="text-lg font-semibold">Back</span>
              </div>
            </motion.div>

            {/* SIMPLE CLEAN LAYOUT - NO FANCY ELEMENTS */}
            <motion.div 
              className="bg-white shadow-lg border border-gray-200 p-6 lg:p-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ borderRadius: '4px' }}
            >
              {/* Article metadata - simple version */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" style={{ color: 'var(--brand-blue)' }} />
                  <span>{formatDate(article.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" style={{ color: 'var(--brand-orange)' }} />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Article content - simple styling */}
              <div className="article-content-styling prose prose-lg max-w-none">
                {getArticleContent(article.id)}
              </div>
              

              
              {/* Back to Stories - Bold Blue Brand Text Only */}
              <div className="pt-6 text-center">
                <span 
                  onClick={onNavigateBack}
                  className="text-xl font-bold transition-all duration-300 hover:underline hover:scale-105 cursor-pointer"
                  style={{ color: 'var(--brand-blue)' }}
                >
                  Top
                </span>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer 
          onNavigateToContact={handleNavigateToContact}
          onNavigateToServices={handleNavigateToServices}
          onNavigateToCruises={handleNavigateToCruises}
          onNavigateToTravelOptions={handleNavigateToTravelOptions}
          onNavigateToStories={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onNavigateToAbout={onNavigateToAbout}
          onNavigateToAI={handleNavigateToAI}
          onNavigateToHome={onNavigateToHome}
        />
      </div>
    )
  }

  // MAIN STORIES PAGE LAYOUT
  return (
    <div className="min-h-screen bg-white">
      <SEOHead page="stories" />
      
      <Header 
        onNavigateToHome={onNavigateToHome}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCruises={onNavigateToCruises}
        onNavigateToTravelOptions={onNavigateToTravelOptions}
        onNavigateToContact={onNavigateToContact}
        onNavigateToStories={handleNavigateToStories}
      />

      {/* Hero Section */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 117, 204, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.4) 100% 100%), url("${storiesHeroImage}")`,
          backgroundSize: window.innerWidth <= 768 ? 'cover' : 'cover',
          backgroundPosition: window.innerWidth <= 768 ? 'center 30%' : 'center',
          backgroundAttachment: window.innerWidth <= 768 ? 'scroll' : 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 text-center content-container-narrow">
          <div className="hero-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white text-shadow-strong">
              TravLin Stories
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 font-semibold text-white text-shadow">
              Stories • News • Destination Guides • Inspiration
            </h2>
            <p className="text-xl leading-relaxed text-white text-shadow content-container">
              Discover incredible journeys, insider secrets, and expert travel wisdom that turn dreams into unforgettable adventures. Your next extraordinary escape and dreaming begins here!
            </p>
          </div>
        </div>
      </section>

      {/* Stories Content */}
      <section className="section-spacing section-white">
        <div className="content-container">
          <SectionDivider />
          
          {/* Featured Story */}
          <div className="margin-bottom">
            <h2 className="section-heading text-center margin-bottom">Featured Story</h2>
            
            <div className="content-container-narrow">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="story-image-container featured-article-image">
                    <SimpleImage
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className="absolute top-4 left-4 text-white font-semibold shadow-lg z-10"
                      style={{ backgroundColor: getCategoryColor(featuredArticle.category) }}
                    >
                      FEATURED
                    </Badge>
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    <Badge 
                      className="margin-bottom-small font-semibold"
                      style={{ 
                        backgroundColor: getCategoryColor(featuredArticle.category),
                        color: getCategoryWord(featuredArticle.category) === 'DESTINATION' ? '#000000' : '#ffffff',
                        ...getBadgeSize(featuredArticle.category),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderRadius: '2px'
                      }}
                    >
                      {getCategoryWord(featuredArticle.category)}
                    </Badge>
                    
                    <h3 
                      className="component-heading text-gray-800 margin-bottom-small story-title cursor-pointer"
                      onClick={() => handleReadArticle(featuredArticle.id)}
                      dangerouslySetInnerHTML={{ __html: featuredArticle.title }}
                    />
                    
                    <p className="text-description margin-bottom">
                      {featuredArticle.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatDate(featuredArticle.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{featuredArticle.readTime}</span>
                        </div>
                      </div>
                      
                      <div 
                        onClick={() => handleReadArticle(featuredArticle.id)}
                        className="flex items-center font-bold transition-all duration-300 hover:text-opacity-80 cursor-pointer"
                        style={{
                          color: 'var(--brand-blue)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontSize: '1.125rem'
                        }}
                      >
                        read →
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>

          {/* Regular Stories Grid */}
          <div className="section-spacing-small">
            <SectionDivider />
            <h2 className="section-heading text-center margin-bottom">More Stories</h2>
            
            <div className="card-grid content-container">
              {visibleArticles.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border border-gray-200">
                  <div className="story-image-container story-card-image">
                    <SimpleImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* MAIN CATEGORY BADGE - TOP RIGHT CORNER */}
                    <div className="absolute top-4 right-4 z-10">
                      <Badge 
                        className="text-white font-medium shadow-lg"
                        style={{ 
                          backgroundColor: getCategoryColor(post.category),
                          color: getCategoryWord(post.category) === 'DESTINATION' ? '#000000' : '#ffffff',
                          minHeight: getCategoryColor(post.category) === 'var(--brand-orange)' ? '32px' : '28px',
                          height: getCategoryColor(post.category) === 'var(--brand-orange)' ? '32px' : '28px',
                          width: getCategoryColor(post.category) === 'var(--brand-orange)' ? '120px' : '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontSize: getCategoryColor(post.category) === 'var(--brand-orange)' ? '0.875rem' : '0.75rem',
                          borderRadius: '2px'
                        }}
                      >
                        {getCategoryWord(post.category)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    
                    <h3 
                      className="text-lg font-semibold mb-3 text-gray-800 story-title cursor-pointer line-clamp-2"
                      onClick={() => handleReadArticle(post.id)}
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    
                    {/* ONLY SHOW EXCERPT IF IT EXISTS */}
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* IF NO EXCERPT, SHOW PLACEHOLDER */}
                    {!post.excerpt && (
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed italic flex items-center">
                        Content coming soon...
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      {post.excerpt ? (
                        <div 
                          onClick={() => handleReadArticle(post.id)}
                          className="flex items-center font-bold transition-all duration-300 hover:text-opacity-80 cursor-pointer"
                          style={{
                            color: 'var(--brand-blue)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontSize: '1rem'
                          }}
                        >
                          read →
                        </div>
                      ) : (
                        <div 
                          onClick={() => handleReadArticle(post.id)}
                          className="flex items-center font-bold transition-all duration-300 hover:text-opacity-80 cursor-pointer"
                          style={{
                            color: 'var(--brand-blue)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontSize: '1rem'
                          }}
                        >
                          read →
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View More/Less Button */}
            {hiddenArticles.length > 0 && (
              <div className="text-center mt-8">
                {showMoreArticles ? (
                  <Button
                    onClick={handleViewLess}
                    className="square-button-force text-white font-semibold py-3 px-8 text-sm transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--brand-orange)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    <ChevronUp className="w-4 h-4 mr-2" /> LESS
                  </Button>
                ) : (
                  <Button
                    onClick={handleViewMore}
                    className="square-button-force text-white font-semibold py-3 px-8 text-sm transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--brand-orange)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    <ChevronDown className="w-4 h-4 mr-2" /> MORE
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="section-spacing section-light">
        <div className="content-container">
          <div className="content-container-text text-center">
            <SectionDivider />
            
            {/* Single Column Newsletter Subscription */}
            <div className="bg-white shadow-lg border border-gray-200 p-6 lg:p-8" style={{ borderRadius: '4px' }}>
              {/* Blue Bell Icon */}
              <div className="flex justify-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--brand-blue)' }}
                >
                  <Bell className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Stay Updated</h3>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Subscribe to get the latest travel insights, destination guides, and offers delivered to your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderRadius: '4px' }}
                  required
                />
                
                <Button
                  type="submit"
                  disabled={isSubmittingNewsletter}
                  className="w-full square-button-force text-white font-semibold py-3 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--brand-blue)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    minHeight: '50px'
                  }}
                >
                  {isSubmittingNewsletter ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Subscribing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Bell className="w-4 h-4 mr-2" />
                      Subscribe Now
                    </div>
                  )}
                </Button>
              </form>

              {/* Features */}
              <div className="flex justify-center items-center gap-6 mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" style={{ color: 'var(--brand-blue)' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
                  </svg>
                  Fortnightly Updates
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" style={{ color: 'var(--brand-yellow)' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Offers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer 
        onNavigateToContact={handleNavigateToContact}
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={handleNavigateToTravelOptions}
        onNavigateToStories={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={onNavigateToHome}
      />
    </div>
  )
}
