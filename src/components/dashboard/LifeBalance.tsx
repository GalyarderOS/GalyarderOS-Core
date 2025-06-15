
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const METRICS = [
  { name: "Sleep", key: "sleep", max: 8 },
  { name: "Exercise", key: "exercise", max: 90 },
  { name: "Nutrition", key: "nutrition", max: 3 },
  { name: "Social", key: "social", max: 5 },
  { name: "Focus", key: "focus", max: 8 },
];

function getScore(metrics: Record<string, number>) {
  let total = 0;
  let max = 0;
  METRICS.forEach(m => {
    total += Math.min(metrics[m.key], m.max);
    max += m.max;
  });
  return Math.round((total / max) * 100);
}

const LifeBalance = () => {
  const [metrics, setMetrics] = useState({
    sleep: 7,
    exercise: 45,
    nutrition: 2,
    social: 3,
    focus: 5,
  });

  const score = getScore(metrics);

  function handleMetric(key: string, delta: number) {
    setMetrics((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(prev[key] + delta, METRICS.find(m => m.key === key)?.max ?? 10)),
    }));
  }

  return (
    <div className="py-10 max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">Life Balance</h1>
        <p className="text-muted-foreground">Track and visualize your work-life balance and wellness.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Daily Wellness Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {METRICS.map((m) => (
              <div key={m.key} className="flex items-center justify-between gap-2">
                <span>{m.name}</span>
                <div className="flex gap-1 items-center">
                  <button onClick={() => handleMetric(m.key, -1)} className="px-2 rounded bg-gray-200 text-lg">-</button>
                  <span className="w-8 text-center">{metrics[m.key]}</span>
                  <button onClick={() => handleMetric(m.key, 1)} className="px-2 rounded bg-gray-200 text-lg">+</button>
                </div>
                <Progress value={(metrics[m.key] / m.max) * 100} className="w-1/3 h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Balance Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold font-playfair mb-2">{score}</div>
          <Progress value={score} className="h-3 mb-2" />
          <Badge variant={score > 75 ? "default" : "secondary"}>{score > 75 ? "Balanced!" : "Needs Work"}</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifeBalance;
