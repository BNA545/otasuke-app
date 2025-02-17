export interface MissingPerson {
    id: string;
    title: string;
    description: string;
    name: string;
    age: number;
    gender: string;
    lastSeenLocation: string;
    lastSeenDate: string;
    photos: string[];
    contactInfo: string;
    createdAt: string;
    hasReward?: boolean;
    rewardAmount?: number;
  }
  
  export interface SearchParams {
    keyword?: string;
    area?: string;
    age?: string;
    gender?: string;
    hasReward?: boolean;
  }
  
  export interface ApiResponse<T> {
    items: T[];
    total: number;
    page: number;
    totalPages: number;
  }