
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardModules } from '@/components/dashboard/os/modules';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { language } = useTheme();

  // Generate commands dynamically from modules
  const generateCommands = useCallback((): Command[] => {
    const modules = getDashboardModules(language, onOpenAIAssistant, onOpenNotionAI);
    
    return modules.map(module => {
      // Determine category based on module category
      let category = '';
      switch (module.category) {
        case 'personal':
          category = language === 'id' ? 'Personal' : 'Personal';
          break;
        case 'finance':
          category = language === 'id' ? 'Keuangan' : 'Finance';
          break;
        case 'ai':
          category = language === 'id' ? 'AI Tools' : 'AI Tools';
          break;
        case 'system':
          category = language === 'id' ? 'Sistem' : 'System';
          break;
        default:
          category = language === 'id' ? 'Umum' : 'General';
      }

      // Generate keywords based on module label and common terms
      const keywords = [
        module.label.toLowerCase(),
        ...module.label.toLowerCase().split(' '),
      ];

      // Add specific keywords for each module
      if (module.id.includes('identity')) keywords.push('profile', 'profil', 'user', 'identitas');
      if (module.id.includes('vision')) keywords.push('goals', 'tujuan', 'roadmap', 'future');
      if (module.id.includes('balance')) keywords.push('life', 'hidup', 'wellness', 'kesehatan');
      if (module.id.includes('ritual')) keywords.push('habits', 'kebiasaan', 'daily', 'harian');
      if (module.id.includes('focus')) keywords.push('timer', 'concentration', 'konsentrasi', 'work');
      if (module.id.includes('knowledge')) keywords.push('notes', 'catatan', 'memory', 'ingatan');
      if (module.id.includes('calendar')) keywords.push('schedule', 'jadwal', 'events', 'acara');
      if (module.id.includes('reflection')) keywords.push('journal', 'jurnal', 'thoughts', 'pikiran');
      if (module.id.includes('analytics')) keywords.push('stats', 'statistik', 'reports', 'laporan');
      if (module.id.includes('investment')) keywords.push('stocks', 'saham', 'portfolio', 'money');
      if (module.id.includes('cashflow')) keywords.push('income', 'pendapatan', 'cash', 'kas');
      if (module.id.includes('expenses')) keywords.push('spending', 'pengeluaran', 'bills', 'tagihan');
      if (module.id.includes('wealth')) keywords.push('assets', 'aset', 'net worth', 'kekayaan');
      if (module.id.includes('tax')) keywords.push('pajak', 'tax', 'filing', 'lapor');
      if (module.id.includes('debt')) keywords.push('hutang', 'loan', 'pinjaman', 'kredit');
      if (module.id.includes('settings')) keywords.push('config', 'konfigurasi', 'preferences', 'pengaturan');

      // Generate shortcut based on first letter of main word
      const firstWord = module.label.split(' ')[0];
      const shortcut = firstWord.charAt(0).toUpperCase();

      return {
        id: module.id,
        label: module.label,
        action: () => {
          if (module.action) {
            module.action();
          } else if (module.path) {
            navigate(module.path);
          }
        },
        category,
        keywords,
        shortcut
      };
    });
  }, [language, navigate, onOpenAIAssistant, onOpenNotionAI]);

  const [commands, setCommands] = useState<Command[]>([]);

  // Update commands when language or callbacks change
  useEffect(() => {
    setCommands(generateCommands());
  }, [generateCommands]);

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
