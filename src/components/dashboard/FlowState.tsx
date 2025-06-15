
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const DEFAULT_TIME = 25 * 60;

const FlowState = () => {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    if (timeLeft === 0) setIsRunning(false);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(DEFAULT_TIME);
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const x = (s % 60).toString().padStart(2, "0");
    return `${m}:${x}`;
  }

  return (
    <div className="py-10 max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">Flow State</h1>
        <p className="text-muted-foreground">
          Enter focused deep work sessions. Boost productivity.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pomodoro Timer</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="text-6xl font-mono">{formatTime(timeLeft)}</div>
          <Progress value={(1 - timeLeft / DEFAULT_TIME) * 100} className="h-2" />
          <div className="flex gap-2">
            {!isRunning && (
              <Button onClick={startTimer} className="bg-cyan-600 text-white">
                Start
              </Button>
            )}
            {isRunning && (
              <Button onClick={pauseTimer} variant="outline">
                Pause
              </Button>
            )}
            <Button onClick={resetTimer} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default FlowState;
