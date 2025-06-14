
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
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
  X,
  Calendar,
  Clock,
  Eye,
  ExternalLink
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
  url?: string;
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
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  
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
      const allPages = response.pages || [];
      setPages(allPages);
      setTotalPages(Math.ceil(allPages.length / itemsPerPage));
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
      const searchResults = response.pages || [];
      setPages(searchResults);
      setTotalPages(Math.ceil(searchResults.length / itemsPerPage));
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const viewPage = (page: NotionPage) => {
    setSelectedPage(page);
  };

  const openInNotion = (pageId: string) => {
    const notionUrl = `https://notion.so/${pageId.replace(/-/g, '')}`;
    window.open(notionUrl, '_blank');
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

  // Calculate paginated pages
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPages = pages.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span>Notion AI Management</span>
            {connectionError && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-6 py-2 border-b">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="browse">Browse Pages</TabsTrigger>
                <TabsTrigger value="create">Create Page</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="view" disabled={!selectedPage}>View Page</TabsTrigger>
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
                  {paginatedPages.map((page) => (
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
                            <h4 className="font-medium text-gray-900 mb-2">{page.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Created: {formatDate(page.created_time)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>Edited: {formatDate(page.last_edited_time)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => viewPage(page)}
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openInNotion(page.id)}
                              title="Open in Notion"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingPage({...page, content: page.content || ''})}
                              title="Edit page"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deletePage(page.id)}
                              className="text-red-600 hover:text-red-700"
                              title="Delete page"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {paginatedPages.length === 0 && !isLoading && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-lg font-medium">No pages found</p>
                      <p className="text-sm">Create your first page or adjust your search</p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {generatePageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                          {page === 'ellipsis' ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              onClick={() => setCurrentPage(page as number)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </TabsContent>

            <TabsContent value="create" className="flex-1 p-6 space-y-4">
              <h3 className="text-lg font-semibold">Create New Page</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Page Title</label>
                  <Input
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    placeholder="Enter page title..."
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea
                    value={newPageContent}
                    onChange={(e) => setNewPageContent(e.target.value)}
                    placeholder="Enter page content..."
                    className="min-h-[300px]"
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
                  Create Page
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="search" className="flex-1 p-6 space-y-4">
              <h3 className="text-lg font-semibold">Search Pages</h3>
              
              <div className="flex space-x-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages..."
                  disabled={isLoading}
                />
                <Button onClick={searchPages} disabled={isLoading}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {pages.map((page) => (
                    <motion.div
                      key={page.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => viewPage(page)}
                    >
                      <h4 className="font-medium text-gray-900">{page.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Edited: {formatDate(page.last_edited_time)}
                      </p>
                    </motion.div>
                  ))}
                  
                  {pages.length === 0 && !isLoading && searchQuery && (
                    <div className="text-center py-8 text-gray-500">
                      <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-lg font-medium">No results found</p>
                      <p className="text-sm">Try a different search term</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="view" className="flex-1 p-6 space-y-4">
              {selectedPage && (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedPage.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Created: {formatDate(selectedPage.created_time)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Last edited: {formatDate(selectedPage.last_edited_time)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openInNotion(selectedPage.id)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open in Notion
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingPage({...selectedPage, content: selectedPage.content || ''});
                          setActiveTab('browse');
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px]">
                    <h4 className="font-medium mb-2">Content Preview</h4>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                      {selectedPage.content || 'No content available'}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {!user && (
            <div className="p-6 pt-4 border-t">
              <p className="text-xs text-gray-500">
                Please sign in to use Notion AI
              </p>
            </div>
          )}
          
          {connectionError && (
            <div className="p-6 pt-4 border-t">
              <p className="text-xs text-red-500">
                ⚠️ Connection issues detected. Please try again or contact administrator.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotionAI;
