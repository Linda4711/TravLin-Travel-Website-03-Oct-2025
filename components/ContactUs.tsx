import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import TravLinButton from './TravLinButton'

interface ContactUsProps {
  onNavigateToCruises?: () => void
  onNavigateToTravelOptions?: () => void
  onNavigateToHome?: () => void
}

export default function ContactUs({ onNavigateToCruises, onNavigateToTravelOptions, onNavigateToHome }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travel_type: '',
    destination: '',
    budget: '',
    travelers: '',
    travel_dates: '',
    message: '',
    honeypot: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Bot validation
    if (formData.honeypot !== '') {
      console.log('Bot detected, form submission blocked')
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.')
      setIsSubmitting(false)
      return
    }

    try {
      const serviceId = 'service_rlnjyuj'
      const templateId = 'template_aiumzob'
      const publicKey = 'GY6ImN3fkI91A6mGw'
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'hello@travlintravel.com.au',
        subject: `Travel Inquiry from ${formData.name}`,
        phone: formData.phone,
        travel_type: formData.travel_type,
        destination: formData.destination,
        budget: formData.budget,
        travelers: formData.travelers,
        travel_dates: formData.travel_dates,
        message: `NEW TRAVEL INQUIRY from ${formData.name}

CONTACT DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

TRAVEL PREFERENCES:
Type of Travel: ${formData.travel_type || 'Not specified'}
Destination: ${formData.destination || 'Open to suggestions'}
Budget: ${formData.budget || 'Not specified'}
Number of Travelers: ${formData.travelers || 'Not specified'}
Travel Dates: ${formData.travel_dates || 'Flexible'}

MESSAGE:
${formData.message || 'No additional message'}

---
Submitted via TravLin Travel Contact Form`,
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone || 'Not provided',
        user_travel_type: formData.travel_type || 'Not specified',
        user_destination: formData.destination || 'Open to suggestions',
        user_budget: formData.budget || 'Not specified',
        user_travelers: formData.travelers || 'Not specified',
        user_travel_dates: formData.travel_dates || 'Flexible',
        user_message: formData.message,
        inquiry_type: 'Travel Planning Inquiry',
        source: 'Contact Us Form',
        timestamp: new Date().toISOString()
      }

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      toast.success('Thank you for your inquiry! We\'ll be in touch within 24 hours to start planning your perfect journey.', {
        description: 'Your travel inquiry has been sent successfully.',
        duration: 6000
      })
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        travel_type: '',
        destination: '',
        budget: '',
        travelers: '',
        travel_dates: '',
        message: '',
        honeypot: ''
      })
      
    } catch (error) {
      console.error('❌ Contact form submission error:', error)
      
      toast.error('There was an issue sending your message. Please try again or contact us directly.', {
        description: 'Contact us directly: hello@travlintravel.com.au or +61 415 355 851',
        duration: 8000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Send Us a Message Header */}
      <div className="flex items-center mb-6">
        <Send className="w-6 h-6 text-blue-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Send Us a Message</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Name and Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Phone and Travel Type Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+61 4XX XXX XXX"
            />
          </div>

          <div>
            <label htmlFor="travel_type" className="block text-sm font-medium text-gray-700 mb-1">
              Travel Type
            </label>
            <select
              id="travel_type"
              name="travel_type"
              value={formData.travel_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select travel type</option>
              <option value="cruise">Cruise</option>
              <option value="tour">Escorted Tour</option>
              <option value="independent">Independent Travel</option>
              <option value="business">Business Travel</option>
              <option value="honeymoon">Honeymoon/Romance</option>
              <option value="family">Family Holiday</option>
              <option value="adventure">Adventure Travel</option>
              <option value="luxury">Luxury Travel</option>
            </select>
          </div>
        </div>

        {/* Budget and Travelers Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
              Approximate Budget (AUD)
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select budget range</option>
              <option value="under-3000">Under $3,000</option>
              <option value="3000-5000">$3,000 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000-20000">$10,000 - $20,000</option>
              <option value="over-20000">Over $20,000</option>
            </select>
          </div>

          <div>
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Travelers
            </label>
            <select
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select number</option>
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3-4">3-4 Travelers</option>
              <option value="5-8">5-8 Travelers</option>
              <option value="9+">9+ Travelers</option>
            </select>
          </div>
        </div>

        {/* Destination and Travel Dates Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              Destination(s) of Interest
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Mediterranean, Alaska"
            />
          </div>

          <div>
            <label htmlFor="travel_dates" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Travel Dates
            </label>
            <input
              type="text"
              id="travel_dates"
              name="travel_dates"
              value={formData.travel_dates}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., March 2025, Flexible"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Tell Us About Your Dream Trip
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="Share your travel dreams, special interests, celebrations, accessibility needs, or any specific requests..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <TravLinButton
          type="submit"
          variant="blue"
          size="lg"
          disabled={isSubmitting}
          className="w-full justify-center"
          style={{ borderRadius: '0px' }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              SEND INQUIRY
            </>
          )}
        </TravLinButton>

        {/* Privacy Text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          TravLin Travel respects your privacy.
        </p>
      </form>
    </>
  )
}