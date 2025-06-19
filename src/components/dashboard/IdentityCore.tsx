import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { User, Shield, Zap, Edit, Trash2, Plus, Save } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModuleCard } from '@/components/shared/ModuleCard';
import useIdentityStore from '@/stores/useIdentityStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const IdentityCore = () => {
  const { toast } = useToast();
  const {
    identity,
    coreValues,
    characterStrengths,
    updateIdentity,
    addCoreValue,
    updateCoreValue,
    deleteCoreValue,
    addCharacterStrength,
    updateCharacterStrength,
    deleteCharacterStrength,
  } = useIdentityStore();

  const [isEditingIdentity, setIsEditingIdentity] = useState(false);
  const [localIdentity, setLocalIdentity] = useState(identity);

  const [isAddValueOpen, setAddValueOpen] = useState(false);
  const [isAddTraitOpen, setAddTraitOpen] = useState(false);

  const [newValue, setNewValue] = useState({ value: "", description: "" });
  const [newTrait, setNewTrait] = useState({ trait: "", description: "" });
  
  const [editingValue, setEditingValue] = useState<{ id: string; value: string; description: string } | null>(null);
  const [editingTrait, setEditingTrait] = useState<{ id: string; trait: string; description: string; score: number; } | null>(null);


  const handleIdentitySave = () => {
    updateIdentity(localIdentity);
    setIsEditingIdentity(false);
    toast({ title: "Identity Updated", description: "Your personal mission has been saved." });
  };
  
  const handleAddCoreValue = () => {
    if (!newValue.value.trim()) {
      toast({ title: "Value name cannot be empty.", variant: "destructive" });
      return;
    }
    addCoreValue(newValue);
    setNewValue({ value: "", description: "" });
    setAddValueOpen(false);
    toast({ title: "Core Value Added" });
  };
  
  const handleUpdateCoreValue = () => {
    if (editingValue) {
        updateCoreValue(editingValue.id, { value: editingValue.value, description: editingValue.description });
        setEditingValue(null);
        toast({ title: "Core Value Updated" });
    }
  };

  const handleAddCharacterStrength = () => {
    if (!newTrait.trait.trim()) {
      toast({ title: "Trait name cannot be empty.", variant: "destructive" });
      return;
    }
    addCharacterStrength(newTrait);
    setNewTrait({ trait: "", description: "" });
    setAddTraitOpen(false);
    toast({ title: "Character Trait Added" });
  };
  
  const handleUpdateCharacterStrength = () => {
    if (editingTrait) {
        updateCharacterStrength(editingTrait.id, editingTrait.score);
        setEditingTrait(null);
        toast({ title: "Character Trait Updated" });
    }
  };

  return (
    <ModuleCard title="Identity Core" module="identity">
        <div className="grid md:grid-cols-2 gap-8">
            {/* Core Values Section */}
                <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center"><Shield className="mr-2 h-5 w-5"/> Core Values</h3>
                    <Dialog open={isAddValueOpen} onOpenChange={setAddValueOpen}>
                        <DialogTrigger asChild><Button size="sm"><Plus className="mr-2 h-4 w-4"/>Add</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add a New Core Value</DialogTitle></DialogHeader>
                            <Input value={newValue.value} onChange={e => setNewValue({...newValue, value: e.target.value})} placeholder="Value Name (e.g., Integrity)" />
                            <Textarea value={newValue.description} onChange={e => setNewValue({...newValue, description: e.target.value})} placeholder="What does this value mean to you?" />
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <Button onClick={handleAddCoreValue}>Add Value</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <AnimatePresence>
                {coreValues.map(value => (
                        <motion.div key={value.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="p-3 border rounded-md bg-background hover:bg-muted/50">
                        <div className="flex justify-between items-start">
                  <div>
                                <p className="font-semibold">{value.value}</p>
                                <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                            <div className="flex items-center">
                                <Dialog open={editingValue?.id === value.id} onOpenChange={(isOpen) => !isOpen && setEditingValue(null)}>
                                    <DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => setEditingValue(value)}><Edit className="h-4 w-4"/></Button></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Edit Core Value</DialogTitle></DialogHeader>
                                        <Input value={editingValue?.value} onChange={e => editingValue && setEditingValue({...editingValue, value: e.target.value})} />
                                        <Textarea value={editingValue?.description} onChange={e => editingValue && setEditingValue({...editingValue, description: e.target.value})} />
                                        <DialogFooter><Button variant="outline" onClick={() => setEditingValue(null)}>Cancel</Button><Button onClick={handleUpdateCoreValue}>Save</Button></DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></Button></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader><AlertDialogTitle>Delete "{value.value}"?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => deleteCoreValue(value.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                          </div>
                        </motion.div>
                ))}
                </AnimatePresence>
              </div>

            {/* Character Traits Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center"><Zap className="mr-2 h-5 w-5"/> Character Traits</h3>
                        <Dialog open={isAddTraitOpen} onOpenChange={setAddTraitOpen}>
                        <DialogTrigger asChild><Button size="sm"><Plus className="mr-2 h-4 w-4"/>Add</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add a New Character Trait</DialogTitle></DialogHeader>
                            <Input value={newTrait.trait} onChange={e => setNewTrait({...newTrait, trait: e.target.value})} placeholder="Trait Name (e.g., Discipline)" />
                            <Textarea value={newTrait.description} onChange={e => setNewTrait({...newTrait, description: e.target.value})} placeholder="How do you embody this trait?" />
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <Button onClick={handleAddCharacterStrength}>Add Trait</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                    <AnimatePresence>
                {characterStrengths.map(trait => (
                    <motion.div key={trait.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="p-3 border rounded-md bg-background hover:bg-muted/50">
                            <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold">{trait.trait}</p>
                                <p className="text-sm text-muted-foreground">{trait.description}</p>
                            </div>
                            <div className="flex items-center">
                                <Dialog open={editingTrait?.id === trait.id} onOpenChange={(isOpen) => !isOpen && setEditingTrait(null)}>
                                    <DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => setEditingTrait(trait)}><Edit className="h-4 w-4"/></Button></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Edit Character Trait</DialogTitle></DialogHeader>
                                        <Input value={editingTrait?.trait} onChange={e => editingTrait && setEditingTrait({...editingTrait, trait: e.target.value})} />
                                        <Textarea value={editingTrait?.description} onChange={e => editingTrait && setEditingTrait({...editingTrait, description: e.target.value})} />
                                        <DialogFooter><Button variant="outline" onClick={() => setEditingTrait(null)}>Cancel</Button><Button onClick={handleUpdateCharacterStrength}>Save</Button></DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></Button></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader><AlertDialogTitle>Delete "{trait.trait}"?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => deleteCharacterStrength(trait.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                          </div>
                    </motion.div>
                ))}
                </AnimatePresence>
                  </div>
                </div>
    </ModuleCard>
  );
};

export default IdentityCore;
