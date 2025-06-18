export interface TimeBlock {
  id: string
  start: string // ISO
  end: string // ISO
  label: string
  category?: string
  isCompleted?: boolean
  completed: boolean
} 