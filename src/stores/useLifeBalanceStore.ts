import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface LifeArea {
  id: string;
  name: string;
  score: number; // 0-100
  color: string;
}

interface LifeBalanceState {
  lifeAreas: LifeArea[];
  hasBeenInitialized: boolean;
  initializeAreas: (areaNames: string[]) => void;
  updateAreaScore: (areaId: string, newScore: number) => void;
  addArea: (areaName: string) => void;
}

const defaultAreas = [
    { id: 'area1', name: 'Health & Fitness', score: 75, color: 'from-green-500 to-emerald-600' },
    { id: 'area2', name: 'Career & Work', score: 80, color: 'from-blue-500 to-indigo-600' },
    { id: 'area3', name: 'Mind & Spirituality', score: 60, color: 'from-purple-500 to-pink-600' },
    { id: 'area4', name: 'Finances', score: 70, color: 'from-yellow-500 to-amber-600' },
    { id: 'area5', name: 'Relationships', score: 85, color: 'from-red-500 to-orange-600' },
    { id: 'area6', name: 'Personal Growth', score: 65, color: 'from-teal-500 to-cyan-600' },
];

const getRandomColor = () => {
    const colors = [
      'from-blue-500 to-indigo-600', 'from-green-500 to-emerald-600', 'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600', 'from-teal-500 to-cyan-600', 'from-yellow-500 to-amber-600'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};


const useLifeBalanceStore = create<LifeBalanceState>()(
  persist(
    (set) => ({
      lifeAreas: [],
      hasBeenInitialized: false,

      initializeAreas: (areaNames) => set({
        lifeAreas: areaNames.map(name => ({
          id: uuidv4(),
          name,
          score: 50,
          color: getRandomColor(),
        })),
        hasBeenInitialized: true,
      }),
      
      updateAreaScore: (areaId, newScore) => set((state) => ({
        lifeAreas: state.lifeAreas.map(area =>
          area.id === areaId ? { ...area, score: Math.max(0, Math.min(100, newScore)) } : area
        )
      })),

      addArea: (areaName) => set((state) => ({
          lifeAreas: [...state.lifeAreas, {
              id: uuidv4(),
              name: areaName,
              score: 50,
              color: getRandomColor(),
          }]
      })),
      
    }),
    {
      name: 'galyarder-life-balance-storage',
       onRehydrateStorage: () => (state) => {
        if (state && state.lifeAreas.length === 0 && !state.hasBeenInitialized) {
          state.lifeAreas = defaultAreas;
          state.hasBeenInitialized = true;
        }
      }
    }
  )
);

export default useLifeBalanceStore; 