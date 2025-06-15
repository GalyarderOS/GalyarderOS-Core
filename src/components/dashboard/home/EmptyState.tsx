
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  gradient?: string;
}

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  gradient = "from-blue-500 to-purple-600"
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="max-w-md mx-auto text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur border-0 shadow-lg">
        <CardContent className="p-8">
          <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 font-playfair">{title}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>
          <Button 
            onClick={onAction}
            className={`bg-gradient-to-r ${gradient} hover:opacity-90 text-white`}
          >
            {actionLabel}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyState;
