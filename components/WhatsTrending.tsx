import React, { useState } from 'react'
// import { Button } from './ui/button' // Removed - using TravLinButton instead
import { Card, CardContent } from './ui/card'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Star, MapPin, TrendingUp, Calendar } from 'lucide-react'
import SectionDivider from './SectionDivider'
import TravLinButton from './TravLinButton'

const trendingDestinations = [
  {
    id: 1,
    name: 'Japan',
    location: 'Tokyo, Kyoto & Osaka',
    description: 'Australia\'s #1 trending destination. Cherry blossoms, rich culture, and modern cities. Favorable exchange rates make now the perfect time to visit.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop&q=80',
    rating: 4.9,
    reviews: 847,
    trendingRank: '#1',
    bestTime: 'Mar-May, Sep-Nov',
    trending: 'Cherry Blossom Season',
    brandColor: 'blue'
  },
  {
    id: 2,
    name: 'Greece',
    location: 'Santorini & Mykonos',
    description: 'Mediterranean charm with whitewashed villages, crystal waters, and authentic Greek hospitality. Excellent shoulder season pricing.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop&q=80',
    rating: 4.8,
    reviews: 623,
    trendingRank: '#2',
    bestTime: 'Apr-Jun, Sep-Oct',
    trending: 'Island Hopping',
    brandColor: 'orange'
  },
  {
    id: 3,
    name: 'Vietnam',
    location: 'Hanoi, Ho Chi Minh & Ha Long Bay',
    description: 'Rising on traveller wish lists. Incredible value, amazing street food, stunning landscapes, and rich history. Australian dollar goes far.',
    image: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=600&h=400&fit=crop&q=80',
    rating: 4.7,
    reviews: 534,
    trendingRank: '#3',
    bestTime: 'Oct-Apr',
    trending: 'Street Food Tours',
    brandColor: 'yellow'
  }
]

interface WhatsTrendingProps {
  onNavigateToContact?: () => void
}

export default function WhatsTrending({ onNavigateToContact }: WhatsTrendingProps) {

  return (
    <div id="whats-trending" className="relative">
      {/* Background watercolor elements */}
      <div className="absolute top-20 left-10 w-56 h-56 watercolor-blob opacity-10 floating-element"></div>
      <div className="absolute bottom-32 right-20 w-40 h-40 watercolor-blob-coral opacity-15 floating-element" style={{animationDelay: '3s'}}></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* What's Trending Section */}
        <div>
          <div className="text-center mb-8">
            <SectionDivider />
            <div className="flex items-center justify-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8" style={{ color: '#ED7D31' }} />
              <h2 className="section-heading">What's Trending</h2>
              <TrendingUp className="w-8 h-8" style={{ color: '#ED7D31' }} />
            </div>
          </div>
          

          {/* Trending Destinations - Enhanced Responsive Layout */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trendingDestinations.map((destination) => (
              <Card key={destination.id} className="travel-card group overflow-hidden relative" style={{borderRadius: '0px'}}>
                {/* Trending Badge - Brand Color Integration */}
                <div className="absolute top-4 left-4 z-10">
                  <div 
                    className="flex items-center space-x-2 text-white px-3 py-1 text-sm font-bold shadow-lg"
                    style={{ 
                      background: destination.brandColor === 'blue' ? 
                        'linear-gradient(135deg, var(--brand-blue), var(--brand-blue-light))' :
                        destination.brandColor === 'orange' ? 
                        'linear-gradient(135deg, var(--brand-orange), var(--brand-orange-light))' :
                        'linear-gradient(135deg, var(--brand-yellow), var(--brand-yellow-light))',
                      color: destination.brandColor === 'yellow' ? 'var(--gray-800)' : 'white',
                      borderRadius: '0px'
                    }}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>{destination.trendingRank} TRENDING</span>
                  </div>
                </div>

                {/* Postcard Image */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
                    alt={`${destination.name} - ${destination.trending}`}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Postcard Stamp Effect */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg border-2 border-dashed border-gray-400 p-2 transform rotate-12 shadow-md">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current" style={{ color: '#FFC000' }} />
                        <span className="text-xs font-bold text-gray-800">{destination.rating}</span>
                      </div>
                      <div className="text-xs text-gray-600">({destination.reviews})</div>
                    </div>
                  </div>
                </div>
                
                {/* Postcard Content */}
                <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl text-gray-800 font-bold">{destination.name}</h3>
                      <div 
                        className="text-xs px-2 py-1 font-semibold"
                        style={{
                          backgroundColor: destination.brandColor === 'blue' ? 
                            'rgba(0, 117, 204, 0.1)' :
                            destination.brandColor === 'orange' ?
                            'rgba(237, 125, 49, 0.1)' :
                            'rgba(255, 192, 0, 0.15)',
                          color: destination.brandColor === 'blue' ?
                            'var(--brand-blue-dark)' :
                            destination.brandColor === 'orange' ?
                            'var(--brand-orange-dark)' :
                            'var(--brand-yellow-dark)',
                          borderRadius: '0px'
                        }}
                      >
                        {destination.trending}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {destination.location}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      Best time: {destination.bestTime}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {destination.description}
                  </p>
                  
                  <TravLinButton 
                    variant={destination.brandColor as 'blue' | 'orange' | 'yellow'}
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      if (onNavigateToContact) {
                        onNavigateToContact()
                      } else {
                        window.location.href = '/contact'
                      }
                    }}
                  >
                    ENQUIRE TRENDING TRIP
                  </TravLinButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}