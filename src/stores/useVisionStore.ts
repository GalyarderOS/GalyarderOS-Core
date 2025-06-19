import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

// Sub-interfaces
export interface Milestone {
  id: string;
  name: string;
  completed: boolean;
}

// Main Data Interfaces
export interface Goal {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  milestones: Milestone[];
}

export interface VisionBoardItem {
  id: string;
  title: string;
  imageUrl: string;
  priority: number; // e.g., 1-5
}

export interface VisionStatement {
  title: string;
  description: string;
}

// Store State and Actions
interface VisionState {
  visionStatement: VisionStatement;
  goals: Goal[];
  visionBoardItems: VisionBoardItem[];
  
  // Vision Statement Actions
  updateVisionStatement: (statement: Partial<VisionStatement>) => void;
  
  // Goal Actions
  addGoal: (goal: Omit<Goal, 'id' | 'milestones' | 'status'>) => void;
  updateGoal: (id: string, goal: Partial<Omit<Goal, 'id' | 'milestones'>>) => void;
  deleteGoal: (id: string) => void;
  
  // Milestone Actions
  addMilestone: (goalId: string, milestone: Omit<Milestone, 'id' | 'completed'>) => void;
  updateMilestone: (goalId: string, milestoneId: string, milestone: Partial<Omit<Milestone, 'id'>>) => void;
  deleteMilestone: (goalId: string, milestoneId: string) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;

  // Vision Board Actions
  addBoardItem: (item: Omit<VisionBoardItem, 'id'>) => void;
  updateBoardItem: (id: string, item: Partial<Omit<VisionBoardItem, 'id'>>) => void;
  deleteBoardItem: (id: string) => void;
}

const useVisionStore = create<VisionState>()(
  persist(
    (set, get) => ({
      visionStatement: {
        title: 'My Ultimate Vision',
        description: 'Describe the ultimate future you are working towards...',
      },
      goals: [],
      visionBoardItems: [],

      // Vision Statement Actions
      updateVisionStatement: (statementUpdate) => set((state) => ({
        visionStatement: { ...state.visionStatement, ...statementUpdate }
      })),
      
      // Goal Actions
      addGoal: (goal) => set((state) => ({
        goals: [...state.goals, { ...goal, id: uuidv4(), milestones: [], status: 'not-started' }]
      })),

      updateGoal: (id, goalUpdate) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, ...goalUpdate } : g)
      })),

      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter(g => g.id !== id)
      })),

      // Milestone Actions
      addMilestone: (goalId, milestone) => set(state => ({
        goals: state.goals.map(g => 
          g.id === goalId 
            ? { ...g, milestones: [...g.milestones, { ...milestone, id: uuidv4(), completed: false }] }
            : g
        )
      })),

      updateMilestone: (goalId, milestoneId, milestoneUpdate) => set(state => ({
        goals: state.goals.map(g => 
          g.id === goalId 
            ? { ...g, milestones: g.milestones.map(m => m.id === milestoneId ? { ...m, ...milestoneUpdate } : m) }
            : g
        )
      })),
      
      deleteMilestone: (goalId, milestoneId) => set(state => ({
        goals: state.goals.map(g =>
          g.id === goalId
            ? { ...g, milestones: g.milestones.filter(m => m.id !== milestoneId) }
            : g
        )
      })),

      toggleMilestone: (goalId, milestoneId) => set(state => ({
        goals: state.goals.map(g =>
          g.id === goalId
            ? { ...g, milestones: g.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m) }
            : g
        )
      })),

      // Vision Board Actions
      addBoardItem: (item) => set((state) => ({
        visionBoardItems: [...state.visionBoardItems, { ...item, id: uuidv4() }]
      })),

      updateBoardItem: (id, itemUpdate) => set((state) => ({
        visionBoardItems: state.visionBoardItems.map(item => item.id === id ? { ...item, ...itemUpdate } : item)
      })),

      deleteBoardItem: (id) => set((state) => ({
        visionBoardItems: state.visionBoardItems.filter(item => item.id !== id)
      })),
    }),
    {
      name: 'galyarder-vision-storage',
    }
  )
);

export default useVisionStore; 