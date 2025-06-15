
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface FocusData {
  name: string;
  hours: number;
}

interface ProductivityChartProps {
  data: FocusData[];
  title: string;
}

const ProductivityChart = ({ data, title }: ProductivityChartProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h4>
      <ChartContainer
        config={{
          hours: { label: 'Hours', color: '#8b5cf6' },
        }}
        className="h-32"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" fontSize={10} />
            <YAxis fontSize={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default ProductivityChart;
