
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/global/ui/chart';
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
      <h4 className="font-semibold text-foreground">{title}</h4>
      <ChartContainer
        config={{
          hours: { label: 'Hours', color: 'hsl(var(--chart-4))' },
        }}
        className="h-32"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis fontSize={10} tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="var(--color-hours)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--color-hours)" }}
              activeDot={{ r: 5, strokeWidth: 1, fill: 'hsl(var(--background))', stroke: 'var(--color-hours)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default ProductivityChart;
