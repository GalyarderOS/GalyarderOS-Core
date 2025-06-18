import { TimeBlock } from '../types/timeblock'

export const sampleTimeBlocks: TimeBlock[] = [
  {
    id: '1',
    start: new Date().toISOString(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    label: 'Deep Work Session',
    completed: false,
    isCompleted: false,
    category: 'Work'
  },
  {
    id: '2',
    start: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
    end: new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toISOString(),
    label: 'Team Meeting',
    completed: false,
    isCompleted: false,
    category: 'Work'
  },
] 