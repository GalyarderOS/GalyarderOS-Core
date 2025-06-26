
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/global/ui/card";
import { Input } from "@/components/global/ui/input";
import { Button } from "@/components/global/ui/button";
import { Badge } from "@/components/global/ui/badge";

const moods = ["😊", "😐", "😔"];

const Reflection = () => {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("");
  const [journal, setJournal] = useState<{ text: string; mood: string; date: string }[]>([]);

  function addEntry() {
    if (!entry.trim()) return;
    setJournal([{ text: entry, mood, date: new Date().toLocaleDateString() }, ...journal]);
    setEntry("");
    setMood("");
  }

  return (
    <div className="py-10 max-w-xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">Reflection</h1>
        <p className="text-muted-foreground">Journal and reflect on your growth and experiences.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Write Journal Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <span className="mr-2">Mood: </span>
            {moods.map((m) => (
              <Button
                size="sm"
                key={m}
                onClick={() => setMood(m)}
                variant={mood === m ? "default" : "outline"}
                className="mx-1"
              >
                {m}
              </Button>
            ))}
          </div>
          <textarea
            rows={4}
            className="w-full border rounded mb-2 font-playfair"
            placeholder="What's on your mind?"
            value={entry}
            onChange={e => setEntry(e.target.value)}
          />
          <Button onClick={addEntry} className="w-full bg-fuchsia-600 text-white">Save Entry</Button>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Previous Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
              {journal.length === 0 ? (
                <div className="text-center text-muted-foreground">No journal entries yet.</div>
              ) : (
                journal.map((j, i) => (
                  <div key={i} className="border-b pb-2">
                    <div className="flex gap-1 items-center">
                      <Badge>{j.mood}</Badge>
                      <span className="text-xs text-gray-500">{j.date}</span>
                    </div>
                    <div className="font-playfair">{j.text}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reflection;
