import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface IdentityItem {
  id: string;
  text: string;
}

export interface IdentityState {
  coreBeliefs: IdentityItem[];
  values: IdentityItem[];
  principles: IdentityItem[];
  addItem: (type: keyof Omit<IdentityState, 'addItem' | 'updateItem' | 'deleteItem'>, text: string) => void;
  updateItem: (type: keyof Omit<IdentityState, 'addItem' | 'updateItem' | 'deleteItem'>, id: string, text: string) => void;
  deleteItem: (type: keyof Omit<IdentityState, 'addItem' | 'updateItem' | 'deleteItem'>, id: string) => void;
}

export const useIdentityStore = create<IdentityState>((set) => ({
  coreBeliefs: [
    { id: uuidv4(), text: 'Continuous learning is key to growth.' },
    { id: uuidv4(), text: 'Empathy drives meaningful connections.' },
  ],
  values: [
    { id: uuidv4(), text: 'Integrity in all actions.' },
    { id: uuidv4(), text: 'Creativity and innovation.' },
  ],
  principles: [
    { id: uuidv4(), text: 'First, do no harm.' },
    { id: uuidv4(), text: 'Seek to understand, then to be understood.' },
  ],
  addItem: (type, text) =>
    set((state) => ({
      ...state,
      [type]: [...state[type], { id: uuidv4(), text }],
    })),
  updateItem: (type, id, text) =>
    set((state) => ({
      ...state,
      [type]: state[type].map((item) => (item.id === id ? { ...item, text } : item)),
    })),
  deleteItem: (type, id) =>
    set((state) => ({
      ...state,
      [type]: state[type].filter((item) => item.id !== id),
    })),
})); 