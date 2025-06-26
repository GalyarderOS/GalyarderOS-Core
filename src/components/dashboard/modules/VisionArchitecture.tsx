import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/global/ui/card";
import { Button } from "@/components/global/ui/button";
import { Input } from "@/components/global/ui/input";
import { Textarea } from "@/components/global/ui/textarea";
import { Badge } from "@/components/global/ui/badge";
import { Quote, Target, Plus, Edit, Trash2 } from "lucide-react";

// Tipe data & data awal didefinisikan secara lokal
interface Goal {
  id: number;
  title: string;
  description: string;
  status: 'in-progress' | 'completed' | 'not-started';
}

const initialGoals: Goal[] = [
  { id: 1, title: 'Luncurkan Galyarder OS', description: 'Rilis versi pertama sistem operasi.', status: 'in-progress' },
  { id: 2, title: 'Capai Kebebasan Finansial', description: 'Bangun bisnis yang menghasilkan pendapatan pasif.', status: 'not-started' },
];

const initialStatement = {
  title: 'Visi Utama Saya',
  description: 'Menjadi kekuatan utama dalam teknologi optimasi hidup, menciptakan sistem yang membantu jutaan orang merancang dan menjalani kehidupan ideal mereka.'
};

// Komponen Utama VisionArchitecture
const VisionArchitecture = () => {
  const [statement, setStatement] = useState(initialStatement);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isEditingStatement, setIsEditingStatement] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Vision Architecture</h1>
        <p className="text-muted-foreground">
          Bangun cetak biru untuk masa depan ideal Anda.
        </p>
      </div>

      {/* Vision Statement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Quote className="h-5 w-5" />
              <span>Pernyataan Visi</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsEditingStatement(!isEditingStatement)}>
              {isEditingStatement ? "Simpan" : "Edit"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditingStatement ? (
            <div className="space-y-2">
              <Input 
                value={statement.title} 
                onChange={e => setStatement(s => ({...s, title: e.target.value}))}
                className="text-xl font-bold"
              />
              <Textarea 
                value={statement.description} 
                onChange={e => setStatement(s => ({...s, description: e.target.value}))}
                rows={3}
              />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">{statement.title}</h2>
              <p className="text-muted-foreground mt-1">{statement.description}</p>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Strategic Goals Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5" />
              <span>Tujuan Strategis</span>
            </div>
             <Button variant="ghost" size="sm"><Plus className="h-4 w-4 mr-2" /> Tambah Tujuan</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map(goal => (
            <Card key={goal.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
                <Badge variant={goal.status === 'in-progress' ? 'default' : 'secondary'}>
                  {goal.status}
                </Badge>
              </div>
               <div className="flex justify-end space-x-2 mt-2">
                  <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default VisionArchitecture; 