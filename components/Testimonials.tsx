import React, { useState, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Quote, Star, ChevronLeft, ChevronRight, Camera, Heart, Plane, ExternalLink, ThumbsUp, Shield, Ship, Users } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import SectionDivider from './SectionDivider'

const testimonials = [
  {
    id: 1,
    name: 'Darren W.',
    trip: 'Group Cruise Experience',
    rating: 5,
    text: 'We have just used Linda from TravLin Travel to organise a cruise with a group of friends. From the first consultation to the final arrangements, Linda was all over everything. She was exceptionally responsive to any queries and we will be utilising her services on our next adventure. You don\'t get this type of service often, but when you do, you need to tell everyone. So if you are are in the need for a Travel Agent look no further than Linda.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1710263937631-a3a24c8811bf?w=600&h=400&fit=crop&q=80',
    tripType: 'Group Cruise'
  },
  {
    id: 2,
    name: 'Sally O.',
    trip: 'Koh Samui Adventure',
    rating: 5,
    text: 'Linda organised our flights to Koh Samui, we were happy with her service & knowledge on traveling to Thailand & the flight connections getting there. It was our first time traveling to Thailand and we were grateful for her advice & great customer service.',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1682502922918-fed575428e3c?w=600&h=400&fit=crop&q=80',
    tripType: 'Thailand Adventure'
  },
  {
    id: 3,
    name: 'Jodie F.',
    trip: 'First European Cruise',
    rating: 5,
    text: 'Having already booked our first trip to Europe directly with a cruise line, I remained nervous as we were visiting 8 different countries and aren\'t seasoned travellers. I was so relieved to find Linda through an online search and she was happy to take over as our agent. She gave us every confidence as she checked and double checked flights, transfers and accommodation. She was familiar with the cruise line we\'d chosen and was able to liaise with them to ensure everything was in order. Linda was professional, kind, friendly, easy to talk to, quick to respond and went above our expectations! We have had no hesitation in recommending her to family and friends already and are looking forward to making more travel arrangements with her!',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1754927322665-bd87d960eedf?w=600&h=400&fit=crop&q=80',
    tripType: 'European Cruise'
  },
  {
    id: 4,
    name: 'Judi L.',
    trip: 'Travel Expertise',
    rating: 5,
    text: 'I have always used Linda for my travel needs. She is the best in the business.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1575110445943-15b543686b56?w=600&h=400&fit=crop&q=80',
    tripType: 'Travel Planning'
  },
  {
    id: 5,
    name: 'Linda V.',
    trip: 'Holiday Planning',
    rating: 5,
    text: 'Would highly recommend TravLin when booking your next holiday. Linda goes above and beyond when arranging everything from flights, accommodation and suggestions on what to do at each destination. We had another great holiday arranged by TravLin.',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1755507039384-e92e3bb18c37?w=600&h=400&fit=crop&q=80',
    tripType: 'Holiday Experience'
  },
  {
    id: 6,
    name: 'Lorna W.',
    trip: 'Dream Holiday Planning',
    rating: 5,
    text: 'Linda goes above and beyond to help you plan your dream holiday and get the best deals on flights and accommodation. And if anything goes wrong while you\'re away, she\'ll do whatever it takes to get it sorted, even staying up till 2am to track lost luggage in France! I can\'t recommend Linda highly enough and wouldn\'t consider booking an overseas holiday with anyone else.',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1691513581989-8833515ce417?w=600&h=400&fit=crop&q=80',
    tripType: 'Overseas Holiday'
  },
  {
    id: 7,
    name: 'John M.',
    trip: 'Port Douglas Experience',
    rating: 5,
    text: 'Recently Linda organised a trip for my partner and myself to Port Douglas. Her knowledge and great customer service was impeccable. Every detail was highlighted for all aspects of the trip from tours, airfares and hotel. Any queries were answered promptly. If you\'re going to book a trip I\'d look no further than TravLin Travel with Linda.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1662306027628-232e396f2aa4?w=600&h=400&fit=crop&q=80',
    tripType: 'Australian Getaway'
  },
  {
    id: 8,
    name: 'Matthew W.',
    trip: 'Multiple Holidays',
    rating: 5,
    text: 'My partner and I have booked 3 holidays with Linda now, including a large group holiday, and she has provided an amazing service for years now. Linda goes above and beyond with providing great information and options to book the best holiday, and always gets back to you promptly. I would recommend anyone booking a holiday to go through Linda!',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1685711907206-0e57ac67d14f?w=600&h=400&fit=crop&q=80',
    tripType: 'Multiple Experiences'
  },
  {
    id: 9,
    name: 'Sophia I.',
    trip: 'Travel Services',
    rating: 5,
    text: 'Highly recommend Travlin Travel for your travel services needs, she is great with finding the right flights and any activities/tours needed. Always so prompt with her emails and answering any enquiries.',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1621944668940-944e4da16ded?w=600&h=400&fit=crop&q=80',
    tripType: 'Travel Services'
  },
  {
    id: 10,
    name: 'Sharon P.',
    trip: 'First Cruise Experience',
    rating: 5,
    text: 'This was my first ever cruise and it was amazing. The cleanliness of the ship was excellent, food unbelievable. I was super excited to be onboard with friends and family all new to VV. It far exceeded my expectations. TravLin Travel did an outstanding job. She was friendly, helpful and handled every query and question with ease both prior to our trip, and whilst onboard. Nothing was too much trouble and it was a relief to not have to deal with anything at all. Thanks Linda for an effortless travel experience.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1671463343444-86d0f7d6eb3a?w=600&h=400&fit=crop&q=80',
    tripType: 'Virgin Voyages Cruise'
  },
  {
    id: 11,
    name: 'CCA 26',
    trip: 'Travel Adventures',
    rating: 5,
    text: 'TravLin is amazing! No trip is too big or too small. Offering fantastic customer service and outstanding knowledge of things travel. Their passion for travel and exceptional attention to detail makes TraveLin the perfect travel agent to help plan your next adventure. All you need is the idea of where you want to go, TravLin will do the rest!',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1658412938736-84b7134375d5?w=600&h=400&fit=crop&q=80',
    tripType: 'Adventure Planning'
  },
  {
    id: 12,
    name: 'Katrina W.',
    trip: 'Travelling Adventures',
    rating: 5,
    text: 'TravLin Travel are always happy to give advice and provide support when asked. I will always go to this trusted Travel Agent for all my travelling adventures.',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1739883138268-7405d964514d?w=600&h=400&fit=crop&q=80',
    tripType: 'Trusted Service'
  },
  {
    id: 13,
    name: 'Anonymous',
    trip: 'Holiday Experience',
    rating: 5,
    text: 'Thank you so much! Made the whole holiday experience amazing and handled everything.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1739641394231-552b51490e32?w=600&h=400&fit=crop&q=80',
    tripType: 'Holiday Planning'
  },
  {
    id: 14,
    name: 'Chris O.',
    trip: 'Comprehensive Travel Services',
    rating: 5,
    text: 'As I am not very good with all the things needed to do in order to book and actually get on the ship. Linda did everything for me . She also booked for me to go to England last year and a holiday booked for my cousin and my husband to go to New Zealand later in the year. She knows her job and does it professionally. I think she is awesome.',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1698350880236-b1fb1bc1f9b2?w=600&h=400&fit=crop&q=80',
    tripType: 'Multiple Experiences'
  },
  {
    id: 15,
    name: 'Nicole D.',
    trip: 'Three Years of Expert Travel Planning',
    rating: 5,
    text: 'We have been travelling with Linda\'s help for about three years now. She has helped us navigate visas, costs, flights, hotels & various countries with suggestions & research & lots of patience. Some of the holidays she has helped us put together were a six week trip to Europe including two cruises, a trip to Singapore over NYE & a ten day cruise to Vietnam, our recent Aussie cruise with 18 family members & an upcoming Western Australia trip including multiple tours around Perth & Broome. I would highly recommend Linda for all your travel needs. Her assistance with planning our trips has been invaluable. We could not have arranged these trips without her extensive knowledge, expertise & contacts. I am confident she will provide you with the same excellent service she has provided us.',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1649260931642-6eed81b87b64?w=600&h=400&fit=crop&q=80',
    tripType: 'Multiple Experiences'
  },
  {
    id: 16,
    name: 'Christine & Michael C.',
    trip: 'Complex Spain & Morocco Adventure',
    rating: 5,
    text: 'Linda is without doubt the best travel agent we have ever used! Linda made the planning, booking & confirmation of arrangements for a trip to Spain & Morocco, with multiple tour operators and bus, train & ship transfers so easy that our detailed itinerary went-off without a hitch. Linda\'s communication and responsiveness to our inquiries and changes were first-class, usually coming back to us on the same day, even weekends, that we inquired. During a subsequent trip to Cambodia, we had been fully briefed by Linda on the new E-Arrival arrangements that Cambodia had introduced and we had the app loaded on our phones and ready to submit, whilst many in our tour group weren\'t even aware of the requirement. We couldn\'t recommend Linda & TravLin highly enough!',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1639512637319-f9f6c2cbb7dd?w=600&h=400&fit=crop&q=80',
    tripType: 'Adventure Planning'
  },
  {
    id: 17,
    name: 'Steve S.',
    trip: 'Exceptional Travel Experience',
    rating: 5,
    text: 'Receiving great service and value is a good reason to apply a 5 star rating, but in the event of receiving exceptional and sustained service from the beginning of the process of planning our travel right through to when we returned and even during our travels. 5 stars is not enough. So I can only hope people seeing the 5 star rating read our notes, as Linda is an exceptional travel agent. We will without hesitation be back to plan our next journey.',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1727027177177-ffbe653302d2?w=600&h=400&fit=crop&q=80',
    tripType: 'Travel Planning'
  },
  {
    id: 18,
    name: 'Syd A.',
    trip: 'Professional Service Excellence',
    rating: 5,
    text: 'Nothing is too much trouble for Linda. She is the total professional, so knowledgeable, diligent and practical. A delight to deal with.',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1628467513934-12370a424b6b?w=600&h=400&fit=crop&q=80',
    tripType: 'Trusted Service'
  },
  {
    id: 19,
    name: 'Barbara W.',
    trip: 'Thoughtful Travel Care',
    rating: 5,
    text: 'We cannot recommend Linda high enough. She is the most thoughtful, professional, kind and smart Travel Agent ever. We are so lucky to have her looking after everything we need, she is always helpful and understanding. We are so grateful for all you do for us.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1701789223372-dba1efcdbb4d?w=600&h=400&fit=crop&q=80',
    tripType: 'Travel Planning'
  },
  {
    id: 20,
    name: 'Christopher C.',
    trip: '15 Years of Trusted Travel Partnership',
    rating: 5,
    text: 'We discovered Linda about 15 years ago, working for Hello world. Since then she has looked after our Domestic & International travel arrangements. Linda is quick to respond to enquiries and provide comprehensive quotes & suggestions. We have complete confidence in her arrangements & bookings on our behalf. We can highly recommend Travlin as a reliable, reputable & conscientious Travel Agent. We look forward to many more trips organised by Linda.',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1480504612934-8170966f69e0?w=600&h=400&fit=crop&q=80',
    tripType: 'Multiple Experiences'
  },
  {
    id: 21,
    name: 'Caroline A.',
    trip: 'Adventure Planning Excellence',
    rating: 5,
    text: 'Linda is amazing! No trip is too big or too small. Linda\'s passion for travel and exceptional attention to detail makes her the perfect travel agent to help plan your next adventure. All you need is the idea of where you want to go, Linda will do the rest!',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1562672753-989b09b0939b?w=600&h=400&fit=crop&q=80',
    tripType: 'Adventure Planning'
  },
  {
    id: 22,
    name: 'Joanne W.',
    trip: 'Professional Travel Service & Best Deals',
    rating: 5,
    text: 'Linda is the best, always found the best deals for us and so professional. Really knows the industry and always answers our questions. Takes all the hassle out of travelling.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1688269910724-97e4f876a3b3?w=600&h=400&fit=crop&q=80',
    tripType: 'Travel Planning'
  },
  {
    id: 23,
    name: 'Gaye & Lance W.',
    trip: 'Cruise Travel Excellence',
    rating: 5,
    text: 'For the help and assistance afforded us, for her knowledge and expertise, friendly manner and dealing with all matters, great and small, we cannot give enough praise to Linda Forster. Our trips have been more enjoyable with having no worries before, during or after our cruises.',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1753635555215-182f23f82bd5?w=600&h=400&fit=crop&q=80',
    tripType: 'Group Cruise'
  }
]

interface TestimonialsProps {
  hideHeader?: boolean
  showReviewButtons?: boolean
  specificTestimonialId?: number
}

export default function Testimonials({ hideHeader = false, showReviewButtons = false, specificTestimonialId }: TestimonialsProps) {
  // If specificTestimonialId is provided, find that testimonial and set it as the initial index
  const initialIndex = specificTestimonialId 
    ? testimonials.findIndex(t => t.id === specificTestimonialId) !== -1 
      ? testimonials.findIndex(t => t.id === specificTestimonialId)
      : 0
    : 0
  
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [autoPlay, setAutoPlay] = useState(!specificTestimonialId) // Disable auto-play if showing specific testimonial

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          accent: '#0075CC',
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          icon: 'text-blue-500',
          gradient: 'from-blue-500 to-blue-600'
        }
      case 'orange':
        return {
          accent: '#ED7D31',
          bg: 'bg-orange-50',
          text: 'text-orange-600',
          icon: 'text-orange-500',
          gradient: 'from-orange-500 to-orange-600'
        }
      case 'yellow':
        return {
          accent: '#FFC000',
          bg: 'bg-yellow-50',
          text: 'text-yellow-600',
          icon: 'text-yellow-600',
          gradient: 'from-yellow-500 to-yellow-600'
        }
      default:
        return {
          accent: '#0075CC',
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          icon: 'text-blue-500',
          gradient: 'from-blue-500 to-blue-600'
        }
    }
  }

  const colorClasses = getColorClasses(currentTestimonial.color)

  const getTripIcon = (tripType: string) => {
    switch (tripType) {
      case 'Group Cruise':
      case 'European Cruise':
      case 'Virgin Voyages Cruise':
        return <Ship className="w-4 h-4" />
      case 'Thailand Adventure':
      case 'Australian Getaway':
      case 'Adventure Planning':
        return <Camera className="w-4 h-4" />
      case 'Travel Planning':
      case 'Travel Services':
      case 'Trusted Service':
        return <Shield className="w-4 h-4" />
      case 'Holiday Experience':
      case 'Holiday Planning':
      case 'Overseas Holiday':
      case 'Multiple Experiences':
        return <Heart className="w-4 h-4" />
      default:
        return <Plane className="w-4 h-4" />
    }
  }

  return (
    <section id="testimonials" className="py-6 section-medium">
      <div className="content-container-narrow">
        
        {/* Section Header */}
        {!hideHeader && (
          <div className="text-center mb-4">
            <div className="content-separator-short"></div>
            <p className="max-w-3xl mx-auto mb-3" style={{ color: 'var(--gray-600)' }}>
              <span className="text-description-large" style={{ color: 'var(--gray-800)', display: 'inline', fontWeight: 'bold' }}>TravLin Testimonials</span>
              <span className="text-description" style={{ display: 'inline' }}> - Real stories from real travelers who trusted us with their dream journeys. These heartfelt words from our clients inspire us every day to create extraordinary travel experiences.</span>
            </p>
          </div>
        )}

        {/* Main Testimonial Display */}
        <div className="mb-3 max-w-4xl mx-auto"
             onMouseEnter={() => setAutoPlay(false)}
             onMouseLeave={() => setAutoPlay(true)}>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-3 lg:gap-4 items-start">
            {/* Image Side */}
            <div className="flex flex-col items-center">
              {/* Angled Postcard Image */}
              <div className="relative">
                <div className="w-48 h-32 bg-white p-2 shadow-md relative border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <ImageWithFallback
                    src={currentTestimonial.image}
                    alt={currentTestimonial.trip}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              </div>
              
              {/* Progress Dots */}
              <div className="flex justify-center space-x-1.5 mt-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 hover:scale-125 ${ 
                      index === currentIndex 
                        ? 'scale-125 shadow-sm' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    style={{
                      backgroundColor: index === currentIndex ? colorClasses.accent : undefined
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Content Side - Stats and Testimonial */}
            <div className="flex flex-col px-3 lg:px-0">
              {/* Prominent Stats Row - Aligned with Quote */}
              <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-2">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: colorClasses.accent }}
                >
                  <Quote className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-base font-bold text-gray-800">5.0</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-base" style={{ color: 'var(--brand-blue)' }}>Hundreds+</div>
                  <div className="text-gray-600 text-xs">Happy Travelers</div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-base" style={{ color: 'var(--brand-orange)' }}>Many+</div>
                  <div className="text-gray-600 text-xs">Destinations</div>
                </div>
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-description leading-relaxed mb-2 italic border-l-3 pl-4 relative" 
                          style={{ borderLeftColor: colorClasses.accent }}>
                {currentTestimonial.text}
              </blockquote>
              
              {/* Customer Name */}
              <div>
                <div className="text-description font-semibold text-gray-800">
                  {currentTestimonial.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Platform Buttons Section - Only show on Contact page */}
        {showReviewButtons && (
          <div className="mt-6">
            <div className="bg-gradient-to-b from-gray-50 to-white shadow-sm p-6 max-w-4xl mx-auto rounded-lg border border-gray-100">
              
              {/* Call-to-Action Text */}
              <p className="text-description-small text-gray-700 mb-4 max-w-3xl mx-auto text-center">
                <strong>Share Your TravLin Experience!</strong> Whether it's a cruise, holiday, or travel consultation, sharing your journey helps other travelers discover professional, personalized service. We would love it and your journey story could inspire others!
              </p>
              
              {/* Review Platform Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                
                {/* Google Review */}
                <a 
                  href="https://g.page/r/CR0JNwfL2-9iEB0/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-md p-3 hover:border-red-500 hover:bg-red-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 bg-red-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-xs">G</span>
                    </div>
                    <h4 className="text-xs font-semibold text-gray-800">Google Review</h4>
                  </div>
                </a>

                {/* Travel Agent Review */}
                <a 
                  href="https://www.travelagentfinder.com.au/langwarrin/linda-forster/writeareview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-md p-3 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 bg-teal-500 rounded-md flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="text-xs font-semibold text-gray-800">Travel Agent Review</h4>
                  </div>
                </a>

                {/* ATIA Review */}
                <a 
                  href="https://traveltick.com.au/members/travlin-travel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-md p-3 hover:border-black hover:bg-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 bg-black rounded-md flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="text-xs font-semibold text-gray-800">ATIA Review</h4>
                  </div>
                </a>

                {/* Facebook Review */}
                <a 
                  href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Ftravlintravel%2Freviews%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-md p-3 hover:border-blue-600 hover:bg-blue-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-1 bg-blue-600 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-xs">f</span>
                    </div>
                    <h4 className="text-xs font-semibold text-gray-800">Facebook Review</h4>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}