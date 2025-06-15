
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const KnowledgeHub = () => {
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const [notes, setNotes] = useState<{ text: string; tags: string[] }[]>([]);
  const [search, setSearch] = useState("");

  function addNote() {
    if (!note.trim()) return;
    setNotes([{ text: note, tags: tag ? tag.split(",").map(t => t.trim()) : [] }, ...notes]);
    setNote("");
    setTag("");
  }

  const filteredNotes = notes.filter(
    (n) =>
      n.text.toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="py-10 max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">Knowledge Hub</h1>
        <p className="text-muted-foreground">All your learnings, notes, and reference materials.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 mb-2">
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Your note"
            />
            <Input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Tags (comma separated)"
            />
            <Button onClick={addNote} className="bg-indigo-600 text-white">Add</Button>
          </div>
          <Input
            className="mt-4"
            placeholder="Search notes or tags"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="mt-4 flex flex-col gap-2 max-h-52 overflow-y-auto">
            {filteredNotes.length === 0 ? (
              <div className="text-center text-muted-foreground">No notes found.</div>
            ) : (
              filteredNotes.map((n, i) => (
                <div key={i} className="p-2 border rounded">
                  <div>{n.text}</div>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {n.tags.map((t, j) => (
                      <Badge key={j} variant="outline">{t}</Badge>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeHub;
