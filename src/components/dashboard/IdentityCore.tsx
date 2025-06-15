
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const defaultValues = {
  fullName: "",
  about: "",
  values: "",
};

const IdentityCore = () => {
  const [identity, setIdentity] = useState(defaultValues);
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setIdentity({ ...identity, [e.target.name]: e.target.value });
    setSaved(false);
  }

  return (
    <div className="py-10 max-w-xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">Identity Core</h1>
        <p className="text-muted-foreground">Who you are and what you value, centralized.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Personal Identity</CardTitle>
          <CardDescription>Fill out to clarify who you are.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="fullName"
            placeholder="Full Name"
            value={identity.fullName}
            onChange={handleChange}
            className="font-playfair"
          />
          <textarea
            name="about"
            placeholder="Write your personal bio"
            value={identity.about}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded p-2 font-playfair"
          />
          <Input
            name="values"
            placeholder="List your core values (comma-separated)"
            value={identity.values}
            onChange={handleChange}
            className="font-playfair"
          />
          <Button onClick={() => setSaved(true)} className="w-full mt-2 bg-indigo-600 text-white">Save</Button>
          {saved && (
            <div className="mt-3 text-center">
              <Badge variant="default">Saved!</Badge>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Me Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="font-semibold">{identity.fullName || "Your Name"}</div>
            <div className="text-gray-600">{identity.about || "Your bio will appear here."}</div>
            <div className="flex gap-1 flex-wrap mt-2">
              {(identity.values || "").split(",").filter(Boolean).map((val, i) => (
                <Badge key={i} variant="outline">{val.trim()}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default IdentityCore;
