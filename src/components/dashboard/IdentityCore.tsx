
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
  Compass, 
  Star,
  Award,
  Shield,
  Flame,
  Zap,
  Crown
} from "lucide-react";

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
    fullName: "Digital Architect",
    title: "Life System Designer", 
    mission: "To build and optimize life systems that create meaningful impact",
    vision: "A world where everyone has the tools to design their ideal life",
    purpose: "Empowering others through systematic life design and conscious living"
  });

  const [coreValues, setCoreValues] = useState<CoreValue[]>([
    { id: '1', name: 'Excellence', description: 'Pursuing mastery in everything I do', strength: 95, icon: Crown },
    { id: '2', name: 'Growth', description: 'Continuous learning and improvement', strength: 88, icon: Zap },
    { id: '3', name: 'Integrity', description: 'Authentic alignment between values and actions', strength: 92, icon: Shield },
    { id: '4', name: 'Impact', description: 'Creating meaningful change in the world', strength: 85, icon: Target },
    { id: '5', name: 'Connection', description: 'Building deep relationships and community', strength: 78, icon: Heart }
  ]);

  const [characterTraits, setCharacterTraits] = useState<CharacterTrait[]>([
    { id: '1', name: 'Strategic Thinking', level: 90, description: 'Systems-level perspective and planning', category: 'strength' },
    { id: '2', name: 'Emotional Intelligence', level: 82, description: 'Understanding and managing emotions', category: 'core' },
    { id: '3', name: 'Resilience', level: 88, description: 'Bouncing back from challenges', category: 'strength' },
    { id: '4', name: 'Creativity', level: 75, description: 'Innovation and original thinking', category: 'growth' },
    { id: '5', name: 'Leadership', level: 80, description: 'Inspiring and guiding others', category: 'growth' },
    { id: '6', name: 'Focus', level: 92, description: 'Deep concentration and attention', category: 'strength' }
  ]);

  const [identityStrength, setIdentityStrength] = useState(87);
  const [saved, setSaved] = useState(false);

  const handleIdentityChange = (field: string, value: string) => {
    setIdentity(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updateValueStrength = (id: string, strength: number) => {
    setCoreValues(prev => prev.map(value => 
      value.id === id ? { ...value, strength } : value
    ));
  };

  const updateTraitLevel = (id: string, level: number) => {
    setCharacterTraits(prev => prev.map(trait =>
      trait.id === id ? { ...trait, level } : trait
    ));
  };

  const getTraitColor = (category: string) => {
    switch(category) {
      case 'strength': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'growth': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'core': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const averageValueStrength = coreValues.reduce((sum, value) => sum + value.strength, 0) / coreValues.length;
  const averageTraitLevel = characterTraits.reduce((sum, trait) => sum + trait.level, 0) / characterTraits.length;

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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Identity Core
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Define and strengthen your authentic self</p>
            </div>
          </div>

          {/* Identity Strength Score */}
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
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Core Values</span>
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  {Math.round(averageValueStrength)}% strength
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {coreValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Card className="bg-slate-50 dark:bg-slate-700/50 border-0">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-800 dark:text-slate-200">{value.name}</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{value.description}</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-slate-600 dark:text-slate-400">Strength</span>
                                  <span className="font-medium">{value.strength}%</span>
                                </div>
                                <Progress value={value.strength} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
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
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  <span>Character Traits</span>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {Math.round(averageTraitLevel)}% developed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characterTraits.map((trait, index) => (
                  <motion.div
                    key={trait.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <Card className="bg-slate-50 dark:bg-slate-700/50 border-0 h-full">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-slate-800 dark:text-slate-200">{trait.name}</h4>
                            <Badge className={getTraitColor(trait.category)}>
                              {trait.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{trait.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">Development</span>
                              <span className="font-medium">{trait.level}%</span>
                            </div>
                            <Progress value={trait.level} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Identity Card Preview */}
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
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-purple-100"><strong>Mission:</strong> {identity.mission}</p>
                    <p className="text-sm text-purple-100"><strong>Vision:</strong> {identity.vision}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {coreValues.slice(0, 5).map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.id} className="text-center">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-xs text-purple-100">{value.name}</p>
                    </div>
                  );
                })}
              </div>

              <div className="text-center text-sm text-purple-100">
                Identity Strength: {identityStrength}% • Values Alignment: {Math.round(averageValueStrength)}% • Character Development: {Math.round(averageTraitLevel)}%
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default IdentityCore;
