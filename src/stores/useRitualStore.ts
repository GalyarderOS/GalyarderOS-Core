import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

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
  duration?: number;
}

type ToastFunc = ReturnType<typeof useToast>['toast'];

interface RitualState {
  rituals: Ritual[];
  habits: Habit[];
  toast: ToastFunc;
  setToast: (toastFn: ToastFunc) => void;
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
      toast: () => {},
      setToast: (toastFn) => set({ toast: toastFn }),
      
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
      
      deleteHabit: (habitId) => {
        const { rituals, habits, toast } = get();
        const habitInUse = rituals.some(r => r.habits.includes(habitId));

        if (habitInUse) {
          const habitName = habits.find(h => h.id === habitId)?.name || 'The habit';
          toast({
            title: "Deletion Failed",
            description: `${habitName} is part of an active ritual and cannot be deleted.`,
            variant: "destructive",
          });
          return;
        }

        set((state) => ({
          habits: state.habits.filter(h => h.id !== habitId),
        }));
        
        toast({
          title: "Habit Deleted",
          description: `The habit has been successfully deleted.`,
        });
      },
      
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