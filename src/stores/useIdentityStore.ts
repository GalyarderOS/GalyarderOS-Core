import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Identity {
    name: string;
    mission: string;
    archetype: string;
}

export interface CoreValue {
  id: string;
  value: string;
  description: string;
  alignment: number; // 0-100
}

export interface CharacterTrait {
  id: string;
  trait: string;
  description: string;
  score: number; // 0-100
}

interface IdentityState {
  identity: Identity;
  coreValues: CoreValue[];
  characterStrengths: CharacterTrait[];
  updateIdentity: (identity: Partial<Identity>) => void;
  addCoreValue: (value: Omit<CoreValue, 'id' | 'alignment'>) => void;
  updateCoreValue: (id: string, value: Partial<Omit<CoreValue, 'id' | 'alignment'>>) => void;
  deleteCoreValue: (id: string) => void;
  addCharacterStrength: (strength: Omit<CharacterTrait, 'id' | 'score'>) => void;
  updateCharacterStrength: (id: string, score: number) => void;
  deleteCharacterStrength: (id: string) => void;
}

const useIdentityStore = create<IdentityState>()(
  persist(
    (set, get) => ({
      identity: {
        name: 'New User',
        mission: 'Define your personal mission statement.',
        archetype: 'The Explorer',
      },
      coreValues: [],
      characterStrengths: [],

      updateIdentity: (identity) => set((state) => ({
        identity: { ...state.identity, ...identity }
      })),

      addCoreValue: (value) =>
        set((state) => ({
          coreValues: [...state.coreValues, { ...value, id: uuidv4(), alignment: 50 }],
        })),

      updateCoreValue: (id, updatedValue) =>
        set((state) => ({
          coreValues: state.coreValues.map((value) =>
            value.id === id ? { ...value, ...updatedValue } : value
          ),
        })),
      
      deleteCoreValue: (id) => set((state) => ({
        coreValues: state.coreValues.filter(v => v.id !== id)
      })),

      addCharacterStrength: (strength) =>
        set((state) => ({
          characterStrengths: [...state.characterStrengths, { ...strength, id: uuidv4(), score: 50 }],
        })),

      updateCharacterStrength: (id, score) =>
        set((state) => ({
          characterStrengths: state.characterStrengths.map((strength) =>
            strength.id === id ? { ...strength, score } : strength
          ),
        })),

      deleteCharacterStrength: (id) => set((state) => ({
        characterStrengths: state.characterStrengths.filter((s) => s.id !== id)
      })),
    }),
    {
      name: 'galyarder-identity-storage',
    }
  )
);

export default useIdentityStore; 