import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Target,
  Flame, 
  Clock, 
  Plus, 
  Check, 
  X,
  Award,
  ChevronRight,
  Play,
  Edit,
  Trash2,
  Zap,
  Sunrise,
  Sun,
  Sunset,
  Moon
} from "lucide-react";
import { ModuleHeader } from "@/components/shared/ModuleHeader";
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
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";


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
    toggleRitual,
  } = useRitualStore();

  const [newHabit, setNewHabit] = useState<Omit<Habit, 'id' | 'streak' | 'longestStreak' | 'completedToday' | 'totalCompletions' | 'createdAt'>>({
    name: '',
    description: '',
    category: 'personal',
    frequency: 'daily',
    targetDays: 365,
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
    setNewHabit({ name: '', description: '', category: 'personal', frequency: 'daily', targetDays: 365, difficulty: 'medium' });
    setAddHabitOpen(false);
    toast({ title: "Habit Added successfully!", description: `You've added "${newHabit.name}".`});
  };

  const handleUpdateHabit = () => {
    if (editingHabit) {
      updateHabit(editingHabit.id, editingHabit);
      setEditingHabit(null);
      toast({ title: "Habit updated!", description: `Changes to "${editingHabit.name}" have been saved.`});
    }
  };
  
  const handleAddRitual = () => {
    if (!newRitual.name.trim() || newRitual.habits.length === 0) {
      toast({
        title: "Validation Error",
        description: "Ritual name and at least one habit are required.",
        variant: "destructive",
      });
      return;
    }
    addRitual(newRitual);
    setNewRitual({ name: "", description: "", timeOfDay: "morning", habits: [] });
    setAddRitualOpen(false);
    toast({ title: "Ritual Added!", description: `Your new ritual "${newRitual.name}" is ready.`});
  };

  const handleUpdateRitual = () => {
    if (editingRitual) {
       const ritualToUpdate = {
        name: editingRitual.name,
        description: editingRitual.description,
        timeOfDay: editingRitual.timeOfDay,
        habits: editingRitual.habits,
      };
      updateRitual(editingRitual.id, ritualToUpdate);
      setEditingRitual(null);
      toast({ title: "Ritual updated!", description: `Changes to "${editingRitual.name}" have been saved.`});
    }
  };

  const getCategoryColor = (category: Habit['category']) => {
    switch (category) {
      case 'health': return 'bg-green-100 text-green-800 border-green-200';
      case 'productivity': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'learning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'social': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'personal':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: Habit['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
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
    habitState: typeof newHabit | Habit, 
    setState: (habit: any) => void
) => (
    <div className="space-y-4 py-4">
        <Input placeholder="Habit Name (e.g., 'Morning Meditation')" value={habitState.name} onChange={(e) => setState({ ...habitState, name: e.target.value })} />
        <Textarea placeholder="Description" value={habitState.description} onChange={(e) => setState({ ...habitState, description: e.target.value })}/>
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
        <div>
            <Label>Difficulty</Label>
            <Select value={habitState.difficulty} onValueChange={(value: Habit['difficulty']) => setState({...habitState, difficulty: value})}>
                <SelectTrigger><SelectValue placeholder="Difficulty" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
);

const renderRitualForm = (
    ritualState: typeof newRitual | Ritual, 
    setState: (ritual: any) => void
) => (
    <div className="space-y-4 py-4">
        <Input placeholder="Ritual Name (e.g., 'Morning Power Up')" value={ritualState.name} onChange={(e) => setState({ ...ritualState, name: e.target.value })} />
        <Textarea placeholder="Description" value={ritualState.description} onChange={(e) => setState({ ...ritualState, description: e.target.value })}/>
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
                            id={`habit-${habit.id}`} 
                            checked={ritualState.habits.includes(habit.id)}
                            onCheckedChange={(checked) => {
                                const newHabitIds = checked 
                                    ? [...ritualState.habits, habit.id]
                                    : ritualState.habits.filter(id => id !== habit.id);
                                setState({ ...ritualState, habits: newHabitIds });
                            }}
                        />
                        <Label htmlFor={`habit-${habit.id}`}>{habit.name}</Label>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

  return (
    <ModuleCard title="Ritual Engine" module="ritual" headerContent={(
        <Dialog open={isAddHabitOpen} onOpenChange={setAddHabitOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Habit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Habit</DialogTitle>
                    <DialogDescription>A habit is a single, repeatable action.</DialogDescription>
                </DialogHeader>
                {renderHabitForm(newHabit, setNewHabit)}
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleAddHabit}>Create Habit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Habits Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold tracking-tight">Habit Tracker</h3>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    <AnimatePresence>
                    {habits.map(habit => (
                        <motion.div 
                            key={habit.id} 
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                            className="bg-background/50 border rounded-lg p-4 space-y-3"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <h4 className="font-semibold">{habit.name}</h4>
                                    <p className="text-sm text-muted-foreground">{habit.description}</p>
                                    <Badge variant="outline" className={getCategoryColor(habit.category)}>{habit.category}</Badge>
                                </div>
                                <Button 
                                    variant={habit.completedToday ? "secondary" : "default"}
                                    size="sm"
                                    onClick={() => toggleHabit(habit.id)}
                                >
                                    {habit.completedToday ? <Check className="mr-2 h-4 w-4" /> : <X className="mr-2 h-4 w-4" />}
                                    {habit.completedToday ? 'Completed' : 'Mark Done'}
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Flame className="w-4 h-4 text-orange-500" />
                                    <span>Streak: {habit.streak} days</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-yellow-500" />
                                    <span>Best: {habit.longestStreak} days</span>
                                </div>
                                <div className={`flex items-center gap-2 font-medium ${getDifficultyColor(habit.difficulty)}`}>
                                    <Zap className="w-4 h-4" />
                                    <span>{habit.difficulty}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                <Dialog open={editingHabit?.id === habit.id} onOpenChange={(isOpen) => !isOpen && setEditingHabit(null)}>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => setEditingHabit(habit)}><Edit className="h-4 w-4"/></Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Edit Habit</DialogTitle></DialogHeader>
                                        {editingHabit && renderHabitForm(editingHabit, setEditingHabit)}
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setEditingHabit(null)}>Cancel</Button>
                                            <Button onClick={handleUpdateHabit}>Save Changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently delete "{habit.name}" and all its data. This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteHabit(habit.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                </div>
                            </div>
                            <Progress value={(habit.totalCompletions / habit.targetDays) * 100} className="h-2" />
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Rituals Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold tracking-tight">Rituals</h3>
                        <Dialog open={isAddRitualOpen} onOpenChange={setAddRitualOpen}>
                        <DialogTrigger asChild>
                            <Button><Plus className="mr-2 h-4 w-4" /> Add Ritual</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Ritual</DialogTitle>
                                <DialogDescription>A ritual is a sequence of habits.</DialogDescription>
                            </DialogHeader>
                            {renderRitualForm(newRitual, setNewRitual)}
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <Button onClick={handleAddRitual}>Create Ritual</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    <AnimatePresence>
                    {rituals.map(ritual => {
                        const totalDuration = ritual.habits.reduce((acc, habitId) => {
                            const habit = getHabitById(habitId);
                            // Assuming each habit takes 15 minutes for now
                            return acc + (habit ? 15 : 0); 
                        }, 0);
                        const completedHabits = ritual.habits.filter(hid => getHabitById(hid)?.completedToday).length;
                        const progress = ritual.habits.length > 0 ? (completedHabits / ritual.habits.length) * 100 : 0;

                        return (
                            <motion.div 
                            key={ritual.id} 
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                            className="bg-background/50 border rounded-lg p-4 space-y-3"
                            >
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {getTimeOfDayIcon(ritual.timeOfDay)}
                                        <h4 className="font-semibold">{ritual.name}</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{ritual.description}</p>
                                </div>
                                <Button 
                                    variant={ritual.isActive ? "secondary" : "default"}
                                    size="sm"
                                    onClick={() => toggleRitual(ritual.id)}
                                >
                                    <Play className="mr-2 h-4 w-4" />
                                    {ritual.isActive ? 'Active' : 'Start'}
                                </Button>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                {ritual.habits.map(habitId => {
                                const habit = getHabitById(habitId);
                                if (!habit) return null;
                                return (
                                    <div key={habit.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-background hover:bg-muted/50">
                                        <div className="flex items-center gap-3">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className={`h-6 w-6 rounded-full ${habit.completedToday ? 'bg-green-500 text-white' : 'border'}`}
                                                onClick={() => toggleHabit(habit.id)}
                                            >
                                                <Check className="h-4 w-4"/>
                                            </Button>
                                            <span>{habit.name}</span>
                                        </div>
                                        <Badge variant="outline" className={getCategoryColor(habit.category)}>{habit.category}</Badge>
                                    </div>
                                )
                                })}
                            </div>
                            <Progress value={progress} className="h-2" />
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm text-muted-foreground">{completedHabits} / {ritual.habits.length} habits completed</span>
                                <div className="flex items-center gap-2">
                                <Dialog open={editingRitual?.id === ritual.id} onOpenChange={(isOpen) => !isOpen && setEditingRitual(null)}>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => setEditingRitual(ritual)}><Edit className="h-4 w-4"/></Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Edit Ritual</DialogTitle></DialogHeader>
                                        {editingRitual && renderRitualForm(editingRitual, setEditingRitual)}
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setEditingRitual(null)}>Cancel</Button>
                                            <Button onClick={handleUpdateRitual}>Save Changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently delete the "{ritual.name}" ritual.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteRitual(ritual.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                </div>
                            </div>
                            </motion.div>
                        )
                    })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    </ModuleCard>
  )
}

export default RitualEngine;