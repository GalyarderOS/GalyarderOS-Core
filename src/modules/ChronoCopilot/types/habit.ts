export interface Habit {
  id: string
  name: string
  // weekly, daily
  frequency: 'daily' | 'weekly'
  // an array of booleans indicating completion
  tracking: boolean[]
} 