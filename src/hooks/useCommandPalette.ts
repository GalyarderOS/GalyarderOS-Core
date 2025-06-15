
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
      id: 'profile',
      label: 'Open Profile',
      action: () => navigate('/dashboard/profile'),
      category: 'Navigation',
      keywords: ['profile', 'user', 'settings'],
      shortcut: 'P'
    },
    {
      id: 'vision',
      label: 'Open Vision & Roadmap',
      action: () => navigate('/dashboard/vision'),
      category: 'Navigation',
      keywords: ['vision', 'goals', 'roadmap'],
      shortcut: 'V'
    },
    {
      id: 'habits',
      label: 'Open Daily Rituals',
      action: () => navigate('/dashboard/habits'),
      category: 'Navigation',
      keywords: ['habits', 'daily', 'rituals'],
      shortcut: 'H'
    },
    {
      id: 'focus',
      label: 'Open Focus Timer',
      action: () => navigate('/dashboard/focus'),
      category: 'Navigation',
      keywords: ['focus', 'timer', 'productivity'],
      shortcut: 'F'
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
