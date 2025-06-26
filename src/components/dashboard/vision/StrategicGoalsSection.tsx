import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Plus, ChevronDown, ChevronRight, Target } from 'lucide-react';
import { Goal, Milestone } from '@/stores/useVisionStore';
import useVisionStore from '@/stores/useVisionStore'; // Keep for milestone actions

interface GoalItemProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onToggleMilestone: (goalId: string, milestoneId: string) => void;
}

const GoalItem = ({ goal, onEdit, onDelete, onToggleMilestone }: GoalItemProps) => {
  const { addMilestone, deleteMilestone } = useVisionStore(); // Still need this for adding/deleting milestones
  const [isExpanded, setIsExpanded] = useState(false);
  const [newMilestone, setNewMilestone] = useState('');

  const milestones = goal.milestones || [];
  const completedMilestones = milestones.filter(m => m.completed).length;
  const progress = milestones.length > 0 ? (completedMilestones / milestones.length) * 100 : 0;

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      addMilestone(goal.id, { name: newMilestone });
      setNewMilestone('');
    }
  };
  
  const getStatusVariant = (status: Goal['status']): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" => {
    if (status === 'completed') return 'success';
    if (status === 'in-progress') return 'warning';
    return 'secondary';
  }

  return (
    <Card className="bg-card/60 border-border">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
            <div className="space-y-1">
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                <CardDescription>{goal.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={getStatusVariant(goal.status)}>{goal.status.replace('-', ' ')}</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(goal)}><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => onDelete(goal.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Progress</span>
                <Progress value={progress} className="flex-1 h-2" />
                <span>{Math.round(progress)}%</span>
            </div>

            <Button variant="link" size="sm" className="p-0 h-auto text-sm" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                {milestones.length} Milestones
            </Button>

            <AnimatePresence>
            {isExpanded && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 space-y-2"
                >
                    {milestones.map(milestone => (
                        <div key={milestone.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-2">
                                <Checkbox id={`m-${milestone.id}`} checked={milestone.completed} onCheckedChange={() => onToggleMilestone(goal.id, milestone.id)} />
                                <label htmlFor={`m-${milestone.id}`} className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{milestone.name}</label>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => deleteMilestone(goal.id, milestone.id)}>
                                <Trash2 className="h-3 w-3"/>
                            </Button>
                        </div>
                    ))}
                    <div className="flex items-center gap-2 pt-2">
                        <Input value={newMilestone} onChange={(e) => setNewMilestone(e.target.value)} placeholder="Add new milestone" className="h-8" />
                        <Button size="sm" onClick={handleAddMilestone}><Plus className="h-4 w-4" /></Button>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

interface StrategicGoalsSectionProps {
    goals: Goal[];
    onAddNew: () => void;
    onEdit: (goal: Goal) => void;
    onDelete: (id: string) => void;
    onToggleMilestone: (goalId: string, milestoneId: string) => void;
}

const StrategicGoalsSection = ({ goals = [], onAddNew, onEdit, onDelete, onToggleMilestone }: StrategicGoalsSectionProps) => {
  return (
    <Card className="bg-card/50 border-border backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-vision-primary to-vision-secondary rounded-lg flex items-center justify-center shadow-md">
                    <Target className="h-6 w-6 text-white/90" />
                </div>
                <div>
                    <CardTitle className="text-xl">Strategic Goals</CardTitle>
                    <CardDescription>The milestones on your path to greatness.</CardDescription>
                </div>
            </div>
            <Button onClick={onAddNew}>
                <Plus className="mr-2 h-4 w-4" /> New Goal
            </Button>
        </CardHeader>
        <CardContent>
            {goals.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground">No Strategic Goals Yet</h3>
                    <p className="text-muted-foreground mt-1">Click "New Goal" to add your first objective.</p>
                </div>
            ) : (
                <div className="space-y-4">
                {goals.map(goal => (
                    <GoalItem 
                        key={goal.id} 
                        goal={goal} 
                        onEdit={onEdit} 
                        onDelete={onDelete}
                        onToggleMilestone={onToggleMilestone}
                    />
                ))}
                </div>
            )}
        </CardContent>
    </Card>
  );
};

export default StrategicGoalsSection; 