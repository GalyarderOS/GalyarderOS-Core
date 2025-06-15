
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
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
  const [identity, setIdentity] = useState({
    fullName: "",
    title: "", 
    mission: "",
    vision: "",
    purpose: ""
  });

  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [characterTraits, setCharacterTraits] = useState<CharacterTrait[]>([]);
  const [saved, setSaved] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  const hasData = identity.fullName || coreValues.length > 0 || characterTraits.length > 0;

  const handleIdentityChange = (field: string, value: string) => {
    setIdentity(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const addCoreValue = () => {
    const newValue: CoreValue = {
      id: Date.now().toString(),
      name: "New Value",
      description: "Describe this core value",
      strength: 0,
      icon: Heart
    };
    setCoreValues([...coreValues, newValue]);
  };

  const addCharacterTrait = () => {
    const newTrait: CharacterTrait = {
      id: Date.now().toString(),
      name: "New Trait",
      level: 0,
      description: "Describe this character trait",
      category: 'growth'
    };
    setCharacterTraits([...characterTraits, newTrait]);
  };

  const identityStrength = identity.fullName && identity.mission ? 85 : 0;

  if (!hasData && !showSetup) {
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
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-playfair">
                Identity Core
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Define and strengthen your authentic self</p>
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
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Identity Clarity Score</p>
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
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                onClick={() => setSaved(true)} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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
                  {/* Core values would be rendered here */}
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
                  {/* Character traits would be rendered here */}
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
