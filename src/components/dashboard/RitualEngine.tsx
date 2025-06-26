import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Flame,
  Plus,
  Check,
  Edit,
  Trash2,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  ChevronRight
} from "lucide-react";
import { ModuleCard } from '@/components/shared/ModuleCard';
import { useToast } from "@/components/ui/use-toast";
import useRitualStore, {Habit, Ritual } from "@/stores/useRitualStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Goal } from '@/stores/useVisionStore';

type EditableHabit = Omit<Habit, 'id' | 'streak' | 'longestStreak' | 'completedToday' | 'totalCompletions' | 'createdAt'>;
type HabitState = Habit | EditableHabit;
type EditableRitual = Omit<Ritual, 'id' | 'isActive' | 'completedToday' | 'duration'>;
type RitualState = Ritual | EditableRitual;

const RitualEngine = () => {
  const { toast } = useToast();

  const {
    rituals,
    habits,
    toggleHabit,
    addHabit,
    deleteHabit,
    updateHabit,
    addRitual,
    deleteRitual,
    updateRitual,
    setToast,
  } = useRitualStore();

  const [newHabit, setNewHabit] = useState<Omit<Habit, 'id' | 'streak' | 'longestStreak' | 'completedToday' | 'totalCompletions' | 'createdAt'>>({
    name: '',
    description: '',
    category: 'personal',
    frequency: 'daily',
    targetDays: 30,
    difficulty: 'medium'
  });
  
  const [newRitual, setNewRitual] = useState<Omit<Ritual, 'id' | 'isActive' | 'completedToday' | 'duration'>>({
    name: "",
    description: "",
    timeOfDay: "morning",
    habits: [],
  });
  
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [editingRitual, setEditingRitual] = useState<Ritual | null>(null);
  const [isAddHabitOpen, setAddHabitOpen] = useState(false);
  const [isAddRitualOpen, setAddRitualOpen] = useState(false);

  const handleAddHabit = () => {
    if (!newHabit.name.trim()) {
       toast({ title: "Habit name cannot be empty.", variant: "destructive" });
      return;
    }
    addHabit(newHabit);
    setNewHabit({ name: '', description: '', category: 'personal', frequency: 'daily', targetDays: 30, difficulty: 'medium' });
    setAddHabitOpen(false);
  };

  const handleAddRitual = () => {
    if (!newRitual.name.trim()) {
       toast({ title: "Ritual name cannot be empty.", variant: "destructive" });
      return;
    }
    addRitual(newRitual);
    setNewRitual({ name: "", description: "", timeOfDay: "morning", habits: [] });
    setAddRitualOpen(false);
  };

  const handleUpdateHabit = () => {
    if (editingHabit) {
      updateHabit(editingHabit.id, editingHabit);
      setEditingHabit(null);
    }
  };
  
  const handleUpdateRitual = () => {
    if (editingRitual) {
      updateRitual(editingRitual.id, editingRitual);
      setEditingRitual(null);
    }
  };

  const getTimeOfDayIcon = (timeOfDay: Ritual['timeOfDay']) => {
    switch (timeOfDay) {
      case 'morning': return <Sunrise className="w-5 h-5 text-yellow-500" />;
      case 'afternoon': return <Sun className="w-5 h-5 text-blue-500" />;
      case 'evening': return <Sunset className="w-5 h-5 text-purple-500" />;
      case 'night': return <Moon className="w-5 h-5 text-indigo-500" />;
      default: return null;
    }
  };
  
  const getHabitById = (id: string) => habits.find(h => h.id === id);

  const renderHabitForm = (
    habitState: HabitState, 
    setState: (habit: HabitState) => void
  ) => (
    <div className="space-y-4 py-4">
        <Input placeholder="Habit Name" value={habitState.name} onChange={(e) => setState({ ...habitState, name: e.target.value })} />
        <Textarea placeholder="Description" value={habitState.description || ''} onChange={(e) => setState({ ...habitState, description: e.target.value })}/>
        <div className="grid grid-cols-2 gap-4">
            <Select value={habitState.category} onValueChange={(value: Habit['category']) => setState({...habitState, category: value})}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
            </Select>
            <Select value={habitState.frequency} onValueChange={(value: Habit['frequency']) => setState({...habitState, frequency: value})}>
                <SelectTrigger><SelectValue placeholder="Frequency" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <Select value={'difficulty' in habitState ? habitState.difficulty : 'medium'} onValueChange={(value: Habit['difficulty']) => setState({...habitState, difficulty: value})}>
                <SelectTrigger><SelectValue placeholder="Difficulty" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
            </Select>
             <div>
                <Input type="number" placeholder="e.g., 30" value={'targetDays' in habitState ? habitState.targetDays : 30} onChange={(e) => setState({ ...habitState, targetDays: parseInt(e.target.value, 10) || 0 })} />
            </div>
        </div>
    </div>
  );

  const renderRitualForm = (
      ritualState: RitualState, 
      setState: (ritual: RitualState) => void
  ) => (
      <div className="space-y-4 py-4">
          <Input placeholder="Ritual Name" value={ritualState.name} onChange={(e) => setState({ ...ritualState, name: e.target.value })} />
          <Textarea placeholder="Description" value={ritualState.description || ''} onChange={(e) => setState({ ...ritualState, description: e.target.value })}/>
          <Select value={ritualState.timeOfDay} onValueChange={(value: Ritual['timeOfDay']) => setState({...ritualState, timeOfDay: value})}>
              <SelectTrigger><SelectValue placeholder="Time of Day" /></SelectTrigger>
              <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
              </SelectContent>
          </Select>
          <div className="space-y-2">
              <Label>Select Habits</Label>
              <div className="max-h-40 overflow-y-auto rounded-md border p-2 space-y-2">
                  {habits.map(habit => (
                      <div key={habit.id} className="flex items-center space-x-2">
                          <Checkbox 
                              id={`ritual-habit-${habit.id}`}
                              checked={(ritualState.habits || []).includes(habit.id)}
                              onCheckedChange={(checked) => {
                                  const currentHabits = ritualState.habits || [];
                                  const newHabitIds = checked 
                                      ? [...currentHabits, habit.id]
                                      : currentHabits.filter(id => id !== habit.id);
                                  setState({ ...ritualState, habits: newHabitIds });
                              }}
                          />
                          <Label htmlFor={`ritual-habit-${habit.id}`}>{habit.name}</Label>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );

  return (
    <ModuleCard 
        module="ritual"
        title="Ritual Engine" 
        subtitle="Forge the habits that define your success." 
        icon={<Flame className="w-5 h-5" />}
        headerContent={
          <div className="flex items-center gap-2">
            <Dialog open={isAddHabitOpen} onOpenChange={setAddHabitOpen}>
              <DialogTrigger asChild><Button size="sm" variant="outline"><Plus className="mr-2 h-4 w-4" /> New Habit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create a New Habit</DialogTitle></DialogHeader>
                {renderHabitForm(newHabit, setNewHabit)}
                <DialogFooter><Button onClick={handleAddHabit}>Add Habit</Button></DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddRitualOpen} onOpenChange={setAddRitualOpen}>
              <DialogTrigger asChild><Button size="sm"><Plus className="mr-2 h-4 w-4" /> New Ritual</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create a New Ritual</DialogTitle></DialogHeader>
                {renderRitualForm(newRitual, setNewRitual)}
                <DialogFooter><Button onClick={handleAddRitual}>Add Ritual</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
    >
      <div className="p-1 space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold px-2">Your Rituals</h3>
          {rituals.length === 0 ? (
             <p className="text-muted-foreground text-sm text-center py-4">No rituals defined yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {rituals.map(ritual => {
                  const habitDetails = (ritual.habits || []).map(getHabitById).filter(Boolean) as Habit[];
                  const completedHabits = habitDetails.filter(h => h.completedToday).length;
                  const totalHabits = habitDetails.length;
                  const progress = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
                
                  return (
                    <Collapsible key={ritual.id} className="group">
                      <div className="bg-card/50 p-4 rounded-lg border border-border/60">
                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                  {getTimeOfDayIcon(ritual.timeOfDay)}
                                  <h4 className="font-semibold">{ritual.name}</h4>
                              </div>
                              <div className="flex items-center gap-1">
                                  <Dialog onOpenChange={(open) => !open && setEditingRitual(null)}>
                                      <DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => setEditingRitual(JSON.parse(JSON.stringify(ritual)))}><Edit className="h-4 w-4"/></Button></DialogTrigger>
                                      <DialogContent>
                                          <DialogHeader><DialogTitle>Edit Ritual</DialogTitle></DialogHeader>
                                          {editingRitual && renderRitualForm(editingRitual, setEditingRitual)}
                                          <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleUpdateRitual}>Save Changes</Button></DialogFooter>
                                      </DialogContent>
                                  </Dialog>
                                   <AlertDialog>
                                    <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500/80"/></Button></AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader><AlertDialogTitle>Delete {ritual.name}?</AlertDialogTitle><AlertDialogDescription>This action is permanent.</AlertDialogDescription></AlertDialogHeader>
                                      <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => deleteRitual(ritual.id)}>Continue</AlertDialogAction></AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                  <CollapsibleTrigger asChild><Button variant="ghost" size="icon"><ChevronRight className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-90" /></Button></CollapsibleTrigger>
                              </div>
                          </div>
                          <div className="mt-3">
                              <div className="flex justify-between items-center mb-1"><span className="text-xs font-semibold text-muted-foreground">PROGRESS</span><span className="text-xs font-bold">{completedHabits} / {totalHabits}</span></div>
                              <Progress value={progress} className="h-2"/>
                          </div>
                      </div>
                      <CollapsibleContent className="p-4 bg-muted/40 rounded-b-lg border border-t-0 border-border/60">
                         <div className="space-y-3">
                          {habitDetails.map(habit => (
                            <div key={habit.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <motion.button whileTap={{ scale: 0.9 }}>
                                  <Check className={`w-6 h-6 p-1 rounded-full cursor-pointer transition-all ${habit.completedToday ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`} onClick={() => toggleHabit(habit.id)}/>
                                </motion.button>
                                <span className="text-sm">{habit.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )
              })}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
           <h3 className="font-semibold px-2">Habit Library</h3>
           {habits.length === 0 ? (
             <p className="text-muted-foreground text-sm text-center py-4">No habits defined yet.</p>
           ) : (
            <div className="space-y-2">
                {habits.map(habit => (
                    <div key={habit.id} className="bg-card/50 p-3 rounded-lg border border-border/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.button whileTap={{ scale: 0.9 }}>
                                <Check className={`w-6 h-6 p-1 rounded-full cursor-pointer transition-all ${habit.completedToday ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`} onClick={() => toggleHabit(habit.id)} />
                            </motion.button>
                            <div><h4 className="font-semibold">{habit.name}</h4></div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Dialog onOpenChange={(open) => !open && setEditingHabit(null)}>
                            <DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => setEditingHabit(JSON.parse(JSON.stringify(habit)))}><Edit className="h-4 w-4"/></Button></DialogTrigger>
                             <DialogContent>
                                <DialogHeader><DialogTitle>Edit Habit</DialogTitle></DialogHeader>
                                {editingHabit && renderHabitForm(editingHabit, setEditingHabit)}
                                <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleUpdateHabit}>Save Changes</Button></DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500/80"/></Button></AlertDialogTrigger>
                             <AlertDialogContent>
                              <AlertDialogHeader><AlertDialogTitle>Delete {habit.name}?</AlertDialogTitle><AlertDialogDescription>This will permanently delete this habit and cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                              <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => deleteHabit(habit.id)}>Continue</AlertDialogAction></AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>
           )}
        </div>
      </div>
    </ModuleCard>
  );
};

export default RitualEngine;