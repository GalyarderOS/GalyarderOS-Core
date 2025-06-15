
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Command {
  id: string;
  label: string;
  action: () => void;
  category: string;
  keywords: string[];
  shortcut?: string;
}

export const useCommandPalette = (onOpenAIAssistant?: () => void, onOpenNotionAI?: () => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const commands: Command[] = [
    {
      id: 'identity-core',
      label: 'Open Identity Core',
      action: () => navigate('/dashboard/identity'),
      category: 'Navigation',
      keywords: ['identity', 'core', 'profile', 'user'],
      shortcut: 'I'
    },
    {
      id: 'vision-architecture',
      label: 'Open Vision Architecture',
      action: () => navigate('/dashboard/vision'),
      category: 'Navigation',
      keywords: ['vision', 'goals', 'roadmap'],
      shortcut: 'V'
    },
    {
      id: 'ritual-engine',
      label: 'Open Ritual Engine',
      action: () => navigate('/dashboard/ritual'),
      category: 'Navigation',
      keywords: ['ritual', 'habits', 'daily'],
      shortcut: 'R'
    },
    {
      id: 'flow-state',
      label: 'Open Flow State',
      action: () => navigate('/dashboard/flow'),
      category: 'Navigation',
      keywords: ['flow', 'timer', 'focus'],
      shortcut: 'F'
    },
    {
      id: 'knowledge-hub',
      label: 'Open Knowledge Hub',
      action: () => navigate('/dashboard/knowledge'),
      category: 'Navigation',
      keywords: ['knowledge', 'memory', 'archive'],
      shortcut: 'K'
    },
    {
      id: 'ai-assistant',
      label: 'Open AI Assistant',
      action: () => onOpenAIAssistant?.(),
      category: 'AI Tools',
      keywords: ['ai', 'assistant', 'help'],
      shortcut: 'A'
    },
    {
      id: 'notion-ai',
      label: 'Open Notion AI',
      action: () => onOpenNotionAI?.(),
      category: 'AI Tools',
      keywords: ['notion', 'ai', 'notes'],
      shortcut: 'N'
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.label.toLowerCase().includes(search.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(search.toLowerCase()))
  );

  const togglePalette = useCallback(() => {
    setIsOpen(prev => !prev);
    setSearch('');
  }, []);

  const executeCommand = useCallback((command: Command) => {
    command.action();
    setIsOpen(false);
    setSearch('');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePalette]);

  return {
    isOpen,
    search,
    setSearch,
    commands: filteredCommands,
    togglePalette,
    executeCommand
  };
};
