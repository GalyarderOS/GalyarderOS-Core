
import { motion, AnimatePresence } from 'framer-motion';

interface OSMainContentProps {
  children: React.ReactNode;
  currentPath: string;
}

const OSMainContent = ({ children, currentPath }: OSMainContentProps) => {
  return (
    <div className="pt-16 pb-20 px-6 min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OSMainContent;
