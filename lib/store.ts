import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, LottoPrediction, UserPreferences } from '@/types';

interface AppStore extends AppState {
  // Actions
  addPrediction: (prediction: LottoPrediction) => void;
  clearPredictions: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'ko',
  saveHistory: true,
};

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      // State
      predictions: [],
      isLoading: false,
      error: null,
      userPreferences: defaultPreferences,

      // Actions
      addPrediction: (prediction) =>
        set((state) => ({
          predictions: [prediction, ...state.predictions].slice(0, 10), // Keep last 10
          error: null,
        })),

      clearPredictions: () =>
        set({
          predictions: [],
          error: null,
        }),

      setLoading: (isLoading) =>
        set({ isLoading }),

      setError: (error) =>
        set({ error, isLoading: false }),

      updatePreferences: (preferences) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            ...preferences,
          },
        })),
    }),
    {
      name: 'lottopicture-storage',
      partialize: (state) => ({
        predictions: state.userPreferences.saveHistory ? state.predictions : [],
        userPreferences: state.userPreferences,
      }),
    }
  )
);