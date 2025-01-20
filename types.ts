// src/types.ts

export interface Adventure {
    id: string;
    name: string;
    estimated_duration: number;
    budget: number;
    category: string;
    address: string;
    photos: string; // URL to the photo
  }
  
  export interface Preferences {
    duration: number;
    budget: number[];
    category: string;
  }


export type RootStackParamList = {
    Opening: undefined;
    LoginSignup: undefined;
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    GenerateAdventure: undefined;
    AdventureResults: {
      duration: number;
      budget: number[];
      category: string;
    };
  };
  