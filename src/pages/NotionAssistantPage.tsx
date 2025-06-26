import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Button } from '@/components/global/ui/button';
import { Textarea } from '@/components/global/ui/textarea';
import { Badge } from '@/components/global/ui/badge';
import { FileText, Send, Loader2, BookOpen, PenTool, Database, Zap, Sparkles, User, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/global/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const NotionAssistantPage = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: query, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: `This is a simulated AI response for: "${userMessage.text}". The actual Notion AI integration will provide a meaningful answer here.`,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error while processing your request.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (actionQuery: string) => {
    setQuery(actionQuery);
  }

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);
  
  const quickActions = [
    { icon: BookOpen, label: 'Summarize Notes', action: () => handleQuickAction('Summarize my recent notes') },
    { icon: PenTool, label: 'Create Template', action: () => handleQuickAction('Create a new project planning template in Notion') },
    { icon: Database, label: 'Organize Data', action: () => handleQuickAction('Help me structure my new CRM database') },
    { icon: Zap, label: 'Quick Analysis', action: () => handleQuickAction('Analyze the sentiment of my latest journal entries') }
  ];

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-6 bg-slate-50 dark:bg-slate-900/50">
      <ModuleHeader
        module="vision"
        title="Notion AI Assistant"
        description="Your intelligent partner for knowledge management"
        icon={<Sparkles className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Main Chat Column */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                AI Conversation
                <Badge variant="outline" className="ml-auto font-normal">
                  Notion Integrated
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.length === 0 && (
                       <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center justify-center text-center p-8 h-full"
                        >
                          <Sparkles className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
                          <p className="text-slate-600 dark:text-slate-400">
                            Ready to assist. <br/> Ask me anything or use a quick action to start.
                          </p>
                        </motion.div>
                    )}
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                          "flex items-start gap-3 w-full",
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {msg.sender === 'ai' && (
                          <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-full">
                            <Sparkles className="h-5 w-5 text-slate-600 dark:text-slate-300"/>
                          </div>
                        )}
                        <div
                          className={cn(
                            'max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-sm',
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                          )}
                        >
                          {msg.text}
                        </div>
                        {msg.sender === 'user' && (
                           <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-full">
                            <User className="h-5 w-5 text-slate-600 dark:text-slate-300"/>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
              <div className="p-4 border-t dark:border-slate-800">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <Textarea
                    placeholder="Ask anything about your knowledge base..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    className="flex-1 resize-none"
                    rows={1}
                  />
                  <Button
                    type="submit"
                    disabled={!query.trim() || isLoading}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Zap className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-center justify-center space-y-2 text-center"
                    onClick={action.action}
                  >
                    <action.icon className="h-5 w-5 mb-1" />
                    <span className="text-xs leading-tight">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Database className="h-5 w-5 mr-2" />
                Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>AI Engine</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span>Notion API</span>
                </div>
                 <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">Ready for Setup</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotionAssistantPage; 