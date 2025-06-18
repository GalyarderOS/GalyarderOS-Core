
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  User, 
  Heart, 
  Target, 
  Sparkles, 
  Brain, 
  Crown,
  Zap,
  Shield,
  Award, 
  Edit,
  Trash2,
  Plus
} from "lucide-react";
import EmptyState from "./home/EmptyState";

interface CoreValue {
  id: string;
  name: string;
  description: string;
  strength: number;
  icon: any;
}

interface CharacterTrait {
  id: string;
  name: string;
  level: number;
  description: string;
  category: 'strength' | 'growth' | 'core';
}

const IdentityCore = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const [identity, setIdentity] = useState<{
    fullName: string;
    title: string;
    mission: string;
    vision: string;
    purpose: string;
  }>({
    fullName: "",
    title: "", 
    mission: "",
    vision: "",
    purpose: ""
  });

  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [characterTraits, setCharacterTraits] = useState<CharacterTrait[]>([]);
  const [saved, setSaved] = useState(false);
  const [editingValueId, setEditingValueId] = useState<string | null>(null);
  const [editingTraitId, setEditingTraitId] = useState<string | null>(null);
  const [newValueName, setNewValueName] = useState("");
  const [newValueDescription, setNewValueDescription] = useState("");
  const [newTraitName, setNewTraitName] = useState("");
  const [newTraitDescription, setNewTraitDescription] = useState("");
  const [newTraitCategory, setNewTraitCategory] = useState<CharacterTrait['category']>('growth');

  const hasData = identity.fullName || coreValues.length > 0 || characterTraits.length > 0;

  // Load saved identity data on component mount
  useEffect(() => {
    setLoading(true);
    
    // Load identity data from localStorage
    const savedIdentity = localStorage.getItem('identity-core-data');
    if (savedIdentity) {
      try {
        const parsedData = JSON.parse(savedIdentity);
        setIdentity(parsedData.identity || identity);
        setCoreValues(parsedData.coreValues || []);
        setCharacterTraits(parsedData.characterTraits || []);
        setSaved(true);
      } catch (error) {
        console.error('Error parsing saved identity data:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const handleIdentityChange = (field: string, value: string) => {
    setIdentity(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const addCoreValue = () => {
    const newValue: CoreValue = {
      id: Date.now().toString(), 
      name: newValueName || "New Value",
      description: newValueDescription || "Describe this core value",
      strength: 50,
      icon: Heart
    };
    setCoreValues(prev => [...prev, newValue]);
    setNewValueName("");
    setNewValueDescription("");
    setSaved(false);
  };

  const updateCoreValue = (id: string, updates: Partial<CoreValue>) => {
    setCoreValues(prev => 
      prev.map(value => value.id === id ? { ...value, ...updates } : value)
    );
    setEditingValueId(null);
    setSaved(false);
  };

  const deleteCoreValue = (id: string) => {
    setCoreValues(prev => prev.filter(value => value.id !== id));
    setSaved(false);
  };

  const addCharacterTrait = () => {
    const newTrait: CharacterTrait = {
      id: Date.now().toString(),
      name: newTraitName || "New Trait",
      level: 50,
      description: newTraitDescription || "Describe this character trait",
      category: newTraitCategory
    };
    setCharacterTraits(prev => [...prev, newTrait]);
    setNewTraitName("");
    setNewTraitDescription("");
    setSaved(false);
  };

  const updateCharacterTrait = (id: string, updates: Partial<CharacterTrait>) => {
    setCharacterTraits(prev => 
      prev.map(trait => trait.id === id ? { ...trait, ...updates } : trait)
    );
    setEditingTraitId(null);
    setSaved(false);
  };

  const deleteCharacterTrait = (id: string) => {
    setCharacterTraits(prev => prev.filter(trait => trait.id !== id));
    setSaved(false);
  };

  const saveIdentityData = () => {
    try {
      const dataToSave = {
        identity,
        coreValues,
        characterTraits,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('identity-core-data', JSON.stringify(dataToSave));
      setSaved(true);
      toast({
        title: "Identity saved",
        description: "Your identity core has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving identity data:', error);
      toast({
        title: "Error saving",
        description: "There was a problem saving your identity data.",
        variant: "destructive"
      });
    }
  };

  const identityStrength = identity.fullName && identity.mission ? 85 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasData && !showSetup && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-6xl mx-auto p-6">
          <EmptyState
            icon={User}
            title="Define Your Identity Core"
            description="Start building your authentic self by defining your core identity, values, and life mission. This is the foundation of your personal operating system."
            actionLabel="Start Identity Setup"
            onAction={() => setShowSetup(true)}
            gradient="from-purple-600 to-blue-600"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <AnimatePresence>
        {showSetup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <Card className="max-w-2xl w-full">
              <CardHeader>
                <CardTitle>Identity Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input 
                    value={identity.fullName}
                    onChange={(e) => handleIdentityChange('fullName', e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Professional Title</label>
                  <Input 
                    value={identity.title}
                    onChange={(e) => handleIdentityChange('title', e.target.value)}
                    placeholder="e.g., Digital Architect, Life Designer"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Life Mission</label>
                  <Textarea 
                    value={identity.mission}
                    onChange={(e) => handleIdentityChange('mission', e.target.value)}
                    placeholder="What is your life's mission?"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowSetup(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      saveIdentityData();
                      setShowSetup(false);
                    }}
                  >
                    Save & Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-playfair">
                Identity Core
              </h1>
              <p className="text-muted-foreground">Define and strengthen your authentic self</p>
            </div>
          </div>

          {/* Identity Strength Score */}
          {identityStrength > 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto"
            >
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{identityStrength}%</div>
                  <p className="text-sm text-muted-foreground mb-3">Identity Clarity Score</p>
                  <Progress value={identityStrength} className="h-2" />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Core Identity Definition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span>Core Identity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      value={identity.fullName}
                      onChange={(e) => handleIdentityChange('fullName', e.target.value)}
                      className="bg-white/50 dark:bg-slate-700/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Professional Title
                    </label>
                    <Input
                      value={identity.title}
                      onChange={(e) => handleIdentityChange('title', e.target.value)}
                      className="bg-white/50 dark:bg-slate-700/50"
                      placeholder="e.g., Digital Architect, Life Designer"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Life Mission
                    </label>
                    <Textarea
                      value={identity.mission}
                      onChange={(e) => handleIdentityChange('mission', e.target.value)}
                      className="bg-white/50 dark:bg-slate-700/50 min-h-[80px]"
                      placeholder="What is your life's mission?"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Vision Statement
                  </label>
                  <Textarea
                    value={identity.vision}
                    onChange={(e) => handleIdentityChange('vision', e.target.value)}
                    className="bg-white/50 dark:bg-slate-700/50 min-h-[60px]"
                    placeholder="What future do you envision?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Life Purpose
                  </label>
                  <Textarea
                    value={identity.purpose}
                    onChange={(e) => handleIdentityChange('purpose', e.target.value)}
                    className="bg-white/50 dark:bg-slate-700/50 min-h-[60px]"
                    placeholder="What is your deeper purpose?"
                  />
                </div>
              </div>

              <Button
                onClick={saveIdentityData} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Identity Core
              </Button>

              {saved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <Badge className="bg-green-100 text-green-800">Identity Saved Successfully!</Badge>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Core Values System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Core Values</span> 
                </CardTitle>
                <Button onClick={addCoreValue} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Value
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {coreValues.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No core values defined yet</p>
                  <p className="text-sm text-muted-foreground">Add your first core value to get started</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {coreValues.map((value) => (
                    <Card key={value.id} className="bg-white/50 dark:bg-slate-700/50 border-0">
                      <CardContent className="p-4">
                        {editingValueId === value.id ? (
                          <div className="space-y-3">
                            <Input
                              value={value.name}
                              onChange={(e) => updateCoreValue(value.id, { name: e.target.value })}
                              placeholder="Value name"
                              className="mb-2"
                            />
                            <Textarea
                              value={value.description}
                              onChange={(e) => updateCoreValue(value.id, { description: e.target.value })}
                              placeholder="Value description"
                              className="mb-2"
                            />
                            <div className="space-y-1">
                              <label className="text-xs">Strength: {value.strength}%</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={value.strength}
                                onChange={(e) => updateCoreValue(value.id, { strength: parseInt(e.target.value) })}
                                className="w-full"
                              />
                            </div>
                            <div className="flex justify-end space-x-2 mt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setEditingValueId(null)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => setEditingValueId(null)}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg">{value.name}</h3>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm" onClick={() => setEditingValueId(value.id)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteCoreValue(value.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{value.description}</p>
                            <Progress value={value.strength} className="h-2" />
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Character Traits Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  <span>Character Traits</span>
                </CardTitle>
                <Button onClick={addCharacterTrait} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Trait
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {characterTraits.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No character traits defined yet</p>
                  <p className="text-sm text-muted-foreground">Add your first character trait to get started</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {characterTraits.map((trait) => (
                    <Card key={trait.id} className="bg-white/50 dark:bg-slate-700/50 border-0">
                      <CardContent className="p-4">
                        {editingTraitId === trait.id ? (
                          <div className="space-y-3">
                            <Input
                              value={trait.name}
                              onChange={(e) => updateCharacterTrait(trait.id, { name: e.target.value })}
                              placeholder="Trait name"
                              className="mb-2"
                            />
                            <Textarea
                              value={trait.description}
                              onChange={(e) => updateCharacterTrait(trait.id, { description: e.target.value })}
                              placeholder="Trait description"
                              className="mb-2"
                            />
                            <div className="space-y-1">
                              <label className="text-xs">Level: {trait.level}%</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={trait.level}
                                onChange={(e) => updateCharacterTrait(trait.id, { level: parseInt(e.target.value) })}
                                className="w-full"
                              />
                            </div>
                            <div className="flex justify-end space-x-2 mt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setEditingTraitId(null)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => setEditingTraitId(null)}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{trait.name}</h3>
                                <Badge>{trait.category}</Badge>
                              </div>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm" onClick={() => setEditingTraitId(trait.id)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteCharacterTrait(trait.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{trait.description}</p>
                            <Progress value={trait.level} className="h-2" />
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Identity Card Preview - Only show if there's data */}
        {identity.fullName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-purple-600 to-blue-600 border-0 shadow-xl text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Digital Identity Card</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{identity.fullName}</h3>
                    <p className="text-purple-100">{identity.title}</p>
                    {identity.mission && (
                      <div className="mt-2">
                        <p className="text-sm text-purple-100"><strong>Mission:</strong> {identity.mission}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center text-sm text-purple-100">
                  Identity Strength: {identityStrength}%
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default IdentityCore;
