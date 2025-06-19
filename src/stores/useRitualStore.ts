import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Habit {
  id: string;
  name: string;
  description: string;
  category: 'health' | 'productivity' | 'learning' | 'social' | 'personal';
  frequency: 'daily' | 'weekly';
  targetDays: number;
  streak: number;
  longestStreak: number;
  completedToday: boolean;
  totalCompletions: number;
  createdAt: string; // ISO format
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Ritual {
  id: string;
  name: string;
  description: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  habits: string[]; // An array of habit IDs
  isActive: boolean;
  completedToday: boolean;
}

interface RitualState {
  rituals: Ritual[];
  habits: Habit[];
  toggleHabit: (habitId: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'longestStreak' | 'completedToday' | 'totalCompletions' | 'createdAt'>) => void;
  deleteHabit: (habitId: string) => void;
  updateHabit: (habitId: string, habitUpdate: Partial<Omit<Habit, 'id'>>) => void;
  addRitual: (ritual: Omit<Ritual, 'id' | 'isActive' | 'completedToday'>) => void;
  deleteRitual: (ritualId: string) => void;
  updateRitual: (ritualId: string, ritualUpdate: Partial<Omit<Ritual, 'id'>>) => void;
  toggleRitual: (ritualId: string) => void;
}

const useRitualStore = create<RitualState>()(
  persist(
    (set, get) => ({
      rituals: [],
      habits: [],
      
      addHabit: (habit) => set((state) => ({
        habits: [...state.habits, {
          ...habit,
          id: uuidv4(),
          streak: 0,
          longestStreak: 0,
          completedToday: false,
          totalCompletions: 0,
          createdAt: new Date().toISOString()
        }]
      })),
      
      deleteHabit: (habitId) => set((state) => ({
        habits: state.habits.filter(h => h.id !== habitId),
        // Also remove from any rituals
        rituals: state.rituals.map(r => ({ ...r, habits: r.habits.filter(hId => hId !== habitId) }))
      })),
      
      updateHabit: (habitId, habitUpdate) => set((state) => ({
        habits: state.habits.map(h => h.id === habitId ? { ...h, ...habitUpdate } : h)
      })),

      toggleHabit: (habitId) => set((state) => ({
        habits: state.habits.map(h => {
          if (h.id === habitId) {
            const completed = !h.completedToday;
            const streak = completed ? h.streak + 1 : (h.streak > 0 ? h.streak -1 : 0);
            return {
              ...h,
              completedToday: completed,
              streak: streak,
              longestStreak: Math.max(h.longestStreak, streak),
              totalCompletions: completed ? h.totalCompletions + 1 : h.totalCompletions,
            };
          }
          return h;
        })
      })),
      
      addRitual: (ritual) => set((state) => ({
        rituals: [...state.rituals, { ...ritual, id: uuidv4(), isActive: false, completedToday: false }]
      })),

      deleteRitual: (ritualId) => set((state) => ({
        rituals: state.rituals.filter(r => r.id !== ritualId)
      })),
      
      updateRitual: (ritualId, ritualUpdate) => set(state => ({
        rituals: state.rituals.map(r => r.id === ritualId ? { ...r, ...ritualUpdate } : r)
      })),

      toggleRitual: (ritualId) => set(state => ({
        rituals: state.rituals.map(r => r.id === ritualId ? { ...r, isActive: !r.isActive } : r)
      }))
    }),
    {
      name: 'galyarder-ritual-storage',
    }
  )
);

export default useRitualStore; 