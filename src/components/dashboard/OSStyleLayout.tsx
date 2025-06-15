
import { useOSLayout } from './os/useOSLayout';
import TopBar from './os/TopBar';
import Dock from './os/Dock';
import WindowManager from './os/WindowManager';
import OSMainContent from './os/OSMainContent';

interface OSStyleLayoutProps {
  children: React.ReactNode;
  onOpenAIAssistant?: () => void;
  onOpenNotionAI?: () => void;
}

const OSStyleLayout = ({ children, onOpenAIAssistant, onOpenNotionAI }: OSStyleLayoutProps) => {
  const {
    user,
    profile,
    theme,
    setTheme,
    language,
    modules,
    currentPath,
    openWindows,
    activeWindow,
    handleModuleClick,
    closeWindow,
    setActiveWindow,
    handleSignOut,
  } = useOSLayout(onOpenAIAssistant, onOpenNotionAI);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <TopBar 
        user={user}
        profile={profile}
        theme={theme}
        setTheme={setTheme}
        language={language}
        onSearch={() => {}}
        onSignOut={handleSignOut}
        onOpenAIAssistant={onOpenAIAssistant}
        onOpenNotionAI={onOpenNotionAI}
      />

      <OSMainContent currentPath={currentPath}>
        {children}
      </OSMainContent>

      <Dock 
        modules={modules}
        currentPath={currentPath}
        onModuleClick={handleModuleClick}
      />

      <WindowManager 
        openWindows={openWindows}
        activeWindow={activeWindow}
        modules={modules}
        onClose={closeWindow}
        onActivate={setActiveWindow}
      />
    </div>
  );
};

export default OSStyleLayout;
