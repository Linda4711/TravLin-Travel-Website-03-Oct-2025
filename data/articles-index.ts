// TravLin Stories Articles Index
// Clean separation of content from presentation
// 🚧 FRESH START: All articles cleared of content, ready for incremental building

export interface ArticleData {
  id: number
  title: string
  slug: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  featured: boolean
  color: 'orange' | 'blue' | 'yellow'
  type: 'article'
  content?: {
    intro?: string
    sections?: Array<{
      heading: string
      content: string
    }>
  }
}

// ARTICLE DATA - Ready for fresh content creation, one by one
export const allArticles: ArticleData[] = [
  {
    id: 1,
    title: 'VALUE OF A TRAVEL AGENT',
    slug: 'value-of-travel-agent',
    excerpt: 'Discover why travel agents remain indispensable in today\'s digital world. From personalized service and expert guidance to exclusive deals and 24/7 support, learn how professional travel agents protect your investment and turn dreams into extraordinary realities.',
    image: 'https://images.unsplash.com/photo-1591172601559-0ec5b777992a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXNrJTIwd29ya3NwYWNlJTIwZmxhdCUyMGxheSUyMGNvbXBhc3MlMjBjYW1lcmElMjBwYXNzcG9ydCUyMG1hcCUyMGNvZmZlZXxlbnwxfHx8fDE3NTg1NTM3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-12-15',
    readTime: '5 min read',
    category: 'INSIGHTS',
    featured: true,
    color: 'orange',
    type: 'article'
  },
  {
    id: 2,
    title: 'Aft V Fwd:<br />Which Cabin Is for You?',
    slug: 'aft-cabin-vs-forward-cruise',
    excerpt: 'Choosing between aft and forward cabins on your cruise? Discover the unique benefits of each location - from stunning wake views and spacious balconies to exciting port approaches. Get expert guidance on cabin positioning to enhance your perfect cruise experience.',
    image: 'https://images.unsplash.com/photo-1739883138268-7405d964514d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwJTIwYmFsY29ueSUyMHdha2UlMjB2aWV3JTIwb2NlYW4lMjBhZnQlMjBjYWJpbnxlbnwxfHx8fDE3NTg3MTk5MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-11-22',
    readTime: '3 min read',
    category: 'CRUISE',
    featured: false,
    color: 'blue',
    type: 'article'
    // NO CONTENT - Fresh slate for rebuilding
  },
  {
    id: 3,
    title: "Travellers Choice:<br />NTIA Champions Again!",
    slug: 'travellers-choice-ntia-champions',
    excerpt: 'Christian Hunter, MD of Most Outstanding Travel Agency Network, Travellers Choice, reveals the (not so) secret to their fourth consecutive NTIA win and achieving a remarkable Net Promoter Score of 90.',
    image: 'https://images.unsplash.com/photo-1754300681803-61eadeb79d10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF3YXJkJTIwZ29sZGVuJTIwdHJvcGh5JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU4OTYyMDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-10-18',
    readTime: '3 min read',
    category: 'INDUSTRY',
    featured: false,
    color: 'orange',
    type: 'article'
  },
  {
    id: 4,
    title: "Capital in A State",
    slug: 'capital-in-a-state-canberra',
    excerpt: 'Explore Australia\'s vibrant capital, Canberra, where rich history meets striking architecture and stunning natural beauty. From Parliament House and the War Memorial to beautiful botanic gardens and world-class wineries, discover why the ACT offers the perfect blend of culture, adventure, and culinary delights year-round.',
    image: 'https://images.unsplash.com/photo-1719918508801-0dd00797d959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5iZXJyYSUyMHBhcmxpYW1lbnQlMjBob3VzZSUyMHNwcmluZ3xlbnwxfHx8fDE3NTgxMzE1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-08-15',
    readTime: '4 min read',
    category: 'DESTINATION',
    featured: false,
    color: 'yellow',
    type: 'article'
  },
  {
    id: 5,
    title: 'A State for All Seasons',
    slug: 'a-state-for-all-seasons-victoria',
    excerpt: 'Victoria may be Australia\'s smallest mainland state, but it packs a vibrant punch year-round. From Melbourne\'s cultural scene and iconic Great Ocean Road to world-class sporting events and stunning wine regions, discover why Victoria offers unforgettable experiences in every season.',
    image: 'https://images.unsplash.com/photo-1610532785167-1f1ea5ac6988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYSUyMGJlYWNoJTIwYm94ZXMlMjBjb2xvcmZ1bCUyMGh1dHN8ZW58MXx8fHwxNzU4MTMxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-07-28',
    readTime: '3 min read',
    category: 'DESTINATION',
    featured: false,
    color: 'yellow',
    type: 'article'
  },
  {
    id: 6,
    title: 'The Apple Isle',
    slug: 'the-apple-isle-tasmania',
    excerpt: 'Tasmania, affectionately known as the Apple Isle, captivates visitors with its stunning landscapes, diverse wildlife, and vibrant local culture. Whether you seek adventure, relaxation, or cultural immersion, Tasmania offers unforgettable experiences year-round.',
    image: 'https://images.unsplash.com/photo-1701389357376-5b72922c5c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFkbGUlMjBtb3VudGFpbiUyMHRhc21hbmlhfGVufDF8fHx8MTc1ODEzMTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-07-10',
    readTime: '4 min read',
    category: 'DESTINATION',
    featured: false,
    color: 'yellow',
    type: 'article'
  },
  {
    id: 7,
    title: 'In Doubt, Go South!',
    slug: 'in-doubt-go-south-south-australia',
    excerpt: 'South Australia is famed for its world-class wine, exquisite cuisine, and breathtaking natural beauty. From iconic wine regions like Barossa Valley and McLaren Vale to the otherworldly Pink Lakes and luxury stays, discover why this remarkable state offers a rich tapestry of experiences for every traveler.',
    image: 'https://images.unsplash.com/photo-1549317776-bcd8479a995e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW5nYXJvbyUyMGlzbGFuZCUyMHNvdXRoJTIwYXVzdHJhbGlhJTIwa2FuZ2Fyb29zfGVufDF8fHx8MTc1ODk3ODAwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-06-25',
    readTime: '4 min read',
    category: 'DESTINATION',
    featured: false,
    color: 'yellow',
    type: 'article'
  },
  {
    id: 8,
    title: 'Wild Wide West',
    slug: 'wild-wide-west-western-australia',
    excerpt: 'Western Australia is a land of striking contrasts and breathtaking beauty, where rugged natural wonders blend seamlessly with vibrant urban life. From the otherworldly Pinnacles Desert and pristine coastlines to Perth\'s cosmopolitan flair and Margaret River\'s wine excellence, discover endless adventures in this vast state.',
    image: 'https://images.unsplash.com/photo-1737621806412-4a659a91e421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW1iZXJsZXklMjBjb2FzdCUyMHdlc3Rlcm4lMjBhdXN0cmFsaWElMjByZWQlMjBjbGlmZnN8ZW58MXx8fHwxNzU4OTc4MDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-06-05',
    readTime: '2 min read',
    category: 'DESTINATION',
    featured: false,
    color: 'yellow',
    type: 'article'
  },
  {
    id: 9,
    title: 'Heartland',
    slug: 'heartland-northern-territory',
    excerpt: 'Welcome to the Northern Territory (NT), often called the heartland of Australia! This stunning region is a playground for adventurers and nature lovers alike, boasting towering waterfalls, natural swimming holes, and vast gorges that inspire awe. With its iconic outback deserts and rich Aboriginal heritage, a trip here is more than a vacation—it\'s a deeply spiritual journey.',
    image: 'https://images.unsplash.com/flagged/photo-1553779801-13e5e5f7398a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bHVydSUyMGF5ZXJzJTIwcm9jayUyMG5vcnRoZXJuJTIwdGVycml0b3J5JTIwYXVzdHJhbGlhfGVufDF8fHx8MTc1ODQ1OTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-05-18',
    readTime: '4 min read',
    category: 'DESTINATION',
    featured: false,
    color: 'yellow',
    type: 'article'
  },
  {
    id: 10,
    title: 'Beautiful One Day, Queensland at Best',
    slug: 'beautiful-one-day-queensland',
    excerpt: 'Queensland, Australia\'s second-largest state, is a natural wonderland filled with diverse landscapes from pristine beaches to lush rainforests. From the Great Barrier Reef\'s underwater adventures to Gold Coast\'s thrilling theme parks and the serene Whitsunday Islands, discover unforgettable adventures and luxurious escapes.',
    image: 'https://images.unsplash.com/photo-1576790320700-5fc18fda39e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWVlbnNsYW5kJTIwYXVzdHJhbGlhJTIwZ3JlYXQlMjBiYXJyaWVyJTIwcmVlZnxlbnwxfHx8fDE3NTg5NzYyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2024-04-28',
    readTime: '2 min read',
    category: 'DESTINATION',
    featured: false,
    color: 'yellow',
    type: 'article'
  }
]

// UTILITY FUNCTIONS
export const getArticleById = (id: number): ArticleData | undefined => 
  allArticles.find(article => article.id === id)

export const getFeaturedArticles = (): ArticleData[] => 
  allArticles.filter(article => article.featured)

export const getArticlesByCategory = (category: string): ArticleData[] => 
  allArticles.filter(article => article.category === category)

export const getAllCategories = (): string[] => 
  [...new Set(allArticles.map(article => article.category))]