
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Target, Plus, Trash2 } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "active" | "completed";
}

const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Become a Fullstack Developer",
    description: "Master JavaScript, TypeScript, React, Node.js and database skills to a professional level.",
    deadline: "2025-01-01",
    status: "active",
  },
  {
    id: "2",
    title: "Achieve Fluent English",
    description: "Practice conversation weekly, consume English media, join language clubs.",
    deadline: "2024-12-31",
    status: "active",
  },
  {
    id: "3",
    title: "Start a Side Business",
    description: "Research business opportunities, create a business plan, and launch an MVP.",
    deadline: "2025-05-01",
    status: "completed",
  },
];

const VisionArchitecture = () => {
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "add-new">("active");
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) return;
    setGoals([
      ...goals,
      {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        deadline: newGoal.deadline,
        status: "active",
      },
    ]);
    setNewGoal({ title: "", description: "", deadline: "" });
    setActiveTab("active");
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleCompleteGoal = (id: string) => {
    setGoals(
      goals.map((g) =>
        g.id === id ? { ...g, status: "completed" } : g
      )
    );
  };

  return (
    <div className="py-10 max-w-3xl mx-auto space-y-7">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground tracking-tight">
          Vision Architecture
        </h1>
        <p className="text-muted-foreground">
          Design your future. Set, manage, and track your long-term goals and aspirations.
        </p>
      </div>
      {/* Tabs for goals */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="mb-5 flex space-x-2 mx-auto w-fit">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed Goals</TabsTrigger>
          <TabsTrigger value="add-new">New Goal</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 animate-fade-in">
          {goals.filter((g) => g.status === "active").length === 0 ? (
            <p className="text-center text-gray-500">No active goals yet. Set up a new one!</p>
          ) : (
            goals
              .filter((g) => g.status === "active")
              .map((g) => (
                <Card key={g.id} className="group hover:shadow-xl transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-6 w-6 text-indigo-600" />
                      <span className="truncate">{g.title}</span>
                    </CardTitle>
                    <div className="flex space-x-1">
                      <Button
                        onClick={() => handleCompleteGoal(g.id)}
                        variant="outline"
                        size="sm"
                        className="text-green-700 border-green-200 hover:bg-green-50"
                        title="Mark as Complete"
                      >
                        Complete
                      </Button>
                      <Button
                        onClick={() => handleDeleteGoal(g.id)}
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-1">{g.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {g.deadline || "No deadline"}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 animate-fade-in">
          {goals.filter((g) => g.status === "completed").length === 0 ? (
            <p className="text-center text-gray-500">No completed goals.</p>
          ) : (
            goals
              .filter((g) => g.status === "completed")
              .map((g) => (
                <Card key={g.id} className="border-green-200 bg-green-50/30 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-6 w-6 text-green-700" />
                      <span className="truncate">{g.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-1">{g.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {g.deadline || "No deadline"}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
        <TabsContent value="add-new" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-6 w-6 text-indigo-600" />
                <span>Create New Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input
                  placeholder="Goal Title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal((g) => ({ ...g, title: e.target.value }))}
                />
                <Input
                  placeholder="Short Description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal((g) => ({ ...g, description: e.target.value }))}
                />
                <Input
                  type="date"
                  placeholder="Deadline"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal((g) => ({ ...g, deadline: e.target.value }))}
                />
                <Button
                  onClick={handleAddGoal}
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                  disabled={!newGoal.title.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisionArchitecture;
