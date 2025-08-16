// Lotto related types
export interface LottoNumber {
  value: number;
  isBonus?: boolean;
}

export interface LottoPrediction {
  numbers: LottoNumber[];
  confidence: number;
  timestamp: Date;
  imageId?: string;
}

// AI Model types
export interface PredictionResult {
  className: string;
  probability: number;
}

export interface ModelConfig {
  modelUrl: string;
  imageSize: number;
  numClasses: number;
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'ko' | 'en';
  saveHistory: boolean;
}

// Store types
export interface AppState {
  predictions: LottoPrediction[];
  isLoading: boolean;
  error: string | null;
  userPreferences: UserPreferences;
}