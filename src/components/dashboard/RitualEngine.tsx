
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const RitualEngine = () => {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([
    { name: "Morning Run", streak: 3, done: false },
    { name: "Meditation", streak: 7, done: false },
  ]);

  function addHabit() {
    if (!habit.trim()) return;
    setHabits((prev) => [...prev, { name: habit, streak: 0, done: false }]);
    setHabit("");
  }

  function toggleDone(index: number) {
    setHabits((old) =>
      old.map((h, i) =>
        i === index ? { ...h, done: !h.done, streak: h.done ? h.streak : h.streak + 1 } : h
      )
    );
  }

  return (
    <div className="py-10 max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">Ritual Engine</h1>
        <p className="text-muted-foreground">Automate your daily routines and habits here.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>My Habits & Rituals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              placeholder="Add new habit"
            />
            <Button onClick={addHabit} className="bg-green-500 text-white">
              Add
            </Button>
          </div>
          <div className="space-y-3">
            {habits.length === 0 ? (
              <div className="text-center text-muted-foreground">No habits yet.</div>
            ) : (
              habits.map((h, i) => (
                <div key={i} className="flex items-center justify-between border px-3 py-2 rounded-md">
                  <span
                    className={`flex-1 ${h.done ? "line-through text-muted-foreground" : ""}`}
                  >
                    {h.name}
                  </span>
                  <Badge className="mx-2" variant="secondary">
                    Streak: {h.streak}
                  </Badge>
                  <Button
                    size="sm"
                    variant={h.done ? "secondary" : "outline"}
                    onClick={() => toggleDone(i)}
                  >
                    {h.done ? "Undo" : "Done"}
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={habits.filter(h => h.done).length / Math.max(1, habits.length) * 100} />
          <div className="text-right text-xs mt-1">
            {habits.filter(h => h.done).length} of {habits.length} done today
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RitualEngine;
