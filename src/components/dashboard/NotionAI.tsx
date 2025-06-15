
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Send, Loader2, BookOpen, PenTool, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface NotionAIProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotionAI = ({ isOpen, onClose }: NotionAIProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call - replace with actual Notion AI integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResponse(`AI Response for: "${query}"\n\nThis is a placeholder response. The actual Notion AI integration will be implemented here.`);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { icon: BookOpen, label: 'Summarize Notes', action: () => setQuery('Summarize my recent notes') },
    { icon: PenTool, label: 'Create Template', action: () => setQuery('Create a project planning template') },
    { icon: Database, label: 'Organize Data', action: () => setQuery('Help me organize my database structure') },
    { icon: Zap, label: 'Quick Analysis', action: () => setQuery('Analyze my productivity patterns') }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Notion AI Assistant
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={action.action}
                  >
                    <action.icon className="h-6 w-6 text-purple-600" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Chat Interface */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>AI Assistant</span>
                <Badge variant="outline" className="ml-auto">
                  Notion Integration
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Ask your AI assistant anything about your notes, documents, or knowledge base..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-[100px] bg-white/50 dark:bg-slate-700/50"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!query.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Query
                    </>
                  )}
                </Button>
              </form>

              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="bg-slate-50 dark:bg-slate-700/50 border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">AI Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                        {response}
                      </pre>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Integration Status */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-green-600" />
                <span>Integration Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Notion API: Ready for setup</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">AI Engine: Connected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotionAI;
