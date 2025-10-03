import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import { 
  MapPin, 
  Camera, 
  Compass, 
  Plane, 
  Mountain, 
  Waves,
  Mail,
  CheckCircle
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export default function DestinationGuideSection() {
  const [email, setEmail] = useState('')
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle subscription form submission
  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    
    if (!agreedToPrivacy) {
      toast.error('Please agree to the privacy policy')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Initialize EmailJS with real credentials
      emailjs.init('GY6ImN3fkI91A6mGw')
      
      // Send destination guide subscription email
      const templateParams = {
        to_name: 'TravLin Travel',
        from_name: 'Destination Guide Subscription',
        user_email: email,
        subject: 'New Destination Guide Subscriber',
        message: `Someone just subscribed to your destination guide newsletter from the TravLin Stories page!`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        to_email: 'hello@travlintravel.com.au'
      }
      
      await emailjs.send(
        'service_rlnjyuj', // DEFAULT EmailJS service ID
        'template_aiumzob', // Template ID
        templateParams
      )
      
      toast.success('Thank you! You\'ll receive our latest destination guides and travel inspiration.')
      setEmail('')
      setAgreedToPrivacy(false)
    } catch (error) {
      console.error('EmailJS Error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const destinations = [
    {
      name: "Maldives Paradise",
      description: "Crystal waters and overwater bungalows",
      icon: Waves,
      color: "var(--brand-blue)"
    },
    {
      name: "Swiss Alps",
      description: "Majestic peaks and charming villages",
      icon: Mountain,
      color: "var(--brand-orange)"
    },
    {
      name: "Japanese Culture",
      description: "Ancient traditions meet modern marvels",
      icon: Compass,
      color: "var(--brand-yellow)"
    },
    {
      name: "Mediterranean Cruise",
      description: "Historic ports and azure coastlines",
      icon: Plane,
      color: "var(--brand-blue)"
    }
  ]

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: 'var(--gray-50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT COLUMN - Destination Guide */}
          <div>
            <div className="text-center lg:text-left mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--brand-orange)' }}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold" style={{ color: 'var(--gray-800)' }}>Destination Guides</h2>
                  <div className="w-32 h-1 rounded-full mt-1" style={{ backgroundColor: 'var(--brand-orange)' }}></div>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Discover hidden gems, local insights, and expert recommendations for your next adventure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {destinations.map((destination, index) => {
                const IconComponent = destination.icon
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: destination.color }}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: destination.color }}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {destination.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {destination.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="text-center lg:text-left">
              <p className="text-gray-600 mb-4">
                <strong>Coming Soon:</strong> In-depth guides with photos, itineraries, and local recommendations.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN - Newsletter Subscription */}
          <div>
            <Card className="border-2" style={{ borderColor: 'var(--brand-blue)', backgroundColor: 'var(--white)' }}>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--brand-blue)' }}>
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--gray-800)' }}>
                    Subscribe to Destination Guides
                  </h3>
                  <p className="text-gray-600">
                    Get expert travel insights, destination highlights, and insider tips delivered to your inbox.
                  </p>
                </div>

                <form onSubmit={handleSubscription} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="destination-privacy"
                      checked={agreedToPrivacy}
                      onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="destination-privacy" className="text-sm text-gray-600 leading-relaxed">
                      I agree to receive travel guides and inspiration emails from TravLin Travel
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !email || !agreedToPrivacy}
                    className="w-full font-semibold text-white"
                    style={{ backgroundColor: 'var(--brand-blue)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Subscribe to Guides
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Weekly travel inspiration • Expert recommendations • Unsubscribe anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}