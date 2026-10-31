import { ContactMessage, LeaderboardEntry } from '../types/portfolio';

const API_ENABLED = import.meta.env.VITE_API_ENABLED === 'true';

interface ApiLeaderboardEntry {
  id: string;
  initials: string;
  score: number;
  coins: number;
  distance_meters: number;
  character: 'kart' | 'fighter';
  time_formatted: string;
  created_at: string;
}

function mapLeaderboardEntry(entry: ApiLeaderboardEntry): LeaderboardEntry {
  return {
    id: entry.id,
    initials: entry.initials,
    score: entry.score,
    coins: entry.coins,
    distanceMeters: entry.distance_meters,
    character: entry.character,
    timeFormatted: entry.time_formatted,
    timestamp: Date.parse(entry.created_at),
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const code = body && typeof body.error === 'string' ? body.error : 'request_failed';
    throw new Error(code);
  }
  return body as T;
}

export const ApiService = {
  isEnabled(): boolean {
    return API_ENABLED;
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const result = await request<{ entries: ApiLeaderboardEntry[] }>('/api/leaderboard');
    return result.entries.map(mapLeaderboardEntry);
  },

  async addLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'timestamp'>): Promise<LeaderboardEntry[]> {
    const result = await request<{ entries: ApiLeaderboardEntry[] }>('/api/leaderboard', {
      method: 'POST',
      body: JSON.stringify({
        initials: entry.initials,
        score: entry.score,
        coins: entry.coins,
        distanceMeters: entry.distanceMeters,
        character: entry.character,
        timeFormatted: entry.timeFormatted,
      }),
    });
    return result.entries.map(mapLeaderboardEntry);
  },

  async addContactMessage(message: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>): Promise<void> {
    await request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  },
};
