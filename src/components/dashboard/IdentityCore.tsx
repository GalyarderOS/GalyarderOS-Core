import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import { useIdentityStore } from "@/modules/IdentityCore/useIdentityStore";
import type { IdentityItem } from "@/modules/IdentityCore/useIdentityStore";

type IdentitySectionType = 'coreBeliefs' | 'values' | 'principles';

const IdentitySection = ({
  title,
  items,
  type,
}: {
  title: string;
  items: IdentityItem[];
  type: IdentitySectionType;
}) => {
  const { addItem, updateItem, deleteItem } = useIdentityStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (item: IdentityItem) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      updateItem(type, id, editText.trim());
      handleCancelEdit();
    }
  };

  const handleAddNew = () => {
    if (newItemText.trim()) {
      addItem(type, newItemText.trim());
      setNewItemText("");
      setIsAdding(false);
    }
  };
  
  const handleCancelAdd = () => {
      setIsAdding(false);
      setNewItemText("");
  }

  return (
    <Card className="flex-1 bg-background/80 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-lg font-semibold text-foreground">
          {title}
          <Button size="sm" variant="ghost" onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2 group">
            {editingId === item.id ? (
              <>
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(item.id)}
                  className="flex-grow bg-transparent"
                  autoFocus
                />
                <Button size="icon" variant="ghost" onClick={() => handleSaveEdit(item.id)}>
                  <Save className="h-4 w-4 text-green-500" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </>
            ) : (
              <>
                <p className="flex-grow text-sm text-muted-foreground">{item.text}</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteItem(type, item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500/80" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        {isAdding && (
          <div className="flex items-center space-x-2 pt-2">
            <Input
              placeholder={`New ${title.slice(0, -1)}...`}
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddNew()}
              className="flex-grow bg-transparent"
              autoFocus
            />
            <Button size="icon" variant="ghost" onClick={handleAddNew}>
              <Save className="h-4 w-4 text-green-500" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancelAdd}>
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


const IdentityCore = () => {
  const { coreBeliefs, values, principles } = useIdentityStore();

  return (
    <div className="p-4 md:p-6 space-y-6 h-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Identity Core</h1>
        <p className="text-muted-foreground">
          Define and manage the fundamental beliefs, values, and principles that guide you.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <IdentitySection title="Core Beliefs" items={coreBeliefs} type="coreBeliefs" />
        <IdentitySection title="Values" items={values} type="values" />
        <IdentitySection title="Principles" items={principles} type="principles" />
      </div>
    </div>
  );
};

export default IdentityCore;
