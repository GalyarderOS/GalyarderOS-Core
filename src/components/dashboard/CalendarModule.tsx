
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Clock, MapPin } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  location?: string;
  category: 'work' | 'personal' | 'health' | 'social';
}

const CalendarModule = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync and project updates',
      date: new Date(),
      time: '10:00',
      category: 'work'
    },
    {
      id: '2',
      title: 'Workout Session',
      description: 'Morning exercise routine',
      date: new Date(),
      time: '07:00',
      category: 'health'
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    time: '',
    location: '',
    category: 'personal' as Event['category']
  });

  const eventsForSelectedDate = events.filter(event => 
    isSameDay(event.date, selectedDate)
  );

  const getDatesWithEvents = () => {
    return events.map(event => event.date);
  };

  const getCategoryColor = (category: Event['category']) => {
    const colors = {
      work: 'bg-blue-100 text-blue-800 border-blue-200',
      personal: 'bg-green-100 text-green-800 border-green-200',
      health: 'bg-red-100 text-red-800 border-red-200',
      social: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[category];
  };

  const handleSaveEvent = () => {
    if (!newEvent.title.trim()) return;

    const event: Event = {
      id: editingEvent?.id || Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: selectedDate,
      time: newEvent.time,
      location: newEvent.location,
      category: newEvent.category
    };

    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? event : e));
    } else {
      setEvents(prev => [...prev, event]);
    }

    setNewEvent({
      title: '',
      description: '',
      time: '',
      location: '',
      category: 'personal'
    });
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description || '',
      time: event.time || '',
      location: event.location || '',
      category: event.category
    });
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const openNewEventDialog = () => {
    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      time: '',
      location: '',
      category: 'personal'
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 font-playfair">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {format(selectedDate, 'MMMM yyyy')}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openNewEventDialog} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingEvent ? 'Edit Event' : 'Add New Event'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Event title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newEvent.description}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Event description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <select
                            id="category"
                            value={newEvent.category}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value as Event['category'] }))}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background"
                          >
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                            <option value="health">Health</option>
                            <option value="social">Social</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newEvent.location}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Event location"
                        />
                      </div>
                      <Button onClick={handleSaveEvent} className="w-full">
                        {editingEvent ? 'Update Event' : 'Add Event'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className={cn("rounded-md border pointer-events-auto")}
                modifiers={{
                  hasEvents: getDatesWithEvents()
                }}
                modifiersStyles={{
                  hasEvents: { 
                    backgroundColor: 'hsl(var(--primary))', 
                    color: 'hsl(var(--primary-foreground))',
                    borderRadius: '50%'
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Events for Selected Date */}
          <Card>
            <CardHeader>
              <CardTitle>
                Events for {format(selectedDate, 'MMM dd, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {eventsForSelectedDate.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No events for this date
                </p>
              ) : (
                <div className="space-y-3">
                  {eventsForSelectedDate
                    .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
                    .map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-foreground">{event.title}</h3>
                              <Badge className={getCategoryColor(event.category)}>
                                {event.category}
                              </Badge>
                            </div>
                            {event.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {event.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {event.time && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {event.time}
                                </div>
                              )}
                              {event.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditEvent(event)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarModule;
