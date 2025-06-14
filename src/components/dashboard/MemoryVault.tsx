
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, BookOpen, Calendar, Tag, Edit, Trash2 } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  content: string;
  tags: string[];
  date: string;
  category: string;
}

const MemoryVault = () => {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      title: 'Team Building Insights',
      content: 'Great session on async communication. Key takeaway: over-communicate context, especially in remote teams.',
      tags: ['leadership', 'team', 'remote-work'],
      date: '2024-06-14',
      category: 'Learning'
    },
    {
      id: '2',
      title: 'Product Launch Strategy',
      content: 'Successful launch requires 3 months of pre-marketing. Build audience before building product.',
      tags: ['product', 'marketing', 'startup'],
      date: '2024-06-13',
      category: 'Business'
    },
    {
      id: '3',
      title: 'TypeScript Best Practices',
      content: 'Use utility types like Partial<T> and Pick<T, K> for flexible interfaces. Avoid any at all costs.',
      tags: ['typescript', 'programming', 'best-practices'],
      date: '2024-06-12',
      category: 'Technical'
    },
    {
      id: '4',
      title: 'Coffee with Sarah',
      content: 'Great conversation about work-life balance. Reminder: boundaries are not walls, they are bridges.',
      tags: ['personal', 'inspiration', 'balance'],
      date: '2024-06-11',
      category: 'Personal'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [newMemory, setNewMemory] = useState({
    title: '',
    content: '',
    tags: '',
    category: 'Learning'
  });

  const categories = ['all', 'Learning', 'Business', 'Technical', 'Personal'];

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || memory.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddMemory = () => {
    if (!newMemory.title.trim() || !newMemory.content.trim()) return;

    const memory: Memory = {
      id: Date.now().toString(),
      title: newMemory.title,
      content: newMemory.content,
      tags: newMemory.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: new Date().toISOString().split('T')[0],
      category: newMemory.category
    };

    setMemories([memory, ...memories]);
    setNewMemory({ title: '', content: '', tags: '', category: 'Learning' });
    setIsAddingMemory(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Learning': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Business': return 'bg-green-100 text-green-800 border-green-200';
      case 'Technical': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Personal': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Playfair Display' }}>
            Memory Vault
          </h1>
          <p className="text-gray-600">Capture and organize your valuable insights</p>
        </div>
        <Button 
          onClick={() => setIsAddingMemory(true)}
          className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Memory
        </Button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search memories, tags, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Add Memory Form */}
      {isAddingMemory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Add New Memory</CardTitle>
              <CardDescription>Capture something valuable for future reference</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Memory title..."
                value={newMemory.title}
                onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
              />
              
              <Textarea
                placeholder="Describe your memory, insight, or learning..."
                value={newMemory.content}
                onChange={(e) => setNewMemory({...newMemory, content: e.target.value})}
                rows={4}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Tags (comma separated)"
                  value={newMemory.tags}
                  onChange={(e) => setNewMemory({...newMemory, tags: e.target.value})}
                />
                
                <select
                  value={newMemory.category}
                  onChange={(e) => setNewMemory({...newMemory, category: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="Learning">Learning</option>
                  <option value="Business">Business</option>
                  <option value="Technical">Technical</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleAddMemory} className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]">
                  Save Memory
                </Button>
                <Button variant="outline" onClick={() => setIsAddingMemory(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center space-x-2 p-4">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <div>
              <div className="text-2xl font-bold">{memories.length}</div>
              <div className="text-xs text-gray-500">Total Memories</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center space-x-2 p-4">
            <Tag className="h-5 w-5 text-green-600" />
            <div>
              <div className="text-2xl font-bold">
                {new Set(memories.flatMap(m => m.tags)).size}
              </div>
              <div className="text-xs text-gray-500">Unique Tags</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center space-x-2 p-4">
            <Calendar className="h-5 w-5 text-purple-600" />
            <div>
              <div className="text-2xl font-bold">
                {memories.filter(m => m.date === new Date().toISOString().split('T')[0]).length}
              </div>
              <div className="text-xs text-gray-500">Added Today</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center space-x-2 p-4">
            <BookOpen className="h-5 w-5 text-orange-600" />
            <div>
              <div className="text-2xl font-bold">{categories.length - 1}</div>
              <div className="text-xs text-gray-500">Categories</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Memories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{memory.title}</CardTitle>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className={getCategoryColor(memory.category)}>
                        {memory.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(memory.date)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">{memory.content}</p>
                
                {memory.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {memory.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredMemories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No memories found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Start capturing your valuable insights and learnings.'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MemoryVault;
