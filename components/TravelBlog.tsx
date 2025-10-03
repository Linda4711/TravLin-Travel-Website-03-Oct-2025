import React, { useState } from 'react'
import { Calendar, Clock, User, ArrowRight, BookOpen, Mail, Bell, Sparkles, Globe, ChevronDown, ChevronUp, PenTool } from 'lucide-react'

// Simple inline components to avoid any import dependency issues
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className || ''}`}>
    {children}
  </div>
)

const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 ${className || ''}`}>
    {children}
  </div>
)

const Badge = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className || ''}`} style={style}>
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
    className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className || ''}`}
    style={style}
  >
    {children}
  </button>
)

// Simple image component with fallback
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
    title: 'VALUE OF A TRAVEL AGENT - Are Travel Agents Still Relevant?',
    excerpt: 'Discover why travel agents are more valuable than ever! From personalized service and expert knowledge to 24/7 support and exclusive deals, learn how partnering with a professional travel agent transforms your booking experience and ensures unforgettable journeys.',
    image: 'https://images.unsplash.com/photo-1673515336319-20a3ea59c228?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-12-15',
    readTime: '18 min read',
    category: 'Industry Insights',
    featured: true,
    color: 'orange',
    type: 'article'
  },
  {
    id: 2,
    title: 'Aft Cabin vs. Forward: Which Is Right for Your Cruise?',
    excerpt: 'Discover the pros and cons of aft and forward cruise cabins! From spectacular wake views and spacious balconies to seasickness considerations and noise factors. Our cruise experts help you choose the perfect cabin location for your dream cruise experience.',
    image: 'https://images.unsplash.com/photo-1701789223372-dba1efcdbb4d?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-11-22',
    readTime: '3 min read',
    category: 'Cruise Tips',
    color: 'blue',
    type: 'article'
  },
  {
    id: 3,
    title: 'Travellers Choice: NTIA Champions Again! - 4th Consecutive Win!',
    excerpt: 'Celebrating another incredible achievement! Christian Hunter, MD of Travellers Choice, discusses winning Most Outstanding Travel Agency Network for the fourth consecutive year. Discover the secret to their success and why TravLin Travel is proud to be part of this award-winning network.',
    image: 'https://images.unsplash.com/photo-1659100947220-48b5d5738148?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-10-18',
    readTime: '12 min read',
    category: 'Industry News/Awards',
    color: 'blue',
    type: 'article'
  },
  {
    id: 4,
    title: 'Capital Discoveries: Canberra\'s Hidden Treasures & Unforgettable Experiences',
    excerpt: 'Unlock the secrets of Australia\'s vibrant capital! From world-class galleries and stunning architecture to breathtaking natural landscapes and award-winning wineries, discover why Canberra is the ultimate year-round destination that perfectly blends culture, adventure, and culinary excellence.',
    image: 'https://images.unsplash.com/photo-1614288231884-48eb03fcdf45?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-08-15',
    readTime: '12 min read',
    category: 'Destination Guide',
    color: 'blue',
    type: 'article'
  },
  {
    id: 5,
    title: 'Victoria: A State for ALL Seasons - Epic Adventures Await Year-Round!',
    excerpt: 'Discover why Victoria is Australia\'s ultimate playground! From the breathtaking Great Ocean Road to world-class sporting events, award-winning wineries, and Melbourne\'s legendary culture - this compact powerhouse delivers unforgettable experiences in every season.',
    image: 'https://images.unsplash.com/photo-1748048905284-8b11bbcb80c8?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-07-08',
    readTime: '15 min read',
    category: 'Destination Guide',
    color: 'orange',
    type: 'article'
  },
  {
    id: 6,
    title: 'Queensland: Tropical Paradise & Adventure Capital Down Under',
    excerpt: 'From the world-famous Great Barrier Reef to pristine rainforests and golden beaches, Queensland offers the ultimate Australian adventure. Discover why the Sunshine State is every traveler\'s dream destination with year-round perfect weather and endless experiences.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-06-20',
    readTime: '16 min read',
    category: 'Destination Guide',
    color: 'blue',
    type: 'article'
  },
  {
    id: 7,
    title: 'South Australia: Wine, Wildlife & Wonders Await Discovery',
    excerpt: 'Uncover South Australia\'s sophisticated charm! From world-renowned wine regions and pristine wilderness to vibrant festivals and unique wildlife encounters, discover why SA is Australia\'s best-kept secret for discerning travelers seeking authentic experiences.',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-05-15',
    readTime: '14 min read',
    category: 'Destination Guide',
    color: 'orange',
    type: 'article'
  },
  {
    id: 8,
    title: 'Wild Wide West: Western Australia\'s Untamed Beauty & Hidden Gems',
    excerpt: 'Journey to Australia\'s largest state where vast landscapes meet pristine coastlines! From Perth\'s vibrant culture to the pink lakes of Hutt Lagoon and the ancient wonders of the Pilbara, Western Australia offers epic adventures for intrepid travelers.',
    image: 'https://images.unsplash.com/photo-1421757295538-9c80958e75b0?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-04-10',
    readTime: '17 min read',
    category: 'Destination Guide',
    color: 'blue',
    type: 'article'
  },
  {
    id: 9,
    title: 'The Apple Isle: Tasmania\'s Pure Wilderness & Cultural Renaissance',
    excerpt: 'Discover Tasmania\'s remarkable transformation into Australia\'s cultural and culinary hotspot! From pristine wilderness and unique wildlife to world-class art galleries and gourmet experiences, Tassie offers extraordinary adventures in a compact island paradise.',
    image: 'https://images.unsplash.com/photo-1572846090002-d09f7e017fca?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-03-25',
    readTime: '13 min read',
    category: 'Destination Guide',
    color: 'orange',
    type: 'article'
  },
  {
    id: 10,
    title: 'NT and Red Centre: Heart of Australia\'s Ancient Landscapes',
    excerpt: 'Journey to the spiritual heart of Australia! From the iconic Uluru and Kings Canyon to the vibrant culture of Darwin and spectacular Kakadu National Park, the Northern Territory offers profound connections to ancient landscapes and Aboriginal culture.',
    image: 'https://images.unsplash.com/photo-1552832478-28e2e3490c63?w=400&h=300&fit=crop',
    author: 'Linda Forster - TravLin Travel',
    date: '2024-02-18',
    readTime: '15 min read',
    category: 'Destination Guide',
    color: 'blue',
    type: 'article'
  }
]

export default function TravelBlog() {
  const [showAllPosts, setShowAllPosts] = useState(false)
  const [destinationQuery, setDestinationQuery] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [emailQuery, setEmailQuery] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)
  const visiblePosts = showAllPosts ? regularPosts : regularPosts.slice(0, 3)

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { accent: '#0075CC', tag: 'bg-blue-500' }
      case 'orange':
        return { accent: '#ED7D31', tag: 'bg-orange-500' }
      default:
        return { accent: '#0075CC', tag: 'bg-blue-500' }
    }
  }

  const handleGenerateGuide = () => {
    if (!destinationQuery.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      alert('Thank you for your interest! Please contact us directly at hello@travlintravel.com.au for your custom destination guide.')
      setDestinationQuery('')
      setIsGenerating(false)
    }, 1000)
  }

  const handleSubscribe = () => {
    if (!emailQuery.trim()) return
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailQuery)) {
      alert('Please enter a valid email address.')
      return
    }
    setIsSubscribing(true)
    setTimeout(() => {
      alert('Thank you for subscribing! Please contact us at hello@travlintravel.com.au to be added to our newsletter.')
      setEmailQuery('')
      setIsSubscribing(false)
    }, 1000)
  }

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-20">
            <Card className="overflow-hidden max-w-6xl mx-auto shadow-lg">
              <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <SimpleImage
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <Badge 
                        className="text-white px-3 py-1"
                        style={{ backgroundColor: getColorClasses(featuredPost.color).accent }}
                      >
                        {featuredPost.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredPost.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Our Blog</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((post) => {
              const colors = getColorClasses(post.color)
              return (
                <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `linear-gradient(135deg, ${post.color === 'orange' ? 'rgba(237, 125, 49, 0.3)' : 'rgba(0, 117, 204, 0.3)'} 0%, ${post.color === 'orange' ? 'rgba(255, 192, 0, 0.2)' : 'rgba(106, 90, 205, 0.3)'} 100%)`
                      }}
                    ></div>
                    <div className="relative z-10">
                      <div className="relative h-48">
                        <SimpleImage
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge 
                            className="text-white text-xs px-2 py-1"
                            style={{ backgroundColor: colors.accent }}
                          >
                            {post.category}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>Article</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="bg-white">
                        <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                        
                        <h3 className="font-bold text-gray-800 mb-3 text-lg leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <User className="w-3 h-3" />
                            <span>TravLin Travel</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm font-medium cursor-pointer hover:opacity-75 transition-opacity" style={{ color: colors.accent }}>
                            <span>Read more</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
          
          {regularPosts.length > 3 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowAllPosts(!showAllPosts)}
                className="px-8 py-3 text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#ED7D31' }}
              >
                <div className="flex items-center gap-2">
                  <span>{showAllPosts ? 'Show Less Stories' : 'VIEW MORE'}</span>
                  {showAllPosts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </Button>
            </div>
          )}
        </div>

        {/* Action Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Custom Destination Guide */}
          <Card className="shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg"></div>
            <CardContent className="relative z-10">
              <div className="text-center mb-6">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: '#ED7D31' }}
                >
                  <PenTool className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Custom Travel Guide</h3>
                <p className="text-gray-600">
                  Can't find what you're looking for? Let us create a personalized guide just for you!
                </p>
              </div>

              <div className="space-y-4">
                {/* Invisible honeypot for bot protection */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    pointerEvents: 'none',
                    height: 0,
                    width: 0
                  }}
                  aria-hidden="true"
                />
                
                <input
                  type="text"
                  placeholder="Enter your dream destination..."
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerateGuide()}
                />
                
                <Button
                  onClick={handleGenerateGuide}
                  disabled={!destinationQuery.trim() || isGenerating}
                  className="w-full py-3 text-white"
                  style={{ backgroundColor: '#ED7D31' }}
                >
                  {isGenerating ? (
                    <span>Creating Guide...</span>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>GET YOUR GUIDE</span>
                    </div>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>Expert Research</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>24hr Delivery</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Subscription */}
          <Card className="shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"></div>
            <CardContent className="relative z-10">
              <div className="text-center mb-6">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: '#0075CC' }}
                >
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Stay Updated</h3>
                <p className="text-gray-600">
                  Subscribe to get the latest travel insights, destination guides, and offers delivered to your inbox.
                </p>
              </div>

              <div className="space-y-4">
                {/* Invisible honeypot for bot protection */}
                <input
                  type="email"
                  name="email_confirm"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    pointerEvents: 'none',
                    height: 0,
                    width: 0
                  }}
                  aria-hidden="true"
                />
                
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={emailQuery}
                  onChange={(e) => setEmailQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                />
                
                <Button
                  onClick={handleSubscribe}
                  disabled={!emailQuery.trim() || isSubscribing}
                  className="w-full py-3 text-white"
                  style={{ backgroundColor: '#0075CC' }}
                >
                  {isSubscribing ? (
                    <span>Subscribing...</span>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Subscribe Now</span>
                    </div>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>Fortnightly Updates</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Offers</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}