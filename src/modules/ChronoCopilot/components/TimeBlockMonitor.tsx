import React from 'react'
import { useChronoLogic } from '../hooks/useChronoLogic'
import { TimeBlockCard } from './TimeBlockCard'
import { TimelineGrid } from './TimelineGrid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreateTimeBlockDialog } from './CreateTimeBlockDialog'

export function TimeBlockMonitor() {
  const { todaysBlocks, addTimeBlock } = useChronoLogic()

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Today's Time Blocks</h1>
        <CreateTimeBlockDialog onAddBlock={addTimeBlock} />
      </div>
      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          {todaysBlocks.length > 0 ? (
            <div>
              {todaysBlocks.map(block => (
                <TimeBlockCard key={block.id} block={block} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No time blocks scheduled for today.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="timeline">
          <TimelineGrid blocks={todaysBlocks} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TimeBlockMonitor 