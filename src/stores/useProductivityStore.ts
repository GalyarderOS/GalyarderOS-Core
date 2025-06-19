import create from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Note {
  id: string;
  content: string;
  tags: string[];
  createdAt: string; // ISO 8601 format
}

export interface FocusSession {
    id: string;
    task: string;
    startTime: string; // ISO 8601 format
    endTime: string; // ISO 8601 format
    duration: number; // in minutes
}

interface ProductivityState {
  notes: Note[];
  focusSessions: FocusSession[];
  
  // Note actions
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  updateNote: (id: string, note: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  deleteNote: (id: string) => void;
  
  // Focus Session actions (placeholder for now)
  addFocusSession: (session: Omit<FocusSession, 'id'>) => void;
}

const useProductivityStore = create<ProductivityState>()(
  persist(
    (set) => ({
      notes: [],
      focusSessions: [],

      // === ACTIONS ===

      // Notes
      addNote: (note) => set((state) => ({
        notes: [{ ...note, id: uuidv4(), createdAt: new Date().toISOString() }, ...state.notes]
      })),
      
      updateNote: (id, noteUpdate) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, ...noteUpdate } : n)
      })),
      
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      })),

      // Focus Sessions
      addFocusSession: (session) => set((state) => ({
        focusSessions: [...state.focusSessions, { ...session, id: uuidv4() }]
      })),
    }),
    {
      name: 'galyarder-productivity-storage',
    }
  )
);

export default useProductivityStore; 