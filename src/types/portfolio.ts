export interface ProjectItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  countryFlag: string;
  category: 'performance' | 'social_ugc' | 'ecommerce' | 'branding';
  heroMetric: string;
  metricLabel: string;
  description: string;
  bulletPoints: string[];
  skillsUsed: string[];
  imageUrl: string;
  featured: boolean;
  liveUrl?: string;
}

export interface LeaderboardEntry {
  id: string;
  initials: string;
  score: number;
  coins: number;
  distanceMeters: number;
  character: 'kart' | 'fighter';
  timeFormatted: string;
  timestamp: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  timestamp: number;
  read: boolean;
}
