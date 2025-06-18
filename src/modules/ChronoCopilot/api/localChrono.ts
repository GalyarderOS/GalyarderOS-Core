// For now, we'll use local storage to persist ChronoCopilot data.
// Later, this will be replaced with a proper backend API.

import { Habit } from '../types/habit'
import { JournalEntry } from '../types/journal'
import { TimeBlock } from '../types/timeblock';

const get = <T>(key: string, defaultValue: T): T => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : defaultValue
  } catch (error) {
    console.error(`Error getting ${key} from local storage`, error)
    return defaultValue
  }
}

const set = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting ${key} in local storage`, error)
  }
}

// Habits
export const getHabits = (): Habit[] => get('chrono_habits', [])
export const saveHabits = (habits: Habit[]) => set('chrono_habits', habits)

// Journal
export const getJournalEntries = (): JournalEntry[] => get('chrono_journal', [])
export const saveJournalEntries = (entries: JournalEntry[]) =>
  set('chrono_journal', entries)

// TimeBlocks
export const getTimeBlocks = (): TimeBlock[] => get('chrono_timeblocks', [])
export const saveTimeBlocks = (blocks: TimeBlock[]) => set('chrono_timeblocks', blocks) 