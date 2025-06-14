
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Edit, Save, Plus, X } from 'lucide-react';

const ProfileModule = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    bio: 'Aspiring entrepreneur focused on building meaningful products and personal growth.',
    coreValues: ['Innovation', 'Integrity', 'Growth', 'Impact'],
    mission: 'To create technology that empowers people to achieve their full potential.',
    vision: 'A world where everyone has the tools and mindset to pursue their dreams.'
  });
  const [newValue, setNewValue] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to Supabase
  };

  const addCoreValue = () => {
    if (newValue.trim()) {
      setProfile(prev => ({
        ...prev,
        coreValues: [...prev.coreValues, newValue.trim()]
      }));
      setNewValue('');
    }
  };

  const removeCoreValue = (index: number) => {
    setProfile(prev => ({
      ...prev,
      coreValues: prev.coreValues.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Playfair Display' }}>
            Profile & Ethos
          </h1>
          <p className="text-gray-600">Define who you are and what drives you</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]"
        >
          {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-[#FFD700]" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-lg font-medium">{profile.fullName}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{profile.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Core Values</CardTitle>
              <CardDescription>
                The principles that guide your decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {profile.coreValues.map((value, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {value}
                      {isEditing && (
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => removeCoreValue(index)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="Add a core value"
                      onKeyPress={(e) => e.key === 'Enter' && addCoreValue()}
                    />
                    <Button size="sm" onClick={addCoreValue}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Mission Statement</CardTitle>
              <CardDescription>
                Your purpose and what you aim to achieve
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={profile.mission}
                  onChange={(e) => setProfile(prev => ({ ...prev, mission: e.target.value }))}
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profile.mission}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Vision Statement</CardTitle>
              <CardDescription>
                The future you want to create
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={profile.vision}
                  onChange={(e) => setProfile(prev => ({ ...prev, vision: e.target.value }))}
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profile.vision}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileModule;
