import { useState } from 'react';
import useVisionStore from '@/stores/useVisionStore';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Edit, Save, Quote, Check } from 'lucide-react';

const VisionStatementSection = () => {
  const { visionStatement, updateVisionStatement } = useVisionStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(visionStatement.title);
  const [editedDescription, setEditedDescription] = useState(visionStatement.description);

  const handleSave = () => {
    updateVisionStatement({ title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(visionStatement.title);
    setEditedDescription(visionStatement.description);
    setIsEditing(false);
  }

  return (
    <Card className="bg-card/50 border-border backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-identity-primary to-identity-secondary rounded-lg flex items-center justify-center shadow-md">
                <Quote className="h-6 w-6 text-white/90" />
            </div>
            <CardTitle className="text-xl">Your Vision Statement</CardTitle>
        </div>
        {!isEditing ? (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
            </Button>
        ) : (
             <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                <Button size="sm" onClick={handleSave}>
                    <Check className="h-4 w-4 mr-2" />
                    Save
                </Button>
            </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-2xl font-bold p-2 h-auto"
            />
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="text-lg text-muted-foreground p-2"
              rows={4}
            />
          </motion.div>
        ) : (
          <motion.div
            key="display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {visionStatement.title}
            </h2>
            <p className="text-lg text-muted-foreground whitespace-pre-line">
              {visionStatement.description}
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisionStatementSection; 