import React, { useState } from 'react'
import { Calendar, Clock, User, ArrowRight, BookOpen, ChevronDown, ChevronUp, ArrowLeft, Search, Bell } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'motion/react'
import Header from './components/Header'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import TravLinButton from './components/TravLinButton'
// Adventure storytelling hero image - perfect for TravLin Stories page
const storiesHeroImage = 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBzdG9yeXRlbGxpbmclMjBhZHZlbnR1cmUlMjBtZW1vcmllcyUyMGJsb2d8ZW58MXx8fHwxNzU4NDU4NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' // Adventure storytelling with mountains - perfect for stories theme

// Travel diary/passport memories image - moved from Contact page
const travelDiaryImage = 'https://images.unsplash.com/photo-1655722725332-9925c96dd627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkaWFyeSUyMHBlbiUyMHBhc3Nwb3J0JTIwbWVtb3JpZXN8ZW58MXx8fHwxNzU4NDU4ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'

interface TravLinStoriesProps {
  onNavigateBack: () => void
  onNavigateToContact: () => void
  onNavigateToServices?: () => void
  onNavigateToCruises?: () => void
  onNavigateToTravelOptions?: () => void
  onNavigateToAbout?: () => void
  onNavigateToHome?: () => void
}

// ZERO IMPORTS - ALL INLINE TO AVOID CACHE ISSUES
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

const blogPosts = [
  {
    id: 1,
    title: 'VALUE OF A TRAVEL AGENT',
    excerpt: 'Discover why travel agents are more valuable than ever! From personalized service and expert knowledge to 24/7 support and exclusive deals, learn how partnering with a professional travel agent transforms your booking experience and ensures unforgettable journeys.',
    image: 'https://images.unsplash.com/photo-1591172601559-0ec5b777992a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXNrJTIwd29ya3NwYWNlJTIwZmxhdCUyMGxheSUyMGNvbXBhc3MlMjBjYW1lcmElMjBwYXNzcG9ydCUyMG1hcCUyMGNvZmZlZXxlbnwxfHx8fDE3NTg1NTM3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-12-15',
    readTime: '6 min read',
    category: 'Industry Insights',
    featured: true,
    color: 'orange',
    type: 'article'
  },
  {
    id: 2,
    title: 'Aft Cabin vs. Forward: Which Is Right for Your Cruise?',
    excerpt: '',
    image: 'https://images.unsplash.com/photo-1687469199037-b728df2be4f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwJTIwYWZ0JTIwYmFsY29ueSUyMHdha2UlMjB2aWV3fGVufDF8fHx8MTc1ODEzMTU5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-11-22',
    readTime: '5 min read',
    category: 'Cruise Tips',
    color: 'blue',
    type: 'article'
  },
  {
    id: 3,
    title: "Travellers Choice: NTIA Champions Again!",
    excerpt: 'Celebrating another incredible achievement! Christian Hunter, MD of Travellers Choice, discusses winning Most Outstanding Travel Agency Network for the fourth consecutive year.',
    image: 'https://images.unsplash.com/photo-1726804973612-3e610a28ba3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWxsZXJzJTIwY2hvaWNlJTIwYXdhcmRzJTIwY2VyZW1vbnklMjBidXNpbmVzc3xlbnwxfHx8fDE3NTgxMzE2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-10-18',
    readTime: '4 min read',
    category: 'Industry News/Awards',
    color: 'orange',
    type: 'article'
  },
  {
    id: 4,
    title: "Capital in A State",
    excerpt: "Unlock the secrets of Australia's vibrant capital! From stunning architecture to breathtaking natural landscapes and award-winning wineries, discover why Canberra is the ultimate year-round destination that perfectly blends culture, adventure, and culinary excellence.",
    image: 'https://images.unsplash.com/photo-1719918508801-0dd00797d959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5iZXJyYSUyMHBhcmxpYW1lbnQlMjBob3VzZSUyMHNwcmluZ3xlbnwxfHx8fDE3NTgxMzE1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-08-15',
    readTime: '7 min read',
    category: 'Destination Guide',
    color: 'yellow',
    type: 'article'
  },
  {
    id: 5,
    title: 'A State for All Seasons',
    excerpt: "Victoria, Australia's smallest mainland state, is a vibrant destination that shines year-round. With diverse landscapes, rich cultural heritage, and a plethora of sporting events, Victoria offers something for everyone, making it an ideal choice for any season.",
    image: 'https://images.unsplash.com/photo-1610532785167-1f1ea5ac6988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYSUyMGJlYWNoJTIwYm94ZXMlMjBjb2xvcmZ1bCUyMGh1dHN8ZW58MXx8fHwxNzU4MTMxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-07-28',
    readTime: '3 min read',
    category: 'Destination Guide',
    color: 'yellow',
    type: 'article'
  },
  {
    id: 6,
    title: 'The Apple Isle',
    excerpt: "Tasmania, affectionately known as the Apple Isle, is celebrated for its stunning natural landscapes, rich wildlife, and vibrant local culture. Experience the perfect blend of wilderness adventure, cultural attractions, and unique Tasmanian experiences year-round.",
    image: 'https://images.unsplash.com/photo-1701389357376-5b72922c5c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFkbGUlMjBtb3VudGFpbiUyMHRhc21hbmlhfGVufDF8fHx8MTc1ODEzMTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-07-10',
    readTime: '3 min read',
    category: 'Destination Guide',
    color: 'yellow',
    type: 'article'
  },
  {
    id: 7,
    title: 'In Doubt, Go South!',
    excerpt: "South Australia is renowned for its luxury offerings, including local wine, exquisite food, and stunning natural beauty. From world-famous wine regions to breathtaking scenic vistas and incredible wildlife encounters, discover what makes South Australia the perfect destination.",
    image: 'https://images.unsplash.com/photo-1702252212983-db7e428cc3cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGVsYWlkZSUyMGNpdHklMjBza3lsaW5lJTIwc291dGglMjBhdXN0cmFsaWF8ZW58MXx8fHwxNzU4NDU4MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-06-25',
    readTime: '3 min read',
    category: 'Destination Guide',
    color: 'yellow',
    type: 'article'
  },
  {
    id: 8,
    title: 'Wild Wide West',
    excerpt: "Experience Western Australia's vast wilderness and natural wonders! From Perth's vibrant culture and pristine beaches to the otherworldly landscapes of the Kimberley and Pilbara. Discover why WA offers some of the planet's most extraordinary experiences.",
    image: 'https://images.unsplash.com/photo-1627630544010-2d1ed508ebb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5uYWNsZXMlMjBkZXNlcnQlMjB3ZXN0ZXJuJTIwYXVzdHJhbGlhfGVufDF8fHx8MTc1ODEzMTU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-06-05',
    readTime: '4 min read',
    category: 'Destination Guide',
    color: 'yellow',
    type: 'article'
  },
  {
    id: 9,
    title: 'Heartland',
    excerpt: 'Welcome to the Northern Territory (NT), often considered the heartland of our nation! This breathtaking region is a paradise for adventure seekers and nature lovers alike, boasting towering waterfalls, stunning natural swimming holes, and colossal gorges.',
    image: 'https://images.unsplash.com/flagged/photo-1553779801-13e5e5f7398a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bHVydSUyMGF5ZXJzJTIwcm9jayUyMG5vcnRoZXJuJTIwdGVycml0b3J5JTIwYXVzdHJhbGlhfGVufDF8fHx8MTc1ODQ1OTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-05-18',
    readTime: '3 min read',
    category: 'Destination Guide',
    featured: false,
    color: 'yellow',
    type: 'article'
  },
  {
    id: 10,
    title: 'Beautiful One Day, Queensland at Best',
    excerpt: 'Queensland, Australia\'s second-largest state, is a treasure trove of natural wonders and breathtaking landscapes. From pristine beaches to lush rainforests, discover why Queensland offers countless benefits for an unforgettable holiday.',
    image: 'https://images.unsplash.com/photo-1749247325595-d087d2f7591b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWVlbnNsYW5kJTIwYXVzdHJhbGlhJTIwYmVhY2glMjByZWVmJTIwdHJvcGljYWwlMjBwYXJhZGlzZXxlbnwxfHx8fDE3NTgzOTQ0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'TravLin Travel',
    date: '2024-04-28',
    readTime: '4 min read',
    category: 'Destination Guide',
    featured: false,
    color: 'yellow',
    type: 'article'
  }
]

export default function TravLinStories({ onNavigateBack, onNavigateToContact, onNavigateToServices, onNavigateToCruises, onNavigateToTravelOptions, onNavigateToAbout, onNavigateToHome }: TravLinStoriesProps) {
  const [showMoreArticles, setShowMoreArticles] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)
  
  // Email functionality states
  const [dreamDestination, setDreamDestination] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmittingGuide, setIsSubmittingGuide] = useState(false)
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)

  const featuredArticle = blogPosts.find(post => post.featured) || blogPosts[0]
  const regularArticles = blogPosts.filter(post => post.id !== featuredArticle.id)
  const visibleArticles = showMoreArticles ? regularArticles : regularArticles.slice(0, 3)
  const hiddenArticles = regularArticles.slice(3)

  const getCategoryBadgeStyle = (color: string) => {
    const baseStyle = {
      borderRadius: '0px !important',
      fontWeight: '500',
      fontSize: '11px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      padding: '4px 8px'
    }
    if (color === 'orange') {
      return { ...baseStyle, backgroundColor: 'var(--brand-orange)', color: 'white' }
    } else if (color === 'yellow') {
      return { ...baseStyle, backgroundColor: 'var(--brand-yellow)', color: 'var(--gray-800)' }
    } else {
      return { ...baseStyle, backgroundColor: 'var(--brand-blue)', color: 'white' }
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
    // Scroll to top of page to show full article
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
  const handleNavigateToStories = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleNavigateToAI = () => onNavigateToContact?.()
  const handleNavigateToContact = () => onNavigateToContact ? onNavigateToContact() : (window.location.href = '/contact')

  // Email functionality - placeholder functions for now
  const handleCustomGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dreamDestination.trim()) {
      toast.error('Please enter a destination for your custom guide.')
      return
    }
    setIsSubmittingGuide(true)
    // Simulate API call
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
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed! You'll receive our latest travel stories and tips.")
      setEmail('')
      setIsSubmittingNewsletter(false)
    }, 1000)
  }

  // If an article is selected, show the full article view
  if (selectedArticle) {
    const article = blogPosts.find(post => post.id === selectedArticle)
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

        {/* Article Hero Image */}
        <section 
          className="relative h-[70vh] bg-cover bg-center flex items-end text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.15)), url('${article.image}')`,
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
          <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

            {/* Article Title and Meta - Over hero image */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Badge 
                  style={getCategoryBadgeStyle(article.color)}
                  className="text-white uppercase tracking-wide shadow-lg"
                >
                  {article.category}
                </Badge>
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight text-shadow-extra"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {article.title}
              </motion.h1>
              <motion.div 
                className="flex items-center space-x-4 text-white/90 text-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(article.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Full Article Content */}
        <main className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Back Button - Positioned below hero */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button 
                onClick={handleBackToStories}
                className="flex items-center text-lg font-bold transition-all hover:scale-110"
                style={{ color: 'var(--brand-blue)' }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
            </motion.div>

            {/* Article Content */}
            <motion.div 
              className="article-content-styling prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="article-intro">
                {article.excerpt}
              </div>
              
              {article.id === 1 && (
                <div>
                  <h3>Are Agents Still Relevant?</h3>
                  <p>Travel agents consistently showcase their resilience, expertise, and passion for continuous learning, all while prioritizing customer satisfaction. These qualities are crucial for turning your travel dreams into reality. We aim to dispel misconceptions about travel agents and highlight why partnering with an Australian travel agent should be the new standard for travelers.</p>
                  
                  <p>While some believe online booking sites have made agents obsolete—much like printed maps—they remain essential resources, even for seasoned explorers. <strong>We say YES! Travel agents are invaluable, and here's why:</strong></p>
                  
                  <h4>Why Should I Use a Travel Agent Instead of the Internet?</h4>
                  <p>You might think that booking your own travel eliminates the middleman and guarantees the best deal, but this is a common misconception. Often, anything you find online can be matched or even improved upon by a travel agent. In fact, we encourage you to do some initial research online because, as the saying goes, <em>"Internet for looking, travel agent for booking."</em></p>
                  
                  <p><strong>Facts:</strong> Purchasing travel is unique, as it combines both a product and a service. The personalized recommendations and genuine care provided by a travel agent are qualities that online competitors simply cannot replicate. Travel agents prioritize your best interests, a fact highlighted during the COVID-19 crisis when many went above and beyond to assist affected travelers.</p>
                  
                  <p>A great travel agent takes the time to understand your preferences, whether it's the ideal cruise line, hotel style, or airline. Isn't it refreshing when someone remembers your name and shows genuine interest in your travel aspirations? When you work with an agent, you feel valued and heard.</p>
                  
                  <p>Travel is not one-size-fits-all, and if your agent delivers exceptional service, you'll likely return for future holidays. This repeat business has driven growth in the travel agent sector year after year. A skilled travel agent provides the seamless experience you deserve, sharing in your excitement and conducting thorough research on your destination, covering crucial details like visa requirements and time zones.</p>
                  
                  <p>Can an online booking site offer all of this? Most likely not! For instance, when flying into Rarotonga, travel agents know you'll arrive a day earlier due to time zone differences—without this knowledge, travelers risk booking accommodations for the wrong date and scrambling for help later. Many clients who booked online have called agents for assistance when issues arise—often unable to reach anyone at the offshore call center.</p>
                  
                  <p>Think of a travel agent as an essential part of your insurance policy—an invaluable yet invisible companion on your journey. Why take unnecessary risks when you don't have to?</p>
                  
                  <h4>Isn't It More Expensive to Book Through a Travel Agent?</h4>
                  <p>The answer is both yes and no. Remember that the cheapest option isn't always the best choice. For instance, a travel agent might find you a wonderful 4.5-star holiday package to Fiji; however, if you're looking for an even better deal, they could suggest a 3-star package that's less expensive but may impact your overall enjoyment.</p>
                  
                  <p><strong>Facts:</strong> Travel professionals save you time and money by customizing your experience to fit your needs and budget. Their goal is to maximize the value of your investment. When you consult a travel advisor, you gain convenience, expert knowledge, outstanding service, competitive pricing, and overall value—making your holiday exceptional.</p>
                  
                  <p>They ensure every aspect of your trip meets your expectations, so you feel satisfied with every dollar spent. Unlike a faceless algorithm, a travel agent acts as your personal shopper, getting to know your likes and dislikes over time for more meaningful interactions. Plus, by working with a local travel business, you support your community and contribute to the Australian economy.</p>
                  
                  <p>Booking online often benefits offshore companies rather than local enterprises. Australian travel agents have expert knowledge of airline fares and regulations, allowing them to secure the best options for you. They provide valuable insights, from visa requirements to insider tips like recommending the best restaurant in town. This expertise can elevate your trip from good to extraordinary. <strong>That's true value!</strong></p>
                  
                  <h4>How Does the Travel Agent Commission System Work?</h4>
                  <p><strong>We Can Explain:</strong> Travel agents are driven by passion, not just profit. While they need to earn a living, their true motivation lies in helping clients create unforgettable travel experiences that align with their desires.</p>
                  
                  <p><strong>Facts:</strong> Travel agents earn income through a small commission on the products they sell and bookings they facilitate. This commission, typically paid by hotels, cruise lines, or tour operators, is included in your trip cost and never comes directly from you.</p>
                  
                  <p>Commission rates differ by product and supplier, but your travel agent will never push you toward a specific company just to increase their earnings. Since COVID-19, many airlines have eliminated commissions, leading agencies to charge professional service fees that reflect their expertise. Essentially, when you work with a travel agent, you're not just paying for a booking; you're investing in personalized service and valuable insights that significantly enhance your travel experience.</p>
                  
                  <h4>Why Should We Trust Travel Agents?</h4>
                  <p><strong>We Reply:</strong> Do you really think a faceless bot on the other side of your computer cares about your holiday? Third-party websites focus primarily on making sales, not ensuring a seamless travel experience. They won't verify if your luggage is included or if you have enough time for crucial in-flight connections. And if something goes wrong? You could find yourself stuck on hold for hours with no one available to assist you.</p>
                  
                  <p><strong>Facts:</strong> With travel agents, the details matter. While booking travel may seem straightforward, its complexities can surprise you. Imagine arriving at your hotel after a long flight only to find that check-in isn't for another five hours—wasting precious vacation time! Fortunately, your travel agent ensures you have a hotel with 24-hour check-in, so you can settle in and rest before your adventures begin. They might even request a high room for you, knowing how much you enjoy breathtaking skylines.</p>
                  
                  <p>Your travel agent acts as your advocate, always ready to assist. Whether you need an ocean view upgrade or help during an emergency, like an earthquake, your agent will intervene with suppliers on your behalf. Available 24/7, they can be lifesavers when unexpected events arise. For example, if a family emergency prevents you from traveling, just one call to us can resolve everything—we handle cancellations, liaise with airlines, and pursue refunds. Meanwhile, imagine other travelers scrambling to rebook or sitting on hold for hours.</p>
                  
                  <p>We leverage our extensive network of contacts and supplier representatives to benefit our clients. If your flight gets canceled, we spring into action—waiting on hold as long as necessary while using our industry connections. Our agents are informed about hundreds of partners in tours, cruises, car rentals, accommodations, and attractions. With us by your side, you're not just another booking; you're part of a dedicated network that ensures an exceptional travel experience.</p>
                  
                  <h4>What If I Ask You to Create an Itinerary for Me and Then Book It Myself?</h4>
                  <p><strong>We Say:</strong> While this may seem like a smart way to save money, there's little advantage to this approach. Travel professionals frequently encounter clients who request quotes only to book the trip themselves later using that information. This is both amusing and disheartening, as our primary goal is to assist you!</p>
                  
                  <p><strong>Facts:</strong> We offer customized Australian experiences that you won't find anywhere else. When you book through a travel agent, your funds are secure, and you support local businesses, many of which are small and community-focused. In contrast, booking online often involves navigating foreign sites that lack transparency. Many consumers are unaware that these sites may not provide any protection, as they are typically owned by offshore entities.</p>
                  
                  <p>Travel agents can match or even beat online prices while offering invaluable local service. With years of industry experience, travel professionals have the connections to arrange unique side trips and experiences unavailable through online bookings. In this ever-changing travel landscape, consulting a knowledgeable agent is essential. Like a doctor or accountant, a travel advisor asks the right questions to understand your needs and provides expert guidance on how to maximize your time off. After all, there are no do-overs for a vacation gone wrong.</p>
                  
                  <p>Travel agents can help you navigate offers from cruise lines, airlines, and hotels while accessing exclusive deals not available to the public. They can even combine flights from different airlines into a single ticket. With so many options across land, air, and sea, how do you know if your chosen cruise is right for you? A travel professional can help you decipher these details and select options tailored to your unique trip.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">In Summary...</h3>
                    <p>These are just a few advantages of booking with a travel professional. The travel landscape—encompassing terms, conditions, rules, visas, and permits—is constantly evolving. With so many changes occurring regularly, it's difficult to predict whether that online booking bot will remain relevant in 2 months or even 5 months down the line.</p>
                    
                    <p>This is where travel agents truly shine; they are trusted experts who navigate this ever-evolving environment with invaluable expertise and personalized service. So let's celebrate the future of travel—the future of experts who bring personalized knowledge and passion while fostering a spirit of Australians supporting Australians.</p>
                    
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      Linda Forster – TravLin Travel – Your Personal Travel and Cruise Specialist
                    </p>
                  </div>
                </div>
              )}

              {/* CRUISE CABIN ARTICLE - READY FOR NEW CONTENT */}
              {article.id === 2 && (
                <div>
                  {/* Article content will be added here */}
                </div>
              )}

              {article.id === 3 && (
                <div>
                  <h3>NTIA Champions!</h3>
                  <p>Christian Hunter, MD of Most Outstanding Travel Agency Network, Travellers Choice, on the (not so) secret to the group's success.</p>
                  
                  <p>At the recent NTIAs (National Tourism Industry Awards), Christian Hunter, the Managing Director of Travellers Choice, discussed the significance of the group winning the Most Outstanding Travel Agency Network award. <strong>A win for the fourth consecutive year!</strong> He emphasized that this achievement reflects their commitment to excellence and the importance of customer loyalty in their success. Hunter also highlighted Travellers Choice's dedication to empowering Australia's independent agents, showcasing how they strive to foster a supportive environment within the industry.</p>
                  
                  <h4>What does winning this award mean to Travellers Choice?</h4>
                  <p>It's immensely rewarding for the entire Travellers Choice family because it means the broader travel industry recognises and respects our efforts to set the benchmark when it comes to supporting Australia's independent travel agents.</p>
                  
                  <h4>To what do you attribute the group's success?</h4>
                  <p>The fact that Travellers Choice is so dedicated to supporting its members, and our relentless push to find new ways to enhance that support. Our entire focus is on ensuring our members have everything they need to succeed. That's why this year we achieved an astonishing <strong>Net Promoter Score of 90</strong>. This puts us in the upper echelons of companies globally when it comes to customer loyalty.</p>
                  
                  <h4>What are you most excited about that's coming up for Travellers Choice and the sector more broadly?</h4>
                  <p>We've got our conference this weekend, so we'll have a great opportunity to celebrate as a group. At the same time, we'll be announcing new initiatives to help our members address some pressing challenges. As to the sector more broadly, ATIA, which I chair, has just released some great initiatives that will also help the entire travel agency community thrive – and I'm really excited to see those rolled out.</p>
                  
                  <h4>What does the future look like for Travellers Choice?</h4>
                  <p>In a word… <strong>bright!</strong> Recognition at four consecutive National Travel Industry Awards [2019, 2022, 2023 and 2024] is a great endorsement of the products and services we offer, and we'll be working to capitalise on that by inviting other successful, independent members to our group.</p>
                  
                  <h4>What do you love most about Travellers Choice?</h4>
                  <p>The camaraderie and the passionate desire among our members to see Travellers Choice succeed. We have a culture of support that goes beyond our corporate office and extends to every member of our network. They will do anything to help their colleagues. I think that's a unique and special aspect of our group.</p>
                  
                  <h4>Care to share a fun travel tip that you swear by when exploring new places?</h4>
                  <p>Do your research, but be prepared to wander and get lost because, in my experience, finding your way home can lead you to stumble across some amazing hidden gems. If all else fails, you're bound to find a few bars to stop in.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Our TravLin Connection</h3>
                    <p>Similar to our mantra here at TravLin Travel - "get lost on purpose, just have your hotel name handy". <strong>Congratulations Travellers Choice</strong> ... we are very proud to be members of such an incredible and supportive network agency group.</p>
                    
                    <p><strong>Watch out 2025... we'll be knocking on your door for our 5th!</strong></p>
                  </div>
                </div>
              )}
              
              {article.id === 5 && (
                <div>
                  <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Victoria</span>, Australia's smallest mainland state, is a vibrant destination that shines year-round. With diverse landscapes, rich cultural heritage, and a plethora of sporting events, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Victoria</span> offers something for everyone, making it an ideal choice for any season.</p>
                  
                  <h3>What Makes Victoria Shine</h3>
                  <p><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Melbourne</span></strong>: As the state capital, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Melbourne</span> is known as Australia's cultural capital. Here, world-class dining, arts, and shopping await. Stroll through iconic laneways filled with street art, cozy cafes, and boutique shops. <strong>Insider Tip:</strong> Don't miss <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Hosier Lane</span> for stunning street art; it's a photographer's paradise!</p>
                  
                  <p><strong>Natural Beauty</strong>: From the breathtaking <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Great Ocean Road</span> to the serene <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Yarra Valley</span> vineyards, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Victoria's</span> landscapes are both stunning and diverse. <strong>Insider Tip:</strong> Drive the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Great Ocean Road</span> at sunrise for fewer crowds and magical lighting on the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Twelve Apostles</span>.</p>
                  
                  <p><strong>Cultural Events</strong>: The state hosts numerous festivals throughout the year, celebrating food, wine, arts, and music. <strong>Insider Tip:</strong> Check local listings for pop-up events showcasing local talent and produce.</p>
                  
                  <h4>Best Sporting Events to Plan Your Trip Around</h4>
                  <ul>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Australian Open</span> Tennis Championship (January)</strong>: Start the year with this prestigious Grand Slam event in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Melbourne</span>. Experience thrilling matches under the summer sun.</li>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Formula One Grand Prix</span> (March)</strong>: Watch the world's fastest cars race around Albert Park Circuit in a spectacular four-day event.</li>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">AFL Season</span> (March - September)</strong>: Immerse yourself in Australian Rules Football by attending matches at the iconic <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Melbourne Cricket Ground (MCG)</span>. <strong>Insider Tip:</strong> Arrive early to enjoy the pre-game atmosphere and local food stalls.</li>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Spring Racing Carnival</span> (September - November)</strong>: Join in the festivities of horse racing, culminating in the famous <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Melbourne Cup</span>—known as "The Race that Stops a Nation."</li>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Boxing Day Test</span> (December)</strong>: Witness Australia's cricket team compete in this beloved tradition at the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">MCG</span>, surrounded by enthusiastic fans.</li>
                  </ul>
                  
                  <h4>Places to Stay</h4>
                  <p>For luxury accommodations, consider <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">The Langham</span> or <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Crown Towers</span> in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Melbourne</span> for stunning views and top-notch amenities. If you prefer boutique options, explore unique stays like <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">The Hotel Windsor</span> or <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Ovolo Laneways</span>, which offer personalized experiences. For families or groups, self-catering options such as serviced apartments provide flexibility and comfort. Adventurous travelers can find numerous campgrounds in national parks like <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Grampians National Park</span> and <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Wilsons Promontory</span>.</p>
                  
                  <h4>Best Parts of Victoria to Visit</h4>
                  <ul>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Great Ocean Road</span></strong>: Famous for its dramatic coastal scenery and landmarks like the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Twelve Apostles</span>, this iconic drive is a must-do.</li>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Yarra Valley</span></strong>: Renowned for its wineries and gourmet food experiences, it's perfect for wine lovers. <strong>Insider Tip:</strong> Book a guided wine tour to discover hidden gems not found on typical itineraries.</li>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Phillip Island</span></strong>: Known for its wildlife experiences, including the famous <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Penguin Parade</span> where you can watch little penguins return to shore at sunset.</li>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Dandenong Ranges</span></strong>: This beautiful area features lush forests, charming villages, and scenic walking trails.</li>
                    <li><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Ballarat and Bendigo</span></strong>: Rich in gold rush history, these towns offer fascinating museums and beautiful architecture.</li>
                  </ul>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Experience Victoria</h3>
                    <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Victoria</span> is truly a state for all seasons. It offers an array of experiences that cater to every interest. Whether you're drawn by vibrant cities, stunning natural landscapes, or exciting sporting events, something special awaits you throughout the year.</p>
                    <p className="article-cta">To make your visit unforgettable, plan your itinerary with TravLin Travel! Our expert team can help you uncover hidden gems while ensuring you experience all that this remarkable state has to offer. Don't just dream about your adventure—immerse yourself in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Victoria's</span> magic!</p>
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      Contact TravLin Travel today
                    </p>
                  </div>
                </div>
              )}
              
              {article.id === 7 && (
                <div>
                  <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia</span> is renowned for its luxury offerings, including local wine, exquisite food, and stunning natural beauty. But what should you prioritize during your <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia</span> holiday?</p>
                  
                  <h3>The Wine Will Have You Thirsty for a Visit!</h3>
                  <p>The wine regions are the primary draw for tourists, making <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia</span> a top destination for winemaking. With famous brands like <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Penfolds</span>, visitors flock to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Barossa Valley</span>, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">McLaren Vale</span>, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Adelaide Hills</span>, and <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Clare Valley</span>.</p>
                  
                  <p>Combine your wine experience with fabulous cuisine on the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Epicurean Way Road Trip</span>. Pack your picnic basket and esky as you journey through <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">McLaren Vale</span>, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Adelaide Hills</span>, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Barossa</span>, and <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Clare Valley</span>. Let your taste buds guide you as you sip and dine at the best wineries, restaurants, and artisan producers. Thanks to fertile soil, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia</span> boasts an abundance of local produce. You'll find a variety of must-visit food stops, from charming cafes to first-class restaurants.</p>
                  
                  <h4>Scenic Vistas Await</h4>
                  <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia</span> offers breathtaking scenic vistas that showcase its natural wonders. Plan a picnic at the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Onkaparinga River Mouth</span> on the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Fleurieu Peninsula</span>. Alternatively, embark on a <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Murray River</span> walk or marvel at the iconic <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Pink Lakes</span> on the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Eyre Peninsula</span>. For a unique perspective, consider flying over <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Wilpena Pound</span>.</p>
                  
                  <h4>Where to Stay?</h4>
                  <p>For luxury accommodations, consider <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">The Louise</span> in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Barossa Valley</span> or <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Arkaba</span> in the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Flinders Ranges</span>. If you prefer a more rustic experience, try <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Safari Camping</span> in the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Flinders Ranges</span>.</p>
                  
                  <p>No trip to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia</span> is complete without wildlife encounters. <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Kangaroo Island</span> is a must-visit! Over a third of the island is protected as nature reserves, home to native wildlife like sea lions and koalas. <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Flinders Chase National Park</span> features penguin colonies and stunning coastal rock formations such as <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Remarkable Rocks</span> and <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Admirals Arch</span>. Immerse yourself in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia's</span> rich bushland, where unique reptiles and marsupials thrive alongside famous kangaroos and koalas.</p>
                  
                  <h4>Festivals and Events</h4>
                  <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia's</span> entertainment scene thrives with festivals and events. The cities boast a cosmopolitan culture rich in history and art. Throughout the state, festivals celebrating food, film, sports, and more occur regularly.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Discover South Australia</h3>
                    <p>Discover <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia's</span> laid-back atmosphere through its food, wine, wildlife, culture, and events. Enjoy the finer things in life while experiencing everything this great state has to offer.</p>
                    <p className="article-cta">Ready to explore <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia</span>? Contact TravLin Travel for a personalized itinerary that highlights this extraordinary state's luxury treats! Don't just dream about your adventure—immerse yourself in all that <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">South Australia</span> has to offer!</p>
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      Contact TravLin Travel Today!
                    </p>
                  </div>
                </div>
              )}
              
              {article.id === 8 && (
                <div>
                  <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia</span> is a region defined by striking contrasts and stunning beauty. It seamlessly merges breathtaking natural landscapes with contemporary urban life. From rugged coastlines to vibrant cities, this expansive state enchants visitors with its diverse environments and rich experiences.</p>
                  
                  <h3>Natural Wonders</h3>
                  <p>First and foremost, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia</span> is home to some of the world's most remarkable natural attractions. Its coastline stretches over 12,500 kilometers, showcasing pristine beaches, dramatic cliffs, and crystal-clear waters.</p>
                  
                  <p>One highlight is <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Ningaloo Reef</span>, a UNESCO World Heritage site that exemplifies marine biodiversity. This fringing coral reef hosts various marine species, including gentle whale sharks that visit annually. Snorkeling here offers an unforgettable experience as colorful fish weave through vibrant coral formations.</p>
                  
                  <p>Inland, the scenery shifts dramatically. The <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Pinnacles Desert</span> in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Nambung National Park</span> presents a surreal landscape of limestone formations rising from golden sands. These ancient pillars tower several meters high, creating an ethereal atmosphere—especially at sunrise or sunset when elongated shadows stretch across the desert floor.</p>
                  
                  <p>Further north, the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Kimberley region</span> reveals nature in its rawest form. The iconic <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Bungle Bungle Range</span> in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Purnululu National Park</span> features unique beehive-shaped rock formations. The area's gorges, waterfalls, and ancient rock art sites narrate the land's extensive geological and cultural history.</p>
                  
                  <h4>Urban Sophistication</h4>
                  <p>In contrast to its wild landscapes, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia</span> boasts modern and lively cities. <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Perth</span>, the state capital, epitomizes urban sophistication. Situated along the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Swan River</span>, it harmoniously blends city life with natural beauty.</p>
                  
                  <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Kings Park</span>, one of the largest inner-city parks globally, offers a green sanctuary in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Perth's</span> heart. Its elevated location provides stunning views of the city skyline and <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Swan River</span>. The park's botanical gardens highlight the state's unique flora while its war memorials and Aboriginal art installations celebrate <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia's</span> diverse heritage.</p>
                  
                  <p>Moreover, the city's cultural landscape is flourishing. World-class museums, galleries, and performance venues abound. The <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Perth Cultural Centre</span> serves as a creative hub, housing institutions like the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Art Gallery of Western Australia</span> and the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">State Theatre Centre</span>.</p>
                  
                  <h4>Lifestyle and Adventure</h4>
                  <p>The lifestyle in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia</span> mirrors its varied landscapes. In <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Perth</span>, you can start your day surfing at <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Cottesloe Beach</span>, enjoy a gourmet lunch in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Fremantle's</span> historic streets, and conclude with a sunset cruise on the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Swan River</span>. The Mediterranean climate encourages outdoor living year-round.</p>
                  
                  <p>Adventure seekers will find limitless opportunities. <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Rottnest Island</span>, just offshore from <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Perth</span>, is a car-free haven perfect for cycling or snorkeling in secluded bays while encountering quokkas—small marsupials known for their cheerful expressions.</p>
                  
                  <p>Wine lovers will delight in the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Margaret River region</span>, located about three hours south of <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Perth</span>. Renowned for world-class wineries and a gourmet food scene, this area also boasts stunning coastlines where visitors can sample exquisite wines, surf at beautiful beaches, and explore ancient caves.</p>
                  
                  <h4>The Contrast</h4>
                  <p>The juxtaposition of <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia's</span> natural wonders with its modern developments is particularly evident in its mining industry. The <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Pilbara region</span> features some of the world's oldest landscapes alongside extensive iron ore mining operations. This blend of ancient beauty and industrial progress defines <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia</span>.</p>
                  
                  <p>Here, you can marvel at billion-year-old rock formations by day and dine at a high-end restaurant in a skyscraper by night.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Experience it Yourself</h3>
                    <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia's</span> unique combination of natural beauty and urban sophistication caters to every traveler's desires. Whether you seek adventure in the outback, relaxation on pristine beaches, or cultural experiences in bustling cities, this vast state offers it all.</p>
                    <p>To fully appreciate the 'Wide West,' firsthand experience is essential. From the otherworldly landscapes of <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Pinnacles Desert</span> to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Perth's</span> cosmopolitan charm; from <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Kimberley's</span> ancient gorges to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Margaret River's</span> world-class wineries—<span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia</span> is a realm of endless exploration.</p>
                    <p className="article-cta">Ready to embark on your adventure? Contact TravLin Travel for a personalized itinerary that will guide you through this extraordinary state. Our expert team can curate an experience that blends <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Western Australia's</span> natural wonders with urban delights tailored to your preferences. Don't just dream about exploring the 'Wide West'—immerse yourself in its magic!</p>
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      Contact TravLin Travel today
                    </p>
                  </div>
                </div>
              )}
              
              {article.id === 9 && (
                <div>
                  <p>Welcome to the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Northern Territory (NT)</span>, often considered the heartland of our nation! This breathtaking region is a paradise for adventure seekers and nature lovers alike, boasting towering waterfalls, stunning natural swimming holes, and colossal gorges that will leave you in awe. With its expansive outback desert landscapes and rich Aboriginal heritage, a trip to the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">NT</span> promises not just a vacation but a truly spiritual journey.</p>
                  
                  <h3>Hit the Road to Adventure</h3>
                  <p>The phrase "Hit the Road to the Great Outdoors" perfectly encapsulates what the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">NT</span> has to offer. From the UNESCO World Heritage-listed <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Kakadu National Park</span> to the exhilarating <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Larapinta Trek</span> in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Alice Springs</span>, there's something for everyone. Whether you enjoy walking, trekking, sightseeing, or swimming, your days will be filled with wonder.</p>
                  
                  <p>Don't forget to indulge in some magical stargazing at <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Earth Sanctuary</span>, where the desert sky shines brighter without city lights. The cascading waterfalls at <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Litchfield National Park</span> provide a refreshing escape from the heat, while <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Ormiston Gorge</span> and <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Nitmiluk (Katherine Gorge)</span> are must-visit highlights. And for train enthusiasts, the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Ghan Railway Route</span> is one of Australia's most iconic journeys.</p>
                  
                  <h4>Luxurious Accommodations</h4>
                  <p>For those who appreciate comfort and luxury, consider staying at <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Bamurru Plains Wilderness Camp</span> in the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Top End</span>. Experience glamping—a unique blend of glamour and camping that immerses you in your surroundings while providing all the comforts of home. <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Longitude 131</span> is another popular choice, offering luxurious glamping experiences in the floodplains of <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Kakadu</span>. With so many options available, including hotels and self-contained apartments in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Darwin</span>, you can tailor your stay to fit your style.</p>
                  
                  <h4>Thrilling Activities Await</h4>
                  <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Darwin</span> is brimming with exciting activities! Enjoy a movie under the stars at <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Deckchair Cinema</span> or delve into history at the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Royal Flying Doctors</span> exhibit at the waterfront. For thrill-seekers, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Crocosaurus Cove</span> offers an adrenaline-pumping cage swimming experience with crocodiles—if you dare! Prefer something less intense? Watch jumping crocodiles being fed instead.</p>
                  
                  <p>Set sail on a magical sunset cruise in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Darwin Harbour</span> or embark on a Fishing Safari to catch a barramundi. For a unique cultural experience, take a trip to the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Tiwi Islands</span>.</p>
                  
                  <p>No visit to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">NT</span> would be complete without marveling at <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Uluru</span>, Australia's most iconic monolith. Explore this majestic site on a Segway or walk around its rim to soak in its spiritual significance. Standing taller than the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Eiffel Tower</span> and with a circumference of 9.4 km, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Uluru</span> is around 600 million years old—an awe-inspiring sight that should not be missed!</p>
                  
                  <h4>Explore Kings Canyon</h4>
                  <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Kings Canyon</span> offers another incredible side trip where you can immerse yourself in indigenous cultural experiences. Choose between a scenic helicopter flight or a leisurely walk along its rim—either way, you'll be captivated by its beauty.</p>
                  
                  <p>Don't forget to check out the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">"Field of Lights,"</span> an enchanting art installation that illuminates the desert landscape. Witnessing sunrise or sunset over <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Uluru</span> is also an unforgettable way to conclude your <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">NT</span> adventure.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Your Adventure Awaits!</h3>
                    <p>The <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Northern Territory</span> is more than just a destination; it's an experience that will ignite your spirit and leave you with lasting memories. With its stunning landscapes, rich cultural heritage, and endless opportunities for adventure, booking a trip to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">NT</span> is an exciting option for any traveler seeking something extraordinary.</p>
                    <p className="article-cta">Don't miss out on this chance to explore Australia's heartland—your unforgettable journey awaits!</p>
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      Contact TravLin Travel today
                    </p>
                  </div>
                </div>
              )}
              
              {article.id === 10 && (
                <div>
                  <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Queensland</span>, Australia's second-largest state, is a treasure trove of natural wonders and breathtaking landscapes. From pristine beaches to lush rainforests, a trip to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Queensland</span> offers countless benefits that promise an unforgettable holiday.</p>
                  
                  <h3>Immerse Yourself in Nature</h3>
                  <p>First and foremost, one of the greatest advantages of visiting <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Queensland</span> is the chance to connect with nature. The state features stunning national parks and world heritage-listed sites. Here, you can immerse yourself in the beauty of <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Mossman Gorge</span>, the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Daintree Rainforest</span>, and the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Gold Coast hinterland</span>. Whether you hike the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Scenic Rim Trail</span> or explore <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Noosa National Park</span>, you'll find endless ways to appreciate the great outdoors.</p>
                  
                  <h4>Diverse Accommodation Options</h4>
                  <p>Thanks to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Queensland's</span> fabulous climate, you'll discover a wide range of accommodation choices for every preference and budget. For instance, enjoy luxurious treehouse stays at <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Silky Oaks</span> in the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Daintree</span> or opulent retreats at <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Qualia</span> on <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Hamilton Island</span>. Unique experiences await at <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Reef Suites</span>, Australia's first underwater hotel on the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Great Barrier Reef</span>, or at the off-the-grid <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Mt Mulligan Lodge</span>. These diverse options ensure your stay is as enjoyable as your adventures.</p>
                  
                  <h4>Exciting Attractions and Activities</h4>
                  <p>Moreover, booking a trip to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Queensland</span> means access to some of Australia's best attractions. Experience thrilling rides at theme parks like <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Movie World</span>, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">SeaWorld</span>, and <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Wet'n'Wild</span>. For adrenaline junkies, skydiving over the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Gold Coast</span> offers exhilarating views of the coastline. Additionally, road trips like <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Cairns to Cooktown</span> and scenic journeys on the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Kuranda Railway</span> provide breathtaking sights. Don't miss cultural events like <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">"Spirits of the Red Sand,"</span> which connect you with Australia's rich heritage.</p>
                  
                  <h4>Thrilling Aquatic Adventures</h4>
                  <p>Furthermore, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Queensland's</span> coastline is renowned for aquatic activities, making it a paradise for adventure seekers. Book a white-water rafting trip on the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Tully River</span> or swim with humpback whales in <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Mooloolaba</span> or dwarf minke whales in the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Great Barrier Reef</span>. Snorkeling and scuba diving are must-do activities; unique options like <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Scuba Doo</span> offer exciting underwater experiences. The <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Great Barrier Reef</span> is stunning and a bucket-list destination for travelers worldwide.</p>
                  
                  <h4>Relaxation and Serenity</h4>
                  <p>Sailing through the <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Whitsunday Islands</span> provides a serene escape where you can unwind amidst breathtaking scenery. The pure white sand here is so fine that it can even clean your jewelry! Island hopping allows you to explore beautiful destinations like <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Bedarra</span>, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Lizard</span>, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Green</span>, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Fitzroy</span>, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Fraser</span>, and <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Lady Elliot Island</span>—all offering unique experiences and stunning views.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Your Adventure Awaits</h3>
                    <p>Booking a trip to <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Queensland</span> with TravLin Travel opens up a world of possibilities for adventure, relaxation, and cultural exploration. With its diverse landscapes, luxurious accommodations, thrilling attractions, and aquatic adventures, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Queensland</span> promises an unforgettable experience that caters to every traveler's desires.</p>
                    <p className="article-cta">Don't miss out on creating lasting memories in this stunning destination!</p>
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      Contact TravLin Travel today!
                    </p>
                  </div>
                </div>
              )}
              
              {article.id === 6 && (
                <div>
                  <h3>Where to Go and What to Do</h3>
                  <p><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Cradle Mountain</span></strong>: This breathtaking destination is a must-visit, offering year-round accessibility. Engage in activities like hiking, kayaking on Dove Lake, and wildlife spotting. <strong>Insider Tip:</strong> Start your hike early to catch the sunrise over the mountain for an unforgettable view.</p>
                  
                  <p><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Bay of Fires</span></strong>: Renowned for its pristine beaches and striking orange-hued rocks, this area is perfect for swimming and relaxation. <strong>Insider Tip:</strong> Visit during low tide to explore hidden coves and enjoy a picnic on the beach.</p>
                  
                  <p><strong>Freycinet National Park</strong>: Home to Wineglass Bay, consistently ranked among the world's best beaches, this park is ideal for hiking, camping, and water activities. <strong>Insider Tip:</strong> Take the Wineglass Bay Lookout track for stunning panoramic views before descending to the beach.</p>
                  
                  <p><strong><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Hobart</span></strong>: As the capital city, Hobart beautifully blends history with modernity. Explore attractions like Salamanca Market and the Museum of Old and New Art (MONA). <strong>Insider Tip:</strong> Visit MONA on a Sunday to enjoy live music and a lively atmosphere at their "Sunday Sessions."</p>
                  
                  <p><strong>Port Arthur Historic Site</strong>: This UNESCO World Heritage site offers a glimpse into Australia's convict history. <strong>Insider Tip:</strong> Join a guided tour for deeper insights into the site's history and haunting tales.</p>
                  
                  <p><strong>Wildlife Encounters</strong>: <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Tasmania</span> is a haven for wildlife enthusiasts. Spot Tasmanian devils and unique bird species throughout the island. <strong>Insider Tip:</strong> Visit Bonorong Wildlife Sanctuary for close encounters with native animals and to learn about conservation efforts.</p>
                  
                  <p><strong>Huon Valley</strong>: Known for its apple orchards and stunning river views, this region is perfect for scenic drives and tastings. <strong>Insider Tip:</strong> Stop by local farms for fresh cider tastings or homemade jams.</p>
                  
                  <p><strong>Maria Island</strong>: Accessible by ferry, this national park is ideal for hiking and wildlife spotting. <strong>Insider Tip:</strong> Bring your bike to explore the island's trails more easily.</p>
                  
                  <h4>Where to Stay</h4>
                  <p>For luxury accommodations, consider Saffire Freycinet, which offers high-end amenities and breathtaking views. Alternatively, boutique hotels like The Henry Jones Art Hotel in Hobart blend history with modern comfort. If you prefer flexibility, self-catering cottages are available throughout the island. For those seeking adventure, numerous campgrounds in national parks provide immersion in nature.</p>
                  
                  <h4>When is the Best Time to Visit?</h4>
                  <p>The ideal time to visit <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Tasmania</span> largely depends on your preferences:</p>
                  <ul>
                    <li><strong>Summer (December to February)</strong>: These warm months average between 20°C to 24°C. This peak tourist season is perfect for beach activities and outdoor festivals.</li>
                    <li><strong>Autumn (March to May)</strong>: Many consider this the best time to visit due to mild weather and stunning fall foliage. The "Turning of the Fagus" occurs in April, showcasing vibrant colors.</li>
                    <li><strong>Spring (September to November)</strong>: A time of renewal with blooming flowers and increased wildlife activity. The Tulip Festival in Wynyard is a highlight.</li>
                    <li><strong>Winter (June to August)</strong>: While colder, winter offers unique experiences such as snow activities in the highlands and opportunities to see the Southern Lights.</li>
                  </ul>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Experience <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Tasmania</span></h3>
                    <p><span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">Tasmania</span> is a treasure trove of natural beauty, cultural richness, and unique experiences waiting to be explored. Whether you're hiking through national parks or enjoying local produce at a festival, <span className="hover:text-[var(--brand-blue)] transition-colors cursor-pointer">the Apple Isle</span> promises an unforgettable adventure year-round.</p>
                    <p className="article-cta">Our expert team can help you craft a personalized itinerary that showcases Tasmania's hidden gems alongside its famous attractions. Don't just dream about your adventure—immerse yourself in all that Tasmania has to offer!</p>
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      For all your Tasmanian needs, contact TravLin Travel today!
                    </p>
                  </div>
                </div>
              )}

              {article.id === 2 && (
                <div>
                  <p>Most cruise ship balconies are on the port or starboard sides, but forward and aft (staterooms located at the back or stern of a cruise ship) cabins typically offer larger decks and more space. While both have pros and cons, we'll help you compare them to choose the best cabin for your cruise.</p>
                  
                  <h3>Benefits of choosing Cruise Aft Cabins: Why they are worth it</h3>
                  <p>Aft balcony cabins are located at the back of a cruise ship and offer some great perks for those who love outdoor space. Fans of these cabins rave about the sweeping, uninterrupted ocean views over the ship's wake. Plus, aft cabins often provide significantly more space than standard balcony rooms along the port and starboard sides. If you're seeking maximum deck space, aft corner cabins can offer wraparound balconies, doubling your view.</p>
                  
                  <p>Concerned about noise? Aft cabins tend to be quieter since they're farther from the midship buzz of bars, lounges, pools and the atrium.</p>
                  
                  <h4>Potential drawbacks of Aft Cabins. What to consider before booking</h4>
                  <p>While aft cabins aren't the worst for seasickness, they can feel more of the ship's movement compared to midship cabins. If you're prone to motion sickness, you might want to opt for a midship balcony along the port or starboard sides.</p>
                  
                  <p>Aft cabins may also experience engine or anchor vibrations, which can increase the sense of motion and cause occasional noise. In rare cases, smoke or exhaust from the ship's funnels could drift onto your balcony due to wind direction.</p>
                  
                  <p>Since aft balcony cabins are in high demand, some cruise lines price them higher than standard balcony rooms.</p>
                  
                  <h3>Benefits of forward balcony cabins. Reasons to chose the front of the ship</h3>
                  <p>Cruisers in forward cabins enjoy being the first to see what lies ahead, making it a special way to sail into each port of call. Many cruise lines reserve their forward spaces for unique cabin layouts -- like Royal Caribbean's panoramic ocean view cabins -- that you won't find anywhere else on the ship. It's worth asking us, your cruise master travel agents if your ship has a special forward cabin class.</p>
                  
                  <p>Love the theater? Most cruise ship theatres are located at the front, so booking a forward cabin puts you just a few decks away from catching evening shows or afternoon lectures with ease.</p>
                  
                  <p>Another perk of forward cabins is navigation. You'll always know you're heading toward the back when you leave your room, making it easier to navigate your ship, especially in the first couple of days. (The same goes for aft cabins, except you're always walking toward the front of the ship.)</p>
                  
                  <h4>Potential drawbacks of Forward Cabins. What to know before booking</h4>
                  <p>Worried about seasickness? Forward cabins might not be your best bet. Since they're the first to dip in rough seas, these cabins feel the brunt of the waves, even on lower decks -- making them challenging for anyone prone to motion sickness.</p>
                  
                  <p>If you're set on booking a forward cabin with a view, watch out for rooms with obstructed views from the bridge wing. Check deck plans or consult a travel agent before booking to avoid any surprises. Keep in mind, too, that forward balcony decks may be off-limits on certain days due to weather.</p>
                  
                  <p>Another factor is noise. Forward cabins can pick up sound from bow thrusters (the ship's propulsion devices) and water hitting the front of the vessel, which could add to the experience -- especially for light sleepers.</p>
                  
                  <p>But there is some good news: Obstructed-view cabins tend to cost less.</p>
                  
                  <h3>The bottom line: Aft Cruise Cabins V Forward Cabins</h3>
                  <p>If you're after a unique view but want to save some cash and don't mind a bit of noise, a forward cabin could work well for you. It's also a great choice if you're worried about exhaust, soot or cigarette smoke drifting onto your balcony.</p>
                  
                  <p>On the other hand, if you're curious about the allure of aft cabins and dream of watching the ship's wake, an aft cabin might be your match -- just be prepared for a bit of vibration.</p>
                  
                  <p>If seasickness is a concern, though, remember that while aft cabins experience less movement than forward ones, they still sway. Midship cabins are your safest bet if you want to minimize motion, especially on rough seas.</p>
                  
                  <div className="article-conclusion">
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      Linda Forster – TravLin Travel
                    </p>
                  </div>
                </div>
              )}
              
              {article.id === 3 && (
                <div>
                  <h3>NTIA Champions! Christian Hunter, MD of Most Outstanding Travel Agency Network, Travellers Choice, on the (not so) secret to the group's success</h3>
                  
                  <p>At the recent NTIAs (National Tourism Industry Awards), Christian Hunter, the Managing Director of Travellers Choice, discussed the significance of the group winning the Most Outstanding Travel Agency Network award. A win for the fourth consecutive year! He emphasized that this achievement reflects their commitment to excellence and the importance of customer loyalty in their success. Hunter also highlighted Travellers Choice's dedication to empowering Australia's independent agents, showcasing how they strive to foster a supportive environment within the industry.</p>
                  
                  <h4>What does winning this award mean to Travellers Choice?</h4>
                  <p>It's immensely rewarding for the entire Travellers Choice family because it means the broader travel industry recognises and respects our efforts to set the benchmark when it comes to supporting Australia's independent travel agents.</p>
                  
                  <h4>To what do you attribute the group's success?</h4>
                  <p>The fact that Travellers Choice is so dedicated to supporting its members, and our relentless push to find new ways to enhance that support. Our entire focus is on ensuring our members have everything they need to succeed. That's why this year we achieved an astonishing Net Promoter Score of 90. This puts us in the upper echelons of companies globally when it comes to customer loyalty.</p>
                  
                  <h4>What are you most excited about that's coming up for Travellers Choice and the sector more broadly?</h4>
                  <p>We've got our conference this weekend, so we'll have a great opportunity to celebrate as a group. At the same time, we'll be announcing new initiatives to help our members address some pressing challenges. As to the sector more broadly, ATIA, which I chair, has just released some great initiatives that will also help the entire travel agency community thrive – and I'm really excited to see those rolled out.</p>
                  
                  <h4>What does the future look like for Travellers Choice?</h4>
                  <p>In a word… bright! Recognition at four consecutive National Travel Industry Awards [2019, 2022, 2023 and 2024] is a great endorsement of the products and services we offer, and we'll be working to capitalise on that by inviting other successful, independent members to our group.</p>
                  
                  <h4>What do you love most about Travellers Choice?</h4>
                  <p>The camaraderie and the passionate desire among our members to see Travellers Choice succeed. We have a culture of support that goes beyond our corporate office and extends to every member of our network. They will do anything to help their colleagues. I think that's a unique and special aspect of our group.</p>
                  
                  <h4>Care to share a fun travel tip that you swear by when exploring new places?</h4>
                  <p>Do your research, but be prepared to wander and get lost because, in my experience, finding your way home can lead you to stumble across some amazing hidden gems. If all else fails, you're bound to find a few bars to stop in.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Our Pride in Travellers Choice</h3>
                    <p>Similar to our mantra here at TravLin Travel - "get lost on purpose, just have your hotel name handy". Congratulations Travellers Choice ... we are very proud to be members of such an incredible and supportive network agency group. Watch out 2025... we'll be knocking on your door for our 5th!</p>
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      TravLin Travel
                    </p>
                  </div>
                </div>
              )}
              
              {article.id === 4 && (
                <div>
                  <p>Canberra, the vibrant capital of Australia, is celebrated for its rich history, stunning architecture, and beautiful natural landscapes. The Australian Capital Territory (ACT) offers a unique blend of cultural attractions, outdoor adventures, and culinary delights, making it an ideal destination year-round.</p>
                  
                  <h3>Must-Sees</h3>
                  
                  <h4>Parliament House</h4>
                  <p>Explore the heart of Australian democracy with guided tours that reveal the nation's political history. Insider Tip: Attend Question Time for an exciting glimpse into politics in action.</p>
                  
                  <h4>Australian War Memorial</h4>
                  <p>This poignant tribute honors military service. Engage with exhibitions and ceremonies that commemorate sacrifices.</p>
                  
                  <h4>National Gallery of Australia</h4>
                  <p>Home to an extensive collection of Australian and international art, this gallery features renowned contemporary artists. Insider Tip: Don't miss the outdoor sculpture garden for a unique experience.</p>
                  
                  <h4>Australian National Botanic Gardens</h4>
                  <p>Discover over 5,500 species of native plants in beautifully landscaped gardens. Be sure to visit the Paperbark Treehouse for stunning views.</p>
                  
                  <h4>Lake Burley Griffin</h4>
                  <p>Ideal for walking, cycling, or picnicking, this picturesque lake offers breathtaking views of the city skyline. Insider Tip: Rent a paddleboat for a fun way to explore the lake.</p>
                  
                  <h4>Questacon</h4>
                  <p>An interactive science museum perfect for families, featuring hands-on exhibits that entertain and educate visitors of all ages.</p>
                  
                  <h4>National Museum of Australia</h4>
                  <p>Dive into the nation's history through engaging exhibits showcasing diverse culture and heritage.</p>
                  
                  <h4>Mount Ainslie Lookout</h4>
                  <p>For panoramic views of Canberra, hike or drive to this lookout point—an excellent spot for photography.</p>
                  
                  <h3>Tips for Visiting</h3>
                  <p><strong>Getting Around:</strong> Canberra's public transport is efficient. Use the Canberra Explorer Bus for easy access to major attractions or rent a bike to explore scenic paths around Lake Burley Griffin.</p>
                  
                  <p><strong>Best Time to Visit:</strong> Spring (September to November) and autumn (March to May) are ideal due to mild weather and vibrant festivals like Floriade and Enlighten Festival.</p>
                  
                  <p><strong>Plan Ahead:</strong> Some attractions may require advance bookings or have limited hours, especially during peak seasons.</p>
                  
                  <h3>Accommodations</h3>
                  <p>For luxury stays, consider Hyatt Hotel Canberra, a historic hotel with elegant accommodations and fine dining. Alternatively, Hotel Realm offers modern amenities near Parliament House.</p>
                  
                  <p>For boutique options, check out Midnight Hotel in Braddon for an artsy vibe or The Sebel Canberra Civic, which provides comfortable stays close to major attractions.</p>
                  
                  <p>If you're on a budget, Alivio Tourist Park offers cabins and camping just minutes from the city center. YHA Canberra, a friendly hostel, provides affordable accommodations in a convenient location.</p>
                  
                  <h3>Must-Dos in Canberra</h3>
                  <ul>
                    <li><strong>Attend a Local Festival:</strong> Experience Floriade in spring or the Canberra Balloon Spectacular in autumn for unforgettable sights.</li>
                    <li><strong>Explore Wineries in the ACT Region:</strong> Discover cool-climate wines at nearby vineyards like Clonakilla or Mount Majura Vineyard.</li>
                    <li><strong>Visit Local Markets:</strong> Check out the Old Bus Depot Markets on Sundays for local crafts, food stalls, and unique finds.</li>
                    <li><strong>Outdoor Activities:</strong> Enjoy Canberra's extensive walking trails or join a guided tour through nearby national parks like Namadgi National Park for hiking opportunities.</li>
                    <li><strong>Culinary Experiences:</strong> Indulge in Canberra's thriving food scene with award-winning cafes like Ona Coffee or BentSpoke Brewing Co., known for craft beers.</li>
                  </ul>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Experience Canberra</h3>
                    <p>Canberra is a dynamic city offering diverse experiences for every traveler. From iconic landmarks and cultural institutions to beautiful natural surroundings and culinary delights, there's something for everyone in this vibrant capital. Whether you're visiting for a weekend or planning an extended stay, explore all that Canberra and the ACT have to offer!</p>
                    <p>For all your travel needs in Canberra, our expert team is ready to help you plan an unforgettable adventure tailored just for you.</p>
                    <p className="text-right text-sm italic mt-4" style={{ color: 'var(--gray-600)' }}>
                      Contact TravLin Travel today!
                    </p>
                  </div>
                </div>
              )}
              
              {article.id === 4 && (
                <div>
                  <h3>Canberra: Australia's Hidden Gem</h3>
                  <p>Often overlooked by travelers, Canberra offers a sophisticated blend of cultural attractions, natural beauty, and culinary excellence that rivals any major Australian city.</p>
                  
                  <h4>World-Class Cultural Institutions</h4>
                  <p>From the Australian War Memorial and National Gallery to the Museum of Australian Democracy, Canberra houses some of the nation's most important cultural treasures.</p>
                  
                  <h4>Natural Wonders Within Reach</h4>
                  <p>Lake Burley Griffin, the Australian National Botanic Gardens, and nearby Namadgi National Park offer endless opportunities for outdoor enthusiasts and nature lovers.</p>
                  
                  <h4>Award-Winning Wine Region</h4>
                  <p>The Canberra District wine region produces some of Australia's finest cool-climate wines, with cellar doors and vineyard restaurants offering world-class dining experiences.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Year-Round Destination</h3>
                    <p>With four distinct seasons and attractions for every interest, Canberra is the perfect destination for travelers seeking culture, nature, and sophistication in Australia's capital.</p>
                  </div>
                </div>
              )}
              
              {article.id === 5 && (
                <div>
                  <h3>Victoria: Diversity Defined</h3>
                  <p>Victoria may be Australia's smallest mainland state, but it packs an incredible diversity of experiences into its compact boundaries.</p>
                  
                  <h4>Melbourne: Cultural Capital</h4>
                  <p>From world-famous coffee culture and laneway art to sporting events and music festivals, Melbourne consistently ranks among the world's most liveable cities.</p>
                  
                  <h4>Great Ocean Road</h4>
                  <p>One of the world's most scenic coastal drives, the Great Ocean Road offers spectacular ocean views, charming seaside towns, and iconic limestone formations like the Twelve Apostles.</p>
                  
                  <h4>Wine Country</h4>
                  <p>The Yarra Valley and Mornington Peninsula produce some of Australia's finest wines, with over 800 wineries offering cellar door tastings and gourmet dining experiences.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Seasonal Adventures</h3>
                    <p>From summer festivals and beach escapes to winter skiing in the High Country, Victoria truly offers something special in every season.</p>
                  </div>
                </div>
              )}
              
              {article.id === 6 && (
                <div>
                  <h3>Tasmania's Unique Character</h3>
                  <p>Tasmania, affectionately known as "Tassie," offers a distinctive blend of wilderness, culture, and culinary excellence that sets it apart from mainland Australia.</p>
                  
                  <h4>MONA and Cultural Renaissance</h4>
                  <p>The Museum of Old and New Art (MONA) has put Tasmania on the global cultural map, offering provocative contemporary art experiences alongside the annual DARK MOFO festival.</p>
                  
                  <h4>Wilderness and National Parks</h4>
                  <p>Nearly half of Tasmania is protected wilderness, including World Heritage-listed areas like Cradle Mountain-Lake St Clair National Park and the pristine Southwest Wilderness.</p>
                  
                  <h4>Food and Drink Excellence</h4>
                  <p>Tasmania's cool climate produces exceptional wines, whisky, cheese, and seafood, earning recognition as one of Australia's premier food destinations.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Island Escape</h3>
                    <p>Tasmania offers the perfect combination of adventure and relaxation, where you can hike through ancient forests in the morning and enjoy world-class dining in the evening.</p>
                  </div>
                </div>
              )}
              
              {article.id === 7 && (
                <div>
                  <h3>South Australia's Diverse Appeal</h3>
                  <p>South Australia combines world-renowned wine regions, vibrant city culture, and spectacular natural landscapes in one accessible destination.</p>
                  
                  <h4>Adelaide: Festival City</h4>
                  <p>Adelaide's compact city center, surrounded by parklands, hosts some of Australia's most prestigious festivals including the Adelaide Festival and Fringe.</p>
                  
                  <h4>Wine Regions</h4>
                  <p>The Barossa Valley, Clare Valley, and Adelaide Hills produce some of the world's finest wines, particularly renowned for Shiraz and Riesling varieties.</p>
                  
                  <h4>Kangaroo Island</h4>
                  <p>Just off the coast, Kangaroo Island offers incredible wildlife experiences, pristine beaches, and artisanal food producers in a spectacular natural setting.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Adventure Beckons</h3>
                    <p>From the rugged Flinders Ranges to the Murray River, South Australia rewards travelers with diverse landscapes and authentic Australian experiences.</p>
                  </div>
                </div>
              )}
              
              {article.id === 8 && (
                <div>
                  <h3>Western Australia's Scale and Beauty</h3>
                  <p>Western Australia covers one-third of the continent, offering some of the most spectacular and remote landscapes on Earth.</p>
                  
                  <h4>Perth and Southwest</h4>
                  <p>Perth combines urban sophistication with beautiful beaches, while the Southwest offers world-class wineries, forests, and coastal scenery.</p>
                  
                  <h4>The Kimberley</h4>
                  <p>One of the world's last great wilderness areas, the Kimberley features ancient rock formations, spectacular gorges, and indigenous cultural experiences.</p>
                  
                  <h4>Coral Coast</h4>
                  <p>From Shark Bay's dolphins to Ningaloo Reef's whale sharks, the Coral Coast offers unparalleled marine wildlife experiences.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Ultimate Adventure</h3>
                    <p>Western Australia rewards adventurous travelers with experiences found nowhere else on Earth, from desert blooms to ancient geology.</p>
                  </div>
                </div>
              )}
              
              {article.id === 9 && (
                <div>
                  <h3>Northern Territory: Australia's Heartland</h3>
                  <p>The Northern Territory offers profound cultural experiences and some of Australia's most iconic natural landmarks.</p>
                  
                  <h4>Uluru and Kata Tjuta</h4>
                  <p>These sacred Aboriginal sites in the heart of Australia offer spiritual experiences and stunning desert landscapes under endless skies.</p>
                  
                  <h4>Kakadu National Park</h4>
                  <p>A World Heritage site showcasing 40,000 years of Aboriginal culture alongside diverse ecosystems from wetlands to escarpments.</p>
                  
                  <h4>Darwin and the Top End</h4>
                  <p>Australia's tropical north offers unique cultural experiences, access to Arnhem Land, and gateway adventures to Southeast Asia.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Cultural Connection</h3>
                    <p>The Northern Territory provides unparalleled opportunities to connect with Aboriginal culture and Australia's ancient landscapes.</p>
                  </div>
                </div>
              )}
              
              {article.id === 10 && (
                <div>
                  <h3>Queensland: Tropical Paradise</h3>
                  <p>Queensland offers the perfect combination of tropical beaches, vibrant coral reefs, and lush rainforests.</p>
                  
                  <h4>Great Barrier Reef</h4>
                  <p>One of the world's seven natural wonders, the Great Barrier Reef offers unparalleled snorkeling and diving experiences among vibrant coral gardens.</p>
                  
                  <h4>Daintree Rainforest</h4>
                  <p>The world's oldest continuously surviving rainforest ecosystem meets the reef at Cape Tribulation, creating a unique dual World Heritage experience.</p>
                  
                  <h4>Gold Coast and Brisbane</h4>
                  <p>From theme parks and surf beaches to cosmopolitan dining and cultural attractions, Queensland's southeast offers something for everyone.</p>
                  
                  <div className="article-conclusion">
                    <h3 className="article-conclusion-heading">Year-Round Paradise</h3>
                    <p>With its tropical climate and diverse attractions, Queensland truly lives up to its motto: "Beautiful one day, perfect the next."</p>
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-8 mt-8">
                <p className="text-center italic" style={{ color: 'var(--gray-600)' }}>
                  Ready to explore {article.title.includes('VALUE') ? 'the value of professional travel planning' : 'this destination'}? Contact TravLin Travel for expert advice and personalized itineraries.
                </p>
                
                {/* Top Blue Navigation Word - Back to Stories */}
                <div className="text-center mt-6">
                  <button 
                    onClick={handleBackToStories}
                    className="inline-flex items-center font-bold text-lg transition-all hover:scale-110"
                    style={{ color: 'var(--brand-blue)' }}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Stories
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer 
          onContactClick={handleNavigateToContact}
          onNavigateToHome={onNavigateToHome}
          onNavigateToAbout={onNavigateToAbout}
          onNavigateToCruises={onNavigateToCruises}
          onNavigateToTravelOptions={onNavigateToTravelOptions}
          onNavigateToContact={handleNavigateToContact}
          onNavigateToStories={handleNavigateToStories}
        />
      </div>
    )
  }

  // Main Stories Listing Page Layout
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
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('${storiesHeroImage}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
        <div className="relative text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight text-shadow-extra"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            TravLin Stories
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover incredible journeys, insider secrets, and expert travel wisdom that turn dreams into unforgettable adventures. Your next extraordinary escape starts here!
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Featured Story Section - REDUCED HEIGHT */}
          <section className="mb-12">
            <motion.h2 
              className="section-heading text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Featured Story
            </motion.h2>
            
            <motion.div 
              className="content-separator-extended"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-2">
                {/* Featured Article Image */}
                <div className="relative h-80">
                  <SimpleImage 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
                </div>
                
                {/* Featured Article Content */}
                <CardContent className="p-8 flex flex-col justify-between min-h-80">
                  <Badge 
                    style={getCategoryBadgeStyle(featuredArticle.color)}
                    className="self-start mb-4"
                  >
                    {featuredArticle.category}
                  </Badge>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                  
                  {/* Date, Time and Read Link on same row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(featuredArticle.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredArticle.readTime}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleReadArticle(featuredArticle.id)}
                      className="flex items-center font-bold transition-all hover:scale-110"
                      style={{ color: 'var(--brand-blue)' }}
                    >
                      Read
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </section>

          {/* ADDED EXTRA SPACE ABOVE LATEST STORIES */}
          <div className="mb-16"></div>

          {/* Latest Stories Section */}
          <section>
            <motion.h2 
              className="section-heading text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Latest Stories
            </motion.h2>
            
            <motion.div 
              className="content-separator-extended"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {visibleArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <SimpleImage 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    <CardContent className="p-6">
                      <Badge 
                        style={getCategoryBadgeStyle(article.color)}
                        className="mb-3"
                      >
                        {article.category}
                      </Badge>
                      
                      <h3 
                        className="font-bold mb-3 text-gray-800 transition-colors duration-300 line-clamp-2"
                        style={{ 
                          color: 'var(--gray-800)',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (article.id === 2 || article.id === 3 || article.id === 4) {
                            e.currentTarget.style.color = 'var(--brand-blue)';
                          } else {
                            e.currentTarget.style.color = '#2563eb';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--gray-800)';
                        }}
                      >
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      {/* Date, Time and Read Link on same row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(article.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.readTime}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleReadArticle(article.id)}
                          className="flex items-center font-bold text-sm transition-all hover:scale-110"
                          style={{ color: 'var(--brand-blue)' }}
                        >
                          Read
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* View More/Less Buttons */}
            {hiddenArticles.length > 0 && (
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {!showMoreArticles ? (
                  <Button
                    onClick={handleViewMore}
                    className="font-semibold text-white px-8 py-3 transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--brand-orange)' }}
                  >
                    <ChevronDown className="w-5 h-5 mr-2" />
                    MORE
                  </Button>
                ) : (
                  <Button
                    onClick={handleViewLess}
                    className="font-semibold text-white px-8 py-3 transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--brand-orange)' }}
                  >
                    <ChevronUp className="w-5 h-5 mr-2" />
                    LESS
                  </Button>
                )}
              </motion.div>
            )}
          </section>
        </div>
      </main>

      <Footer 
        onContactClick={handleNavigateToContact}
        onNavigateToHome={onNavigateToHome}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToCruises={onNavigateToCruises}
        onNavigateToTravelOptions={onNavigateToTravelOptions}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToStories={handleNavigateToStories}
      />
    </div>
  )
}