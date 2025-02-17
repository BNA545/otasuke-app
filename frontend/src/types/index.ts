export interface SearchParams {
    keyword?: string;
    area?: string;
    age?: string;
    gender?: string;
  }
  
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