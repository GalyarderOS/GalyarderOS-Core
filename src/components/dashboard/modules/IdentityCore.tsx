import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/global/ui/card";
import { Button } from "@/components/global/ui/button";
import { Input } from "@/components/global/ui/input";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

// Tipe data sederhana, hanya ada di dalam file ini
interface IdentityItem {
  id: number;
  text: string;
}

// Komponen Bagian Identitas yang berdiri sendiri
const IdentitySection = ({ title, items, setItems }: {
  title: string;
  items: IdentityItem[];
  setItems: React.Dispatch<React.SetStateAction<IdentityItem[]>>;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleAddNew = () => {
    if (newItemText.trim()) {
      setItems(prev => [...prev, { id: Date.now(), text: newItemText.trim() }]);
      setNewItemText("");
      setIsAdding(false);
    }
  };

  const handleSaveEdit = (id: number) => {
    if (editingText.trim()) {
      setItems(prev => prev.map(item => item.id === id ? { ...item, text: editingText.trim() } : item));
      setEditingId(null);
      setEditingText("");
    }
  };

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title}
          <Button size="sm" variant="ghost" onClick={() => setIsAdding(true)}><Plus className="h-4 w-4" /></Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center group space-x-2">
            {editingId === item.id ? (
              <>
                <Input autoFocus value={editingText} onChange={e => setEditingText(e.target.value)} />
                <Button size="icon" variant="ghost" onClick={() => handleSaveEdit(item.id)}><Save className="h-4 w-4 text-green-500" /></Button>
                <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}><X className="h-4 w-4 text-red-500" /></Button>
              </>
            ) : (
              <>
                <p className="flex-grow text-muted-foreground">{item.text}</p>
                <div className="opacity-0 group-hover:opacity-100">
                  <Button size="icon" variant="ghost" onClick={() => { setEditingId(item.id); setEditingText(item.text); }}><Edit className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </>
            )}
          </div>
        ))}
        {isAdding && (
          <div className="flex space-x-2">
            <Input autoFocus placeholder={`New ${title.slice(0, -1)}...`} value={newItemText} onChange={e => setNewItemText(e.target.value)} />
            <Button onClick={handleAddNew}>Add</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


// Komponen Utama IdentityCore
const IdentityCore = () => {
  // Semua state dikelola secara lokal di sini. Tidak ada dependensi eksternal.
  const [coreBeliefs, setCoreBeliefs] = useState<IdentityItem[]>([
    { id: 1, text: "Belajar terus menerus adalah kunci." },
    { id: 2, text: "Empati menciptakan hubungan yang bermakna." }
  ]);
  const [values, setValues] = useState<IdentityItem[]>([
    { id: 1, text: "Integritas dalam segala tindakan." },
    { id: 2, text: "Kreativitas dan inovasi." }
  ]);
  const [principles, setPrinciples] = useState<IdentityItem[]>([
    { id: 1, text: "Berusaha memahami sebelum dipahami." },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Identity Core</h1>
        <p className="text-muted-foreground">
          Definisikan keyakinan, nilai, dan prinsip fundamental yang membimbing Anda.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <IdentitySection title="Keyakinan Inti" items={coreBeliefs} setItems={setCoreBeliefs} />
        <IdentitySection title="Nilai-Nilai" items={values} setItems={setValues} />
        <IdentitySection title="Prinsip-Prinsip" items={principles} setItems={setPrinciples} />
      </div>
    </div>
  );
};

export default IdentityCore; 