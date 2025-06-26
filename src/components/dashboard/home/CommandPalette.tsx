
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/global/ui/input';
import { Badge } from '@/components/global/ui/badge';

interface Command {
  id: string;
  label: string;
  action: () => void;
  category: string;
  keywords: string[];
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  search: string;
  setSearch: (search: string) => void;
  commands: Command[];
  executeCommand: (command: Command) => void;
}

const CommandPalette = ({ isOpen, search, setSearch, commands, executeCommand }: CommandPaletteProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 mx-4"
          >
            <div className="bg-card border border-border rounded-2xl soft-shadow-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search commands... (Cmd+K)"
                    className="pl-10 pr-4 bg-background border-0 focus:ring-0 text-lg"
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {commands.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No commands found
                  </div>
                ) : (
                  <div className="p-2">
                    {Object.entries(
                      commands.reduce((acc, command) => {
                        if (!acc[command.category]) acc[command.category] = [];
                        acc[command.category].push(command);
                        return acc;
                      }, {} as Record<string, Command[]>)
                    ).map(([category, categoryCommands]) => (
                      <div key={category} className="mb-4">
                        <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {category}
                        </div>
                        {categoryCommands.map((command) => (
                          <motion.button
                            key={command.id}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => executeCommand(command)}
                            className="w-full p-3 rounded-lg hover:bg-muted/50 flex items-center justify-between group transition-all"
                          >
                            <div className="flex items-center space-x-3">
                              <Command className="h-4 w-4 text-muted-foreground" />
                              <span className="text-foreground font-medium">{command.label}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {command.shortcut && (
                                <Badge variant="outline" className="text-xs">
                                  ⌘{command.shortcut}
                                </Badge>
                              )}
                              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
