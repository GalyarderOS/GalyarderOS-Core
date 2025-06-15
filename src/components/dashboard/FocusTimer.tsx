
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, StopCircle, Repeat, List, Timer } from "lucide-react";

type SessionHistory = {
  id: number;
  task: string;
  duration: number;
  completed: boolean;
  start: string;
};

const presets = [
  { label: "Pomodoro", time: 25 },
  { label: "Short Break", time: 5 },
  { label: "Long Break", time: 15 },
];

export default function FocusTimer() {
  const [duration, setDuration] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [history, setHistory] = useState<SessionHistory[]>([]);
  const [sessionId, setSessionId] = useState(0);

  useEffect(() => {
    setSecondsLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    }
    if (secondsLeft === 0 && isActive) {
      handleCompletion(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [isActive, secondsLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const x = (s % 60).toString().padStart(2, "0");
    return `${m}:${x}`;
  };

  function handleStart() {
    if (!currentTask.trim()) return;
    setIsActive(true);
  }

  function handlePause() {
    setIsActive(false);
  }

  function handleReset() {
    setIsActive(false);
    setSecondsLeft(duration * 60);
  }

  function handleCompletion(isCompleted: boolean) {
    setIsActive(false);
    setSecondsLeft(duration * 60);
    if (!currentTask.trim()) return;
    setHistory([
      {
        id: sessionId + 1,
        task: currentTask,
        duration: duration,
        completed: isCompleted,
        start: new Date().toLocaleTimeString(),
      },
      ...history,
    ]);
    setSessionId((prev) => prev + 1);
  }

  function changePreset(minutes: number) {
    setDuration(minutes);
    setIsActive(false);
    setSecondsLeft(minutes * 60);
  }

  const completedSessions = history.filter((h) => h.completed).length;
  const interruptedSessions = history.filter((h) => !h.completed).length;
  const totalMinutes = history.filter((x) => x.completed).reduce((acc, curr) => acc + curr.duration, 0);

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-10">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold font-playfair mb-2 text-foreground flex items-center gap-2 justify-center">
          <Timer className="inline-block mr-2" /> Focus Timer
        </h1>
        <p className="text-muted-foreground">
          {`Stay focused and get things done with interval-based sessions.`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            Current Session
          </CardTitle>
          <CardDescription>
            Input your task, pick a preset, and start focusing!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Input
            placeholder="What are you working on?"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            disabled={isActive}
            className="font-playfair text-center"
          />
          <div className="flex gap-2 mt-2 mb-1">
            {presets.map((p) => (
              <Button
                key={p.label}
                onClick={() => changePreset(p.time)}
                variant={duration === p.time ? "default" : "outline"}
                size="sm"
                className={duration === p.time ? "font-bold bg-cyan-600 text-white" : ""}
                disabled={isActive}
              >
                {p.label} ({p.time}m)
              </Button>
            ))}
          </div>
          <div className="text-6xl font-mono mb-1">{formatTime(secondsLeft)}</div>
          <Progress value={100 - (secondsLeft / (duration * 60)) * 100} className="h-3 w-full max-w-xs mb-2" />
          <div className="flex gap-2">
            {!isActive ? (
              <Button
                onClick={handleStart}
                disabled={!currentTask.trim() || secondsLeft === 0}
                className="bg-cyan-800 text-white font-bold"
              >
                <Play className="mr-2" size={18} /> Start
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                variant="outline"
                className="font-bold"
              >
                <Pause className="mr-2" size={18} /> Pause
              </Button>
            )}
            <Button
              variant="outline"
              disabled={!isActive && secondsLeft === duration * 60}
              onClick={() => handleCompletion(false)}
              className=""
            >
              <StopCircle className="mr-2" size={18} /> Stop
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={secondsLeft === duration * 60}
              className=""
            >
              <Repeat className="mr-2" size={18} /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <List className="w-5 h-5" /> Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around my-2">
              <div className="text-center">
                <div className="text-2xl font-bold">{completedSessions}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{interruptedSessions}</div>
                <div className="text-xs text-gray-500">Interrupted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalMinutes}m</div>
                <div className="text-xs text-gray-500">Focus (total)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <List className="w-5 h-5" /> Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto max-h-40">
              {history.length === 0 ? (
                <div className="text-muted-foreground text-sm text-center py-4">No focus sessions yet.</div>
              ) : (
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr>
                      <th className="pb-1">Task</th>
                      <th className="pb-1">Dur</th>
                      <th className="pb-1">Status</th>
                      <th className="pb-1">Start</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 6).map((h) => (
                      <tr key={h.id} className="border-b last:border-0">
                        <td className="pr-2">{h.task}</td>
                        <td className="pr-2">{h.duration}m</td>
                        <td className="pr-2">
                          <Badge variant={h.completed ? "default" : "secondary"} className={h.completed ? "bg-green-100 text-green-800" : ""}>
                            {h.completed ? "Done" : "Interrupted"}
                          </Badge>
                        </td>
                        <td className="pr-2">{h.start}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

