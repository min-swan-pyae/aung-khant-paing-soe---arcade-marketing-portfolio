import { ProjectItem, LeaderboardEntry, ContactMessage } from '../types/portfolio';

const STORAGE_KEYS = {
  PROJECTS: 'akp_portfolio_projects_v1',
  LEADERBOARD: 'akp_portfolio_leaderboard_v1',
  MESSAGES: 'akp_portfolio_messages_v1',
};

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj_richd_gerik',
    company: 'RICHD GERIK CO., LTD',
    role: 'Online Marketing Officer',
    period: '2024 – 2025',
    location: 'Bangkok, Thailand',
    countryFlag: '🇹🇭',
    category: 'performance',
    heroMetric: '+40% ROI',
    metricLabel: 'Monthly Return On Investment',
    description: 'Planned and executed global digital marketing strategies, managing full-funnel Google Ads and performance campaigns while monitoring CTR, CPC, and conversions via GA4.',
    bulletPoints: [
      'Planned and executed digital marketing strategies for global markets, aligning campaigns with high-impact business objectives and brand positioning.',
      'Managed Google Ads campaigns, monitoring performance metrics such as CTR, CPC, and conversions using Google Analytics 4, achieving a consistent +40% monthly ROI increase.',
      'Developed and scheduled cross-platform social media marketing campaigns to expand organic brand reach and retention.',
      'Created and published SEO-optimized blogs and articles via WordPress CMS, driving sustained organic traffic growth and SEM performance using Mailchimp automation.',
      'Maintained rigorous brand consistency and creative QA across all global digital channels and commercial marketing assets.'
    ],
    skillsUsed: ['Google Ads', 'GA4 Analytics', 'Meta Ads', 'SEO Optimization', 'WordPress CMS', 'Mailchimp SEM'],
    imageUrl: '/src/assets/images/project_richd_gerik_1792267383491.jpg',
    featured: true,
  },
  {
    id: 'proj_tecno_mobile',
    company: 'TECNO MOBILE MYANMAR',
    role: 'Digital Marketing Specialist',
    period: '2023 – 2024',
    location: 'Yangon, Myanmar',
    countryFlag: '🇲🇲',
    category: 'social_ugc',
    heroMetric: '9.2M+ Views',
    metricLabel: 'Omnichannel Viral Campaign Reach',
    description: 'Spearheaded omnichannel smartphone promotional launches, direct KOL/influencer partnerships, data-backed optimization, and on-screen talent UGC creator video campaigns.',
    bulletPoints: [
      'Tracked and analyzed performance across multiple digital channels, actively optimizing media spends based on real-time data insights.',
      'Planned and executed social media marketing strategies to boost product launches, brand awareness, and consumer engagement.',
      'Managed top-tier KOLs and macro/micro-influencers including creative briefing, contractual deliverables, and viral performance tracking.',
      'Acted as an on-screen UGC creator and scriptwriter for promotional video campaigns distributed through high-growth digital channels.',
      'Built and maintained strong strategic alliances with vendors, creative production houses, and agency marketing partners.'
    ],
    skillsUsed: ['KOL Management', 'UGC Content Creation', 'Viral Video Strategy', 'Cross-Channel Analytics', 'Brand Partnerships'],
    imageUrl: '/src/assets/images/project_tecno_mobile_1792267397168.jpg',
    featured: true,
  },
  {
    id: 'proj_aurora_ring',
    company: 'AURORA RING',
    role: 'E-commerce & Digital Marketing Specialist',
    period: '2025',
    location: 'Global (Freelance)',
    countryFlag: '🌐',
    category: 'ecommerce',
    heroMetric: '3.4x ROAS',
    metricLabel: 'E-commerce Conversion Rate +85%',
    description: 'Designed and optimized a global high-converting Shopify store UI/UX, implemented technical SEO best practices, and drove targeted international customer acquisition.',
    bulletPoints: [
      'Designed and engineered high-converting Shopify store UI/UX architectures to minimize cart abandonment and boost average order value (AOV).',
      'Curated product storytelling assets, macro product photography, SEO-driven collection blogs, and catalog metadata.',
      'Implemented on-page and technical SEO best practices, securing top Google rankings for luxury jewelry search queries.',
      'Planned and launched hyper-targeted paid social media campaigns across North America and Southeast Asia, accelerating global acquisition.',
      'Continuous conversion rate optimization (CRO) via A/B testing checkout flows and customer journey touchpoints.'
    ],
    skillsUsed: ['Shopify Store UI/UX', 'Global SEO', 'Conversion Rate Optimization', 'Paid Social Acquisition', 'Product Merchandising'],
    imageUrl: '/src/assets/images/project_aurora_ring_1792267412993.jpg',
    featured: true,
  },
  {
    id: 'proj_seafood_city',
    company: 'SEAFOOD CITY LUXURY HOTPOT',
    role: 'Digital Marketing Specialist',
    period: '2022 – 2023',
    location: 'Myanmar',
    countryFlag: '🇲🇲',
    category: 'branding',
    heroMetric: '+65% Sales',
    metricLabel: 'B2B & B2C Revenue Growth',
    description: 'Formulated omni-channel marketing campaigns, high-impact commercial video productions as UGC creator, and managed paid advertising across digital channels.',
    bulletPoints: [
      'Developed and executed comprehensive B2B and B2C marketing strategies driving direct VIP banquet bookings and retail dining footfall.',
      'Planned media buying strategies and performance advertising campaigns across social and local search platforms.',
      'Created viral foodie UGC videos, scriptwriting, and creative storyboarding that drove record customer engagement.',
      'Coordinated outsourced video production teams and creative agencies to deliver high-fidelity marketing assets on strict schedules.'
    ],
    skillsUsed: ['B2B & B2C Marketing', 'Commercial Video Direction', 'Media Buying', 'UGC Storyboarding', 'Event Promotion'],
    imageUrl: '/src/assets/images/hero_arcade_cityscape_1792267366513.jpg',
    featured: false,
  },
  {
    id: 'proj_lillian_flowers',
    company: 'LILLIAN FLOWERS BOUQUET',
    role: 'Digital Marketing Specialist',
    period: '2020 – 2022',
    location: 'Myanmar',
    countryFlag: '🇲🇲',
    category: 'performance',
    heroMetric: '+180%',
    metricLabel: 'Peak Holiday E-commerce Volume',
    description: 'Directed end-to-end digital marketing operations including festive seasonal media buying, celebrity endorsements, and multi-channel creative design.',
    bulletPoints: [
      'Managed end-to-end digital marketing operations, overseeing paid social media spend, creative asset direction, and seasonal campaigns.',
      'Led high-visibility PR and influencer campaigns with top celebrities and micro-influencers during peak Valentine’s and Mother’s Day sales cycles.',
      'Designed and tested performance ad creatives resulting in a 2.8x increase in direct message orders and website checkouts.',
      'Created compelling promotional copy and visual storytelling assets across Facebook, Instagram, and local messaging channels.'
    ],
    skillsUsed: ['End-to-End Paid Media', 'Celebrity PR Campaigns', 'Creative Ad Design', 'Seasonal Promotional Planning'],
    imageUrl: '/src/assets/images/project_richd_gerik_1792267383491.jpg',
    featured: false,
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'lb_1', initials: 'AKP', score: 4850, coins: 48, distanceMeters: 4850, character: 'kart', timeFormatted: '00:54.2', timestamp: Date.now() - 3600000 },
  { id: 'lb_2', initials: 'CMO', score: 4120, coins: 41, distanceMeters: 4120, character: 'fighter', timeFormatted: '01:02.8', timestamp: Date.now() - 7200000 },
  { id: 'lb_3', initials: 'ROA', score: 3790, coins: 37, distanceMeters: 3790, character: 'kart', timeFormatted: '01:08.4', timestamp: Date.now() - 14400000 },
  { id: 'lb_4', initials: 'SEO', score: 3240, coins: 32, distanceMeters: 3240, character: 'fighter', timeFormatted: '01:15.1', timestamp: Date.now() - 28800000 },
  { id: 'lb_5', initials: 'CTR', score: 2680, coins: 26, distanceMeters: 2680, character: 'kart', timeFormatted: '01:22.0', timestamp: Date.now() - 43200000 },
];

export const StorageService = {
  getProjects(): ProjectItem[] {
    if (typeof window === 'undefined') return INITIAL_PROJECTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PROJECTS;
  },

  saveProjects(projects: ProjectItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getLeaderboard(): LeaderboardEntry[] {
    if (typeof window === 'undefined') return INITIAL_LEADERBOARD;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_LEADERBOARD;
  },

  addLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'timestamp'>): LeaderboardEntry[] {
    const list = this.getLeaderboard();
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: 'lb_' + Date.now(),
      timestamp: Date.now()
    };
    const updated = [...list, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated));
    }
    return updated;
  },

  getMessages(): ContactMessage[] {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  },

  addMessage(msg: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>): ContactMessage {
    const messages = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg_' + Date.now(),
      timestamp: Date.now(),
      read: false
    };
    messages.unshift(newMsg);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
    return newMsg;
  },

  resetAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  }
};
