import React from 'react'
import { TimeBlock } from '../types/timeblock'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface TimeBlockCardProps {
  block: TimeBlock
}

export const TimeBlockCard: React.FC<TimeBlockCardProps> = ({ block }) => {
  const startTime = new Date(block.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const endTime = new Date(block.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <Card className="h-full">
      <CardHeader className="p-2">
        <CardTitle className="text-sm">{block.label}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <p className="text-xs">
          {startTime} - {endTime}
        </p>
      </CardContent>
    </Card>
  )
} 