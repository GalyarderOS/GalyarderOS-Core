import React from 'react'
import { TimeBlock } from '../types/timeblock'
import { TimeBlockCard } from './TimeBlockCard'

interface TimelineGridProps {
  blocks: TimeBlock[]
}

const PIXELS_PER_MINUTE = 2; // Controls the vertical scale of the timeline

const getMinutesFromMidnight = (date: Date): number => {
  return date.getHours() * 60 + date.getMinutes()
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({ blocks }) => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)

  return (
    <div className="relative">
      {/* Grid background */}
      <div className="relative grid grid-cols-1">
        {hours.map(hour => (
          <div key={hour} className="flex items-center" style={{ height: `${60 * PIXELS_PER_MINUTE}px` }}>
            <div className="text-xs text-muted-foreground w-12 text-right pr-2">{hour}</div>
            <div className="flex-1 border-t border-dashed"></div>
          </div>
        ))}
      </div>

      {/* Rendered Time Blocks */}
      <div className="absolute top-0 left-12 right-0 h-full">
        {blocks.map(block => {
          const startDate = new Date(block.start)
          const endDate = new Date(block.end)

          const top = getMinutesFromMidnight(startDate) * PIXELS_PER_MINUTE
          const height = (getMinutesFromMidnight(endDate) - getMinutesFromMidnight(startDate)) * PIXELS_PER_MINUTE

          return (
            <div
              key={block.id}
              className="absolute w-full pr-4"
              style={{ top: `${top}px`, height: `${height}px` }}
            >
              <div className="h-full">
                 <TimeBlockCard block={block} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 