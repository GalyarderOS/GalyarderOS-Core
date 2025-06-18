import React from 'react'
import { TimeBlock } from '../types/timeblock'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TimeBlockCardProps {
  block: TimeBlock
}

export const TimeBlockCard: React.FC<TimeBlockCardProps> = ({ block }) => {
  const startTime = new Date(block.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const endTime = new Date(block.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const isCompleted = block.completed || block.isCompleted

  return (
    <Card className={`h-full ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
      <CardHeader className="p-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm">{block.label}</CardTitle>
        {block.category && (
          <Badge variant="outline" className="text-xs">
            {block.category}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-2">
        <p className="text-xs">
          {startTime} - {endTime}
        </p>
        {isCompleted && (
          <Badge className="mt-2 bg-green-100 text-green-800 text-xs">
            Completed
          </Badge>
        )}
      </CardContent>
    </Card>
  )
} 