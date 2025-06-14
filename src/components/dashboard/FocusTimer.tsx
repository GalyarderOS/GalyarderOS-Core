
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Square, Clock, RotateCcw, Settings } from 'lucide-react';

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [sessions, setSessions] = useState([
    { task: 'Code Review', duration: 25, completed: true, date: '2024-06-14' },
    { task: 'Design Research', duration: 45, completed: true, date: '2024-06-14' },
    { task: 'Documentation', duration: 25, completed: false, date: '2024-06-14' },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Timer completed logic here
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!currentTask.trim()) return;
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const setTimer = (minutes: number) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  const getProgress = () => {
    return ((initialTime - timeLeft) / initialTime) * 100;
  };

  const getTodaysSessions = () => {
    const today = new Date().toISOString().split('T')[0];
    return sessions.filter(session => session.date === today);
  };

  const getCompletedSessions = () => {
    return getTodaysSessions().filter(session => session.completed).length;
  };

  const getTotalFocusTime = () => {
    return getTodaysSessions()
      .filter(session => session.completed)
      .reduce((total, session) => total + session.duration, 0);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: 'Playfair Display' }}>
          Focus Timer
        </h1>
        <p className="text-gray-600">Deep work sessions for maximum productivity</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timer Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5 text-[#FFD700]" />
                <span>Focus Session</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Timer Display */}
              <div className="relative">
                <div className="text-6xl font-bold text-[#1a1a1a] mb-4">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={getProgress()} className="h-3 mb-4" />
                <div className="text-sm text-gray-500">
                  {Math.round(getProgress())}% complete
                </div>
              </div>

              {/* Task Input */}
              <div className="space-y-2">
                <Input
                  placeholder="What are you working on?"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  disabled={isRunning}
                  className="text-center"
                />
              </div>

              {/* Timer Presets */}
              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTimer(25)}
                  disabled={isRunning}
                >
                  25m
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTimer(45)}
                  disabled={isRunning}
                >
                  45m
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTimer(60)}
                  disabled={isRunning}
                >
                  60m
                </Button>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center space-x-3">
                {!isRunning ? (
                  <Button
                    onClick={handleStart}
                    disabled={!currentTask.trim()}
                    className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button
                    onClick={handlePause}
                    variant="outline"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}
                
                <Button
                  onClick={handleStop}
                  variant="outline"
                  disabled={!isRunning && timeLeft === initialTime}
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
                
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={timeLeft === initialTime}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats and History */}
        <div className="space-y-6">
          {/* Today's Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
                <CardDescription>Your focus session statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {getCompletedSessions()}
                    </div>
                    <div className="text-sm text-gray-500">Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {getTotalFocusTime()}m
                    </div>
                    <div className="text-sm text-gray-500">Focus Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Your focus session history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sessions.slice(0, 5).map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{session.task}</div>
                        <div className="text-xs text-gray-500">{session.duration} minutes</div>
                      </div>
                      <Badge 
                        variant={session.completed ? "default" : "secondary"}
                        className={session.completed ? "bg-green-100 text-green-800" : ""}
                      >
                        {session.completed ? "Completed" : "Interrupted"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
