
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, 
  Bot, 
  User,
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant = ({ isOpen, onClose }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Halo! Saya adalah AI Assistant GalyarderOS. Saya siap membantu Anda dengan produktivitas, penetapan tujuan, pelacakan kebiasaan, dan pengembangan diri. Bagaimana saya bisa membantu Anda hari ini?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user, session } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user || !session) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setConnectionError(false);

    try {
      console.log('Sending message to AI:', userMessage.content);
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: userMessage.content },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('Response from edge function:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Terjadi kesalahan saat menghubungi server');
      }

      if (data?.error) {
        console.error('API error:', data.error);
        throw new Error(data.error);
      }

      if (!data?.response) {
        throw new Error('Tidak ada respons dari AI');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      setConnectionError(true);
      
      let errorMessage = 'Maaf, terjadi kesalahan. Silakan coba lagi.';
      
      if (error.message?.includes('API key')) {
        errorMessage = 'Silakan tambahkan API key Gemini Anda di Settings untuk menggunakan AI Assistant.';
      } else if (error.message?.includes('tidak valid')) {
        errorMessage = 'API key Gemini tidak valid. Silakan periksa dan perbarui di Settings.';
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Masalah koneksi. Periksa koneksi internet Anda dan coba lagi.';
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ ${errorMessage}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-[#1a1a1a]" />
            </div>
            <span>AI Assistant</span>
            {connectionError && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-[#FFD700]' 
                          : 'bg-gray-100'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="h-4 w-4 text-[#1a1a1a]" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      
                      <div className={`rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-[#FFD700] text-[#1a1a1a]'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Sedang berpikir...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 pt-4 border-t">
            <div className="flex space-x-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tanya saya tentang produktivitas, tujuan, atau kebiasaan..."
                className="flex-1 min-h-[40px] max-h-32 resize-none"
                disabled={isLoading || !user}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !user}
                className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {!user && (
              <p className="text-xs text-gray-500 mt-2">
                Silakan masuk untuk menggunakan AI Assistant
              </p>
            )}
            
            {connectionError && (
              <p className="text-xs text-red-500 mt-2">
                ⚠️ Masalah koneksi terdeteksi. Periksa API key Gemini di Settings.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistant;
