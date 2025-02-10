// src/types.ts

export interface Adventure {
  id: string;
  name: string;
  category: string;
  budget: number;
  estimated_duration: number;
  address: string;
  photos: string; // URL to the photo
  overview: string; // Overview text
  details: string; // Detailed description
  reviews: { user: string; rating: number; comment: string }[]; // Array of reviews
  directions?: string[];
  longitude: number;
  latitude: number;
}

export interface Preferences {
  duration: number; // Desired duration in hours
  budget: number[]; // Array of [minBudget, maxBudget]
  category: string; // Selected category for filtering
}

// 🔹 New Mission Interface
export interface Mission {
  id: string;
  level: string;
  text: string;
  icon: any; // Local asset or URL
  gradient: string[]; // Background gradient colors
}

// 🔹 Update RootStackParamList
export type RootStackParamList = {
  Opening: undefined;
  LoginSignup: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Adventures: undefined;
  GenerateAdventure: {
    duration?: number;
    budget?: number[]; // [minBudget, maxBudget]
    category?: string;
  }; // Allow optional params
  AdventureResults: {
    adventures: Adventure[];
    duration: number;
    budget: number[];
    category: string;
  };
  AdventureDetail: { adventure: Adventure };
  DirectionsPage: { adventure: Adventure };
  SeeAllActivities: undefined;
  UserProfile: undefined;
  Missions: undefined;
  MissionScreen: {
    missionTitle: string;
    missionDescription: string;
    missionPrompt: string;
  };
};
