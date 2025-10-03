import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Send, Bot, User, Sparkles, MapPin, Calendar, Users, DollarSign, Plane, Ship, Star, ArrowRight, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import TravLinButton from './TravLinButton'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: Date
  suggestions?: string[]
  isTyping?: boolean
}

interface UserPreferences {
  budget?: string
  travelers?: string
  duration?: string
  travelStyle?: string
  interests?: string[]
  destinations?: string[]
  travelType?: string
  flexibility?: string
  experience?: string
  season?: string
}

interface IntelligentTravelPlannerProps {
  onNavigateToContact?: () => void
  onClose?: () => void
}

export default function IntelligentTravelPlanner({ onNavigateToContact, onClose }: IntelligentTravelPlannerProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({})
  const [conversationStage, setConversationStage] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Intelligent conversation flow stages
  const conversationStages = [
    'greeting',
    'travel_type',
    'budget_range', 
    'travelers_count',
    'duration',
    'travel_style',
    'interests',
    'destinations',
    'flexibility',
    'season',
    'recommendations',
    'qualification'
  ]

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize conversation
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(
        "G'day! I'm your AI Travel Options Consultant, specializing in flights, hotels, tours, and land-based adventures! ✈️\n\n*Please note: I provide general travel guidance and estimates. For cruises, you'll be connected with our CLIA Master specialists. All pricing is indicative - final quotes come from our human consultants.*\n\nWhat type of travel adventure interests you most?",
        ['European Tours', 'Asian Adventures', 'USA & Canada', 'City Breaks', 'Adventure Travel', 'Not Sure Yet']
      )
    }
  }, [])

  const addBotMessage = (content: string, suggestions?: string[]) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      suggestions,
      isTyping: true
    }
    
    setMessages(prev => [...prev, message])
    
    // Simulate typing effect
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, isTyping: false } : msg
      ))
    }, 1000)
  }

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  // Intelligent response system based on user input and conversation stage
  const generateIntelligentResponse = (userInput: string, stage: number): { response: string, suggestions?: string[], preferences?: Partial<UserPreferences> } => {
    const input = userInput.toLowerCase()
    let response = ''
    let suggestions: string[] = []
    let preferences: Partial<UserPreferences> = {}

    switch (conversationStages[stage]) {
      case 'greeting':
        if (input.includes('cruise')) {
          preferences.travelType = 'cruise-redirect'
          response = "I'd love to help! While I specialize in flights, hotels, and land-based travel, cruises are handled by our dedicated CLIA Master specialists. 🚢\n\nCan I get your contact details so our cruise expert can reach out to you directly with personalized recommendations? Or would you like to explore some land-based alternatives?"
          suggestions = ['Get Cruise Specialist Contact', 'European Land Tours', 'Coastal Resort Holidays', 'River Cruises & Tours']
        } else if (input.includes('european') || input.includes('europe')) {
          preferences.travelType = 'europe'
          response = "Fantastic choice! Europe offers incredible history, culture, and cuisine with excellent flight connections! 🏰\n\nWhat budget range are you considering for your European adventure?"
          suggestions = ['Budget Explorer ($2,000-4,000)', 'Comfortable Travel ($4,000-7,000)', 'Luxury Experience ($7,000+)', 'Need Guidance']
        } else if (input.includes('asia') || input.includes('asian')) {
          preferences.travelType = 'asia'
          response = "Amazing! Asian adventures offer incredible diversity - from bustling cities to serene temples and stunning landscapes! 🏯\n\nWhat's your ideal budget range for this journey?"
          suggestions = ['Value Adventure ($2,500-5,000)', 'Premium Experience ($5,000-9,000)', 'Luxury Journey ($9,000+)', 'Flexible Budget']
        } else if (input.includes('usa') || input.includes('canada') || input.includes('america')) {
          preferences.travelType = 'north-america'
          response = "Excellent! North America has incredible diversity - from vibrant cities to stunning national parks! 🗽\n\nWhat budget range works for your North American adventure?"
          suggestions = ['Budget-Friendly ($3,000-5,000)', 'Mid-Range ($5,000-8,000)', 'Premium ($8,000+)', 'Tell Me More']
        } else if (input.includes('city') || input.includes('break')) {
          preferences.travelType = 'city-break'
          response = "Perfect! City breaks are fantastic for culture, dining, and urban experiences. Quick getaways with maximum impact! 🏙️\n\nWhat's your budget range for this city escape?"
          suggestions = ['Short Break ($1,500-3,000)', 'Extended Stay ($3,000-5,000)', 'Luxury City Break ($5,000+)', 'Multiple Cities']
        } else if (input.includes('adventure')) {
          preferences.travelType = 'adventure'
          response = "Thrilling choice! Adventure travel combines excitement with incredible natural beauty and unique experiences! 🏔️\n\nWhat budget range suits your adventure spirit?"
          suggestions = ['Active Budget ($2,500-5,000)', 'Premium Adventure ($5,000-9,000)', 'Luxury Expedition ($9,000+)', 'Custom Adventure']
        } else if (input.includes('get cruise') || input.includes('cruise specialist') || input.includes('contact cruise')) {
          preferences.travelType = 'cruise-contact-capture'
          response = "Absolutely! Our CLIA Master cruise specialists will provide personalized cruise recommendations. 🚢\n\nTo connect you with the right expert, may I get your details?"
          suggestions = ['Provide Contact Details', 'Call Me Today', 'Email Me Information', 'WhatsApp Contact']
        } else {
          response = "No worries! Let's explore what type of land-based travel experience would be perfect for you. 💫\n\nWhat draws you most to travel?"
          suggestions = ['Cultural Experiences', 'Natural Beauty', 'Adventure & Activities', 'Relaxation & Luxury', 'Food & Wine']
        }
        break

      case 'budget_range':
        // Generate mock flight quote based on travel type and budget
        const generateFlightEstimate = (travelType: string, budgetType: string) => {
          const destinations = {
            'europe': { name: 'Europe', basePrice: 1200, cities: 'London, Paris, Rome' },
            'asia': { name: 'Asia', basePrice: 1000, cities: 'Tokyo, Bangkok, Singapore' },
            'north-america': { name: 'North America', basePrice: 800, cities: 'New York, Vancouver, Los Angeles' },
            'city-break': { name: 'International Cities', basePrice: 600, cities: 'Various destinations' },
            'adventure': { name: 'Adventure Destinations', basePrice: 1100, cities: 'Nepal, Peru, New Zealand' }
          }
          
          const dest = destinations[travelType] || { name: 'International', basePrice: 1000, cities: 'Popular destinations' }
          const multiplier = budgetType === 'budget' ? 0.8 : budgetType === 'luxury' ? 1.4 : 1.1
          const estimatedPrice = Math.round(dest.basePrice * multiplier)
          const returnPrice = Math.round(estimatedPrice * 1.8) // Return flights
          
          return `\n\n✈️ **Flight Price Estimates**: ${dest.cities}\n• One-way from ${estimatedPrice}\n• Return flights from ${returnPrice}\n*(Prices based on current market rates, final prices may vary)*`
        }

        if (input.includes('budget') || input.includes('2000') || input.includes('1500')) {
          preferences.budget = 'budget'
          const flightInfo = preferences.travelType !== 'cruise-redirect' ? generateFlightEstimate(preferences.travelType, 'budget') : ''
          response = `Perfect! There are so many incredible value experiences available. Smart travelers often get the best adventures! 💰${flightInfo}\n\nHow many travelers will be joining this adventure?`
        } else if (input.includes('mid') || input.includes('comfortable') || input.includes('4000') || input.includes('3000')) {
          preferences.budget = 'mid-range'
          const flightInfo = preferences.travelType !== 'cruise-redirect' ? generateFlightEstimate(preferences.travelType, 'mid-range') : ''
          response = `Excellent choice! This range opens up wonderful possibilities for comfort and experiences. 🌟${flightInfo}\n\nHow many people will be traveling together?`
        } else if (input.includes('luxury') || input.includes('premium') || input.includes('8000') || input.includes('6000')) {
          preferences.budget = 'luxury'
          const flightInfo = preferences.travelType !== 'cruise-redirect' ? generateFlightEstimate(preferences.travelType, 'luxury') : ''
          response = `Magnificent! You deserve the finest experiences. Luxury travel creates memories that last forever. ✨${flightInfo}\n\nHow many travelers for this premium experience?`
        } else {
          response = "I'd love to help you find the perfect value for your dream trip! 🎯\n\nEvery budget can create magical experiences. How many travelers?"
        }
        suggestions = ['Just Me (Solo)', 'Couple (2 People)', 'Small Group (3-6)', 'Large Group (7+)']
        break

      case 'travelers_count':
        if (input.includes('solo') || input.includes('just me') || input.includes('1')) {
          preferences.travelers = 'solo'
          response = "Solo travel is so empowering! You'll have complete freedom to explore at your own pace. 🌍\n\nHow long are you thinking for this personal adventure?"
        } else if (input.includes('couple') || input.includes('2')) {
          preferences.travelers = 'couple'
          response = "How romantic! Couples' travel creates such beautiful shared memories. 💕\n\nWhat duration feels right for your getaway together?"
        } else if (input.includes('small') || input.includes('family') || input.match(/[3-6]/)) {
          preferences.travelers = 'small_group'
          response = "Perfect group size! Small groups have the best flexibility and can still enjoy intimate experiences. 👨‍👩‍👧‍👦\n\nHow much time can your group dedicate to this adventure?"
        } else {
          preferences.travelers = 'large_group'
          response = "What a celebration that will be! Large groups create such energy and unforgettable shared experiences. 🎉\n\nHow long can everyone get away together?"
        }
        suggestions = ['Long Weekend (3-4 Days)', 'One Week (7-10 Days)', 'Extended (2-3 Weeks)', 'Month+ Adventure']
        break

      case 'duration':
        if (input.includes('weekend') || input.includes('3') || input.includes('4')) {
          preferences.duration = 'short'
          response = "Perfect for a refreshing escape! Short trips can be incredibly rejuvenating and action-packed. ⚡\n\nWhat travel style appeals to you most?"
        } else if (input.includes('week') || input.includes('7') || input.includes('10')) {
          preferences.duration = 'week'
          response = "Ideal timing! A week gives you the perfect balance of exploration and relaxation. 🏖️\n\nWhat kind of travel experience excites you?"
        } else if (input.includes('extended') || input.includes('2') || input.includes('3')) {
          preferences.duration = 'extended'
          response = "How wonderful! Extended travel lets you really immerse yourself and discover hidden gems. 🔍\n\nWhat travel style matches your personality?"
        } else {
          preferences.duration = 'long'
          response = "Ultimate adventure! Long-term travel is life-changing - you'll come back transformed. 🦋\n\nWhat style of long-term travel calls to you?"
        }
        suggestions = ['Relaxed & Leisurely', 'Active & Adventurous', 'Cultural Immersion', 'Luxury & Comfort']
        break

      case 'travel_style':
        if (input.includes('relaxed') || input.includes('leisure')) {
          preferences.travelStyle = 'relaxed'
          response = "Absolutely! Taking time to truly unwind and savor each moment is so important. 🧘‍♀️\n\nWhat activities or experiences interest you most?"
          suggestions = ['Spa & Wellness', 'Scenic Beauty', 'Fine Dining', 'Cultural Sites', 'Local Markets']
        } else if (input.includes('active') || input.includes('adventure')) {
          preferences.travelStyle = 'active'
          response = "Fantastic! Active adventures create the most incredible stories and push you beyond your comfort zone. 🏔️\n\nWhat gets your adrenaline pumping?"
          suggestions = ['Hiking & Nature', 'Water Sports', 'Cultural Expeditions', 'Photography Tours', 'Local Experiences']
        } else if (input.includes('cultural')) {
          preferences.travelStyle = 'cultural'
          response = "Beautiful choice! Cultural immersion creates such deep connections and understanding. 🏛️\n\nWhat aspects of culture fascinate you most?"
          suggestions = ['History & Heritage', 'Art & Museums', 'Local Cuisine', 'Traditional Crafts', 'Festivals & Events']
        } else {
          preferences.travelStyle = 'luxury'
          response = "Exquisite taste! Luxury travel is about creating perfect moments and exceptional service. 💎\n\nWhat luxury experiences appeal to you?"
          suggestions = ['5-Star Accommodations', 'Gourmet Experiences', 'Private Tours', 'Spa & Wellness', 'Exclusive Access']
        }
        break

      case 'interests':
        // Collect interests and move to destinations
        const interests = input.split(/[,\s]+/).filter(word => word.length > 2)
        preferences.interests = interests
        response = "Wonderful choices! Your interests help me understand exactly what will make your trip unforgettable. 🎯\n\nAny dream destinations on your bucket list?"
        suggestions = ['Europe & Mediterranean', 'Asia & Pacific', 'Americas & Caribbean', 'Africa & Middle East', 'Surprise Me!']
        break

      case 'destinations':
        preferences.destinations = input.split(/[,\s]+/).filter(word => word.length > 2)
        response = "Exciting destinations! Each place you've mentioned has such unique magic to offer. ✨\n\nHow flexible are your travel dates?"
        suggestions = ['Very Flexible', 'Somewhat Flexible', 'Specific Dates Only', 'Seasonal Preferences']
        break

      case 'flexibility':
        preferences.flexibility = input.includes('very') ? 'high' : input.includes('somewhat') ? 'medium' : 'low'
        response = "Perfect! Flexibility often leads to better deals and unexpected discoveries. 🌟\n\nAny preferred travel season?"
        suggestions = ['Spring Adventure', 'Summer Escape', 'Autumn Colors', 'Winter Wonderland', 'No Preference']
        break

      case 'season':
        preferences.season = input
        response = generatePersonalizedRecommendations(userPreferences, preferences)
        suggestions = ['Tell Me More', 'Get Custom Quote', 'Speak to Expert', 'Explore Options']
        break

      case 'recommendations':
        response = "I'm so excited about these possibilities for you! Based on everything you've shared, I can already envision some incredible experiences. 🌟\n\nWould you like me to connect you with one of our expert travel consultants who can provide personalized quotes and exclusive deals?"
        suggestions = ['Yes, Connect Me!', 'Email Me Details', 'Call Me Instead', 'More Questions First']
        break

      default:
        response = "I'd love to help you explore that further! Let me connect you with one of our expert consultants who can provide detailed information."
        suggestions = ['Connect Me Now', 'Email Information', 'Browse More Options']
    }

    return { response, suggestions, preferences }
  }

  const generatePersonalizedRecommendations = (current: UserPreferences, new_prefs: Partial<UserPreferences>): string => {
    const combined = { ...current, ...new_prefs }
    let recommendations = "Based on everything you've shared, here are some incredible land-based travel possibilities I'm excited about for you:\n\n"

    if (combined.travelType === 'europe') {
      if (combined.budget === 'luxury') {
        recommendations += "✈️ **Luxury European Experience**: First-class flights, 5-star hotels, private guided tours, and exclusive cultural experiences\n\n"
      } else if (combined.budget === 'mid-range') {
        recommendations += "✈️ **Premium European Adventure**: Business-class flights, boutique hotels, small group tours with cultural immersion\n\n"
      } else {
        recommendations += "✈️ **European Discovery**: Smart flight deals, comfortable 3-4 star hotels, guided group tours with authentic experiences\n\n"
      }
    }

    if (combined.travelType === 'asia') {
      if (combined.budget === 'luxury') {
        recommendations += "🏯 **Luxury Asian Journey**: Premium flights, luxury resorts, private cultural tours, and exclusive dining experiences\n\n"
      } else {
        recommendations += "🏯 **Asian Adventure**: Great-value flights, comfortable hotels, guided tours covering temples, markets, and local culture\n\n"
      }
    }

    if (combined.travelType === 'cruise-redirect') {
      recommendations += "🚢 **Cruise Specialist Referral**: I'll connect you with our CLIA Master certified cruise consultants for expert cruise advice\n\n"
    }

    if (combined.travelStyle === 'cultural') {
      recommendations += "🏛️ **Cultural Immersion**: Private guided tours, cooking classes, museum visits, and local artisan workshops\n\n"
    }

    if (combined.travelers === 'couple') {
      recommendations += "💕 **Romantic Experiences**: Couples' spa treatments, fine dining reservations, sunset tours, and romantic accommodations\n\n"
    }

    recommendations += "The best part? As experienced travel specialists, we have access to exclusive flight deals, hotel upgrades, and unique tour experiences you won't find online! 🌟"

    return recommendations
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userInput = input.trim()
    addUserMessage(userInput)
    setInput('')
    setIsLoading(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const stage = Math.min(conversationStage, conversationStages.length - 1)
      const { response, suggestions, preferences } = generateIntelligentResponse(userInput, stage)
      
      if (preferences) {
        setUserPreferences(prev => ({ ...prev, ...preferences }))
      }
      
      addBotMessage(response, suggestions)
      setConversationStage(prev => Math.min(prev + 1, conversationStages.length - 1))
      setIsLoading(false)

      // Show contact form after qualification stage
      if (stage >= conversationStages.length - 2) {
        setTimeout(() => {
          if (userInput.toLowerCase().includes('connect') || userInput.toLowerCase().includes('yes')) {
            setShowContactForm(true)
          }
        }, 2000)
      }
    }, 1500 + Math.random() * 1000) // Variable delay for natural feel
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    handleSend()
  }

  const handleContactFormSubmit = () => {
    const isForCruise = userPreferences.travelType === 'cruise-redirect' || userPreferences.travelType === 'cruise-contact-capture'
    
    if (isForCruise) {
      toast.success("Perfect! Your details have been forwarded to our CLIA Master cruise specialists who will contact you within 24 hours with personalized cruise recommendations!")
    } else {
      toast.success("Perfect! Your AI-qualified travel preferences have been noted. Our expert travel consultant will contact you within 24 hours with personalized flight, hotel & tour recommendations plus exclusive deals!")
    }
    
    if (onNavigateToContact) {
      onNavigateToContact()
    }
    if (onClose) {
      onClose()
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-14 w-14 rounded-full animate-pulse text-white shadow-lg"
          style={{ 
            backgroundColor: 'var(--brand-orange)',
            boxShadow: '0 8px 20px rgba(237, 125, 49, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b text-white rounded-t-lg" style={{backgroundColor: 'var(--brand-blue)'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1)'
              }}>
                <Sparkles className="w-5 h-5 animate-soft-flash" />
              </div>
              <div>
                <h2 className="font-bold text-lg">AI Travel Options Consultant</h2>
                <p className="text-sm opacity-90">Specialized in Land-Based Travel Experiences</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-white/20"
              >
                _
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" style={{
                  backgroundColor: 'var(--brand-orange)',
                  boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[75%] ${message.type === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`rounded-lg p-3 shadow-sm ${
                    message.type === 'user'
                      ? 'text-white border'
                      : 'bg-white border'
                  }`}
                  style={message.type === 'user' ? {backgroundColor: 'var(--brand-blue)'} : {}}
                >
                  {message.isTyping ? (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  )}
                </div>
                
                {message.suggestions && !message.isTyping && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs hover:bg-gray-50 border shadow-sm"
                        style={{borderColor: 'var(--brand-blue)', color: 'var(--brand-blue)'}}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" style={{
                  backgroundColor: 'var(--brand-blue)',
                  boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                }}>
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white shadow-sm border rounded-lg p-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Contact Form Section */}
        {showContactForm && (
          <div className="p-4 border-t bg-white shadow-sm" style={{
            backgroundColor: '#f8fffe',
            borderColor: 'var(--brand-blue)'
          }}>
            <div className="text-center">
              <h3 className="font-bold mb-2" style={{color: 'var(--brand-blue)'}}>🎉 Perfect Travel Match Found!</h3>
              <p className="text-sm text-gray-700 mb-3">
                Based on our conversation, I've identified amazing land-based travel options for you!
              </p>
              <TravLinButton
                onClick={handleContactFormSubmit}
                variant="orange"
                size="sm"
                className="w-full shadow-sm"
                style={{
                  backgroundColor: 'var(--brand-orange)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                Connect Me with Travel Options Expert
              </TravLinButton>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message or use the suggestions above..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="text-white shadow-sm"
              style={{ 
                backgroundColor: 'var(--brand-orange)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI-powered by TravLin Travel Options Specialist • Your preferences are secure
          </p>
        </div>
      </Card>
    </div>
  )
}