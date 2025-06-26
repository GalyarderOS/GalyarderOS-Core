
import { CardHeader, CardTitle } from '@/components/global/ui/card';
import { Badge } from '@/components/global/ui/badge';
import { Brain } from 'lucide-react';

interface ProductivityHeaderProps {
  title: string;
  description: string;
  scoreLabel: string;
  scoreColor: string;
}

const ProductivityHeader = ({ title, description, scoreLabel, scoreColor }: ProductivityHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
          </div>
        </div>
        <Badge className={`${scoreColor} text-white`}>
          {scoreLabel}
        </Badge>
      </div>
    </CardHeader>
  );
};

export default ProductivityHeader;
