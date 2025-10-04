import React, { useEffect } from 'react'

// Facebook Debug Instructions:
// After deploying changes, use Facebook's Sharing Debugger to refresh cache:
// 1. Go to: https://developers.facebook.com/tools/debug/
// 2. Enter your URL: https://travlintravel.com.au/TravLin-Stories
// 3. Click "Debug" then "Scrape Again" to force Facebook to fetch new images
// 4. For individual articles, use specific article URLs

interface SEOHeadProps {
  title?: string
  description?: string
  page?: 'home' | 'cruises' | 'travel-options' | 'contact' | 'about' | 'stories'
  structuredData?: object
  ogImage?: string // Dynamic Open Graph image for social sharing
  ogImageAlt?: string // Alt text for Open Graph image
}

export default function SEOHead({ 
  title, 
  description, 
  page = 'home',
  structuredData,
  ogImage,
  ogImageAlt 
}: SEOHeadProps) {
  
  const pageData = {
    home: {
      title: 'TravLin Travel - Expert Cruise & Travel Specialists | CLIA Master Certified',
      description: 'Award-winning travel agency specializing in cruises, tours & luxury travel. CLIA Master certified with NTIA awards. Expert cruise consultants, personalized service, and exclusive deals. Book your dream journey today.',
      keywords: 'cruise travel, travel agency, CLIA certified, cruise specialists, luxury travel, travel planning, cruise deals, NTIA award winners'
    },
    cruises: {
      title: 'Cruise Specialists - Ocean, River & Expedition Cruises | TravLin Travel',
      description: 'Expert cruise specialists offering ocean, river, expedition & luxury cruises. CLIA Master certified consultants. Exclusive cruise deals, personalized service, and comprehensive cruise planning.',
      keywords: 'cruise specialists, ocean cruises, river cruises, expedition cruises, luxury cruises, CLIA certified, cruise deals'
    },
    'travel-options': {
      title: 'Travel Options - Tours, Hotels, Flights & Travel Insurance | TravLin Travel',
      description: 'Comprehensive travel options including escorted tours, independent travel, hotels, flights, car rentals, visa services, and travel insurance. Professional travel planning with expert guidance.',
      keywords: 'travel options, escorted tours, independent travel, hotels, flights, travel insurance, visa services, travel planning'
    },
    contact: {
      title: 'Contact TravLin Travel - Expert Travel Consultants | Get Quote',
      description: 'Contact our expert travel consultants for personalized cruise and travel planning. Award-winning service, free consultations, and competitive quotes. Call, email, or submit online enquiry.',
      keywords: 'contact travel agent, travel consultation, cruise quotes, travel planning, travel enquiry, travel advisor'
    },
    about: {
      title: 'About TravLin Travel - Linda Forster & Award-Winning Travel Team',
      description: 'Meet Linda Forster and the TravLin Travel team. NTIA 2022 winners, CLIA Master certified, with 18+ years experience. Professional travel services, industry credentials, and exceptional customer care.',
      keywords: 'Linda Forster, travel agent, NTIA winners, CLIA Master, travel experience, professional travel services'
    },
    stories: {
      title: 'TravLin Stories - Travel Tips, Destination Guides & Travel Inspiration',
      description: 'Discover travel inspiration, expert destination guides, insider tips, and travel stories from industry professionals. Your gateway to extraordinary travel experiences and hidden gems.',
      keywords: 'travel stories, destination guides, travel tips, travel inspiration, travel blog, expert travel advice'
    }
  }

  const currentPage = pageData[page]
  const finalTitle = title || currentPage.title
  const finalDescription = description || currentPage.description

  // Default structured data for the organization
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "TravLin Travel",
    "description": "Award-winning travel agency specializing in cruises and luxury travel experiences",
    "url": "https://travlintravel.com.au",
    "logo": "https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759070981/2025_Portrait_on_blue_logo_ojuj1h.png",
    "founder": {
      "@type": "Person",
      "name": "Linda Forster"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melbourne",
      "addressRegion": "Victoria",
      "addressCountry": "Australia"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-3-XXXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/travlintravel",
      "https://www.instagram.com/travlintravel"
    ],
    "serviceType": [
      "Cruise Planning",
      "Travel Planning",
      "Travel Insurance",
      "Visa Services",
      "Tour Packages"
    ],
    "award": [
      {
        "@type": "Thing",
        "name": "NTIA 2022 People's Choice Best Agency"
      },
      {
        "@type": "Thing", 
        "name": "Quality Business Winner 2024"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "247",
      "bestRating": "5"
    }
  }

  useEffect(() => {
    // Update document title
    document.title = finalTitle
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', finalDescription)

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', currentPage.keywords)

    // Determine the best Open Graph image - prioritize dynamic image
    const defaultOgImage = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/c_fill,w_1200,h_630,f_jpg/v1759070981/2025_Portrait_on_blue_logo_ojuj1h.png'
    
    // For article images, ensure they're properly sized for Facebook sharing
    let finalOgImage = ogImage || defaultOgImage
    if (ogImage && !ogImage.includes('c_fill,w_1200,h_630')) {
      // If it's a Cloudinary image, optimize it for Facebook
      if (ogImage.includes('cloudinary.com')) {
        finalOgImage = ogImage.replace('/upload/', '/upload/c_fill,w_1200,h_630,f_jpg/')
      }
      // If it's an Unsplash image, add proper sizing parameters
      else if (ogImage.includes('unsplash.com')) {
        finalOgImage = `${ogImage}&w=1200&h=630&fit=crop&fm=jpg&q=80`
      }
    }
    
    const finalOgImageAlt = ogImageAlt || 'TravLin Travel - Expert Cruise & Travel Specialists'

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:type', content: page === 'stories' ? 'article' : 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'TravLin Travel' },
      { property: 'og:image', content: finalOgImage },
      { property: 'og:image:secure_url', content: finalOgImage },
      { property: 'og:image:alt', content: finalOgImageAlt },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:locale', content: 'en_AU' }
    ]

    ogTags.forEach(tag => {
      let ogElement = document.querySelector(`meta[property="${tag.property}"]`)
      if (!ogElement) {
        ogElement = document.createElement('meta')
        ogElement.setAttribute('property', tag.property)
        document.head.appendChild(ogElement)
      }
      ogElement.setAttribute('content', tag.content)
    })

    // Add Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: finalTitle },
      { name: 'twitter:description', content: finalDescription },
      { name: 'twitter:image', content: finalOgImage },
      { name: 'twitter:image:alt', content: finalOgImageAlt }
    ]

    twitterTags.forEach(tag => {
      let twitterElement = document.querySelector(`meta[name="${tag.name}"]`)
      if (!twitterElement) {
        twitterElement = document.createElement('meta')
        twitterElement.setAttribute('name', tag.name)
        document.head.appendChild(twitterElement)
      }
      twitterElement.setAttribute('content', tag.content)
    })

    // Add additional meta tags for better social sharing
    const additionalTags = [
      { name: 'author', content: 'TravLin Travel' },
      { name: 'robots', content: 'index, follow' },
      { property: 'article:publisher', content: 'https://www.facebook.com/travlintravel' },
      { property: 'article:author', content: 'Linda Forster' }
    ]

    additionalTags.forEach(tag => {
      const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        if (tag.property) {
          element.setAttribute('property', tag.property)
        } else {
          element.setAttribute('name', tag.name)
        }
        document.head.appendChild(element)
      }
      element.setAttribute('content', tag.content)
    })

    // Add structured data
    const finalStructuredData = structuredData || organizationData
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]')
    if (structuredDataScript) {
      document.head.removeChild(structuredDataScript)
    }
    
    structuredDataScript = document.createElement('script')
    structuredDataScript.type = 'application/ld+json'
    structuredDataScript.textContent = JSON.stringify(finalStructuredData)
    document.head.appendChild(structuredDataScript)

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', window.location.href)

  }, [finalTitle, finalDescription, currentPage.keywords, structuredData])

  return null
}
