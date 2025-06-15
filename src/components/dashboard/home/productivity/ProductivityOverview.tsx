
import { Progress } from '@/components/ui/progress';

interface ProductivityOverviewProps {
  score: number;
  label: string;
}

const ProductivityOverview = ({ score, label }: ProductivityOverviewProps) => {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{score}%</div>
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">{label}</div>
      <Progress value={score} className="h-3" />
    </div>
  );
};

export default ProductivityOverview;
