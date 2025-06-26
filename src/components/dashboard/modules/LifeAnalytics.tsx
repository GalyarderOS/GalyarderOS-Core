
import { Card, CardContent, CardHeader, CardTitle } from "@/components/global/ui/card";
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line } from "recharts";

const goalData = [
  { name: "Jan", Total: 2, Completed: 1 },
  { name: "Feb", Total: 4, Completed: 2 },
  { name: "Mar", Total: 5, Completed: 3 },
  { name: "Apr", Total: 6, Completed: 5 },
];
const focusData = [
  { name: "Mon", Minutes: 60 },
  { name: "Tue", Minutes: 100 },
  { name: "Wed", Minutes: 40 },
  { name: "Thu", Minutes: 50 },
  { name: "Fri", Minutes: 120 },
  { name: "Sat", Minutes: 70 },
  { name: "Sun", Minutes: 90 },
];

const LifeAnalytics = () => (
  <div className="py-10 max-w-3xl mx-auto space-y-8">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">Life Analytics</h1>
      <p className="text-muted-foreground">Analyze and explore data about your life progress.</p>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Goals Completed Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={goalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total" fill="#8884d8" />
            <Bar dataKey="Completed" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Focus Session Minutes (Weekly)</CardTitle>
      </CardHeader>
      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={focusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Minutes" stroke="#fbbf24" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

export default LifeAnalytics;
