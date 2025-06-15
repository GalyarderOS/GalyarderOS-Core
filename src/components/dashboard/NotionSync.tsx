
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NotionSync = () => {
  const [connected, setConnected] = useState(false);
  return (
    <div className="py-10 max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">Notion Sync</h1>
        <p className="text-muted-foreground">Connect, sync, and enhance your Notion workspace here.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Workspace Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!connected ? (
            <>
              <div className="mb-2">
                <Badge variant="secondary">Status: Not Connected</Badge>
              </div>
              <Button className="bg-black text-white w-full" onClick={() => setConnected(true)}>
                Connect to Notion
              </Button>
            </>
          ) : (
            <>
              <div className="mb-2">
                <Badge variant="default">Status: Connected</Badge>
              </div>
              <Button className="bg-teal-600 text-white w-full" onClick={() => setConnected(false)}>
                Disconnect
              </Button>
              <div className="text-green-700 text-center">
                Your Notion workspace is now synced!
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotionSync;
