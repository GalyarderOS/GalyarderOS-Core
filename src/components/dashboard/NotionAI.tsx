import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Plus,
  Search,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
  Save,
  X
} from 'lucide-react';

interface NotionAIProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotionPage {
  id: string;
  title: string;
  content?: string;
  created_time: string;
  last_edited_time: string;
}

const NotionAI = ({ isOpen, onClose }: NotionAIProps) => {
  const [pages, setPages] = useState<NotionPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<NotionPage | null>(null);
  const [editingPage, setEditingPage] = useState<NotionPage | null>(null);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageContent, setNewPageContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user, session } = useAuth();
  const { toast } = useToast();

  const callNotionAPI = async (action: string, data: any = {}) => {
    try {
      console.log('Calling Notion API:', action, data);
      
      const { data: response, error } = await supabase.functions.invoke('notion-ai', {
        body: { action, ...data },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      console.log('Notion API response:', { response, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Terjadi kesalahan saat menghubungi server');
      }

      if (response?.error) {
        console.error('Notion API error:', response.error);
        throw new Error(response.error);
      }

      return response;
    } catch (error) {
      console.error('Error calling Notion API:', error);
      setConnectionError(true);
      
      let errorMessage = 'Maaf, terjadi kesalahan. Silakan coba lagi.';
      
      if (error.message?.includes('tidak tersedia')) {
        errorMessage = 'Notion AI sedang tidak tersedia. Silakan hubungi administrator.';
      } else if (error.message?.includes('tidak valid')) {
        errorMessage = 'Terjadi masalah dengan token Notion. Silakan hubungi administrator.';
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Masalah koneksi. Periksa koneksi internet Anda dan coba lagi.';
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });

      throw error;
    }
  };

  const fetchPages = async () => {
    setIsLoading(true);
    setConnectionError(false);
    
    try {
      const response = await callNotionAPI('list_pages');
      setPages(response.pages || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPage = async () => {
    if (!newPageTitle.trim()) {
      toast({
        title: "Error",
        description: "Judul halaman tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await callNotionAPI('create_page', {
        title: newPageTitle.trim(),
        content: newPageContent.trim()
      });
      
      toast({
        title: "Berhasil",
        description: "Halaman baru berhasil dibuat",
      });
      
      setNewPageTitle('');
      setNewPageContent('');
      setActiveTab('browse');
      await fetchPages();
    } catch (error) {
      console.error('Error creating page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePage = async (pageId: string, title: string, content: string) => {
    setIsLoading(true);
    
    try {
      const response = await callNotionAPI('update_page', {
        page_id: pageId,
        title: title.trim(),
        content: content.trim()
      });
      
      toast({
        title: "Berhasil",
        description: "Halaman berhasil diperbarui",
      });
      
      setEditingPage(null);
      await fetchPages();
    } catch (error) {
      console.error('Error updating page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePage = async (pageId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus halaman ini?')) {
      return;
    }

    setIsLoading(true);
    
    try {
      await callNotionAPI('delete_page', { page_id: pageId });
      
      toast({
        title: "Berhasil",
        description: "Halaman berhasil dihapus",
      });
      
      setSelectedPage(null);
      setEditingPage(null);
      await fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchPages = async () => {
    if (!searchQuery.trim()) {
      await fetchPages();
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await callNotionAPI('search_pages', {
        query: searchQuery.trim()
      });
      setPages(response.pages || []);
    } catch (error) {
      console.error('Error searching pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && user && session) {
      fetchPages();
    }
  }, [isOpen, user, session]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(searchPages, 500);
      return () => clearTimeout(timeoutId);
    } else {
      fetchPages();
    }
  }, [searchQuery]);

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[700px] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span>Notion AI</span>
            {connectionError && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-6 py-2 border-b">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="browse">Browse Pages</TabsTrigger>
                <TabsTrigger value="create">Create Page</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="browse" className="flex-1 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Your Notion Pages</h3>
                <Button onClick={fetchPages} disabled={isLoading} size="sm">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                </Button>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {filteredPages.map((page) => (
                    <motion.div
                      key={page.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      {editingPage?.id === page.id ? (
                        <div className="space-y-3">
                          <Input
                            value={editingPage.title}
                            onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                            className="font-medium"
                          />
                          <Textarea
                            value={editingPage.content || ''}
                            onChange={(e) => setEditingPage({...editingPage, content: e.target.value})}
                            placeholder="Edit content..."
                            className="min-h-[100px]"
                          />
                          <div className="flex space-x-2">
                            <Button 
                              size="sm"
                              onClick={() => updatePage(editingPage.id, editingPage.title, editingPage.content || '')}
                              disabled={isLoading}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingPage(null)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{page.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Dibuat: {new Date(page.created_time).toLocaleDateString('id-ID')}
                            </p>
                            <p className="text-sm text-gray-500">
                              Diedit: {new Date(page.last_edited_time).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingPage({...page, content: page.content || ''})}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deletePage(page.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {filteredPages.length === 0 && !isLoading && (
                    <div className="text-center py-8 text-gray-500">
                      Tidak ada halaman ditemukan
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="create" className="flex-1 p-6 space-y-4">
              <h3 className="text-lg font-semibold">Buat Halaman Baru</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Judul Halaman</label>
                  <Input
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    placeholder="Masukkan judul halaman..."
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Konten</label>
                  <Textarea
                    value={newPageContent}
                    onChange={(e) => setNewPageContent(e.target.value)}
                    placeholder="Masukkan konten halaman..."
                    className="min-h-[200px]"
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  onClick={createPage} 
                  disabled={isLoading || !newPageTitle.trim()}
                  className="w-full"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Buat Halaman
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="search" className="flex-1 p-6 space-y-4">
              <h3 className="text-lg font-semibold">Cari Halaman</h3>
              
              <div className="flex space-x-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari halaman..."
                  disabled={isLoading}
                />
                <Button onClick={searchPages} disabled={isLoading}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {filteredPages.map((page) => (
                    <motion.div
                      key={page.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <h4 className="font-medium text-gray-900">{page.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Diedit: {new Date(page.last_edited_time).toLocaleDateString('id-ID')}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {!user && (
            <div className="p-6 pt-4 border-t">
              <p className="text-xs text-gray-500">
                Silakan masuk untuk menggunakan Notion AI
              </p>
            </div>
          )}
          
          {connectionError && (
            <div className="p-6 pt-4 border-t">
              <p className="text-xs text-red-500">
                ⚠️ Masalah koneksi terdeteksi. Silakan coba lagi atau hubungi administrator.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotionAI;
