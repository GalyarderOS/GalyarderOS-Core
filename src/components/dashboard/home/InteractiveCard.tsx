
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface InteractiveCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    value: string;
    change: string;
    gradient: string;
    size?: 'small' | 'medium' | 'large';
  };
  index: number;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: (e: React.PointerEvent<HTMLDivElement>) => void;
  onClick: (e: React.MouseEvent) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  isDragging?: boolean;
}

const InteractiveCard = ({
  item,
  index,
  onPointerMove,
  onPointerLeave,
  onClick,
  onDragStart,
  onDragEnd,
  onContextMenu,
  isDragging = false
}: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const triggerRipple = (e: React.MouseEvent) => {
    const el = rippleRef.current;
    if (!el) return;
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    el.style.width = el.style.height = `${size}px`;
    el.style.left = `${e.clientX - rect.left - size / 2}px`;
    el.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.classList.remove("animate-ripple-effect");
    void el.offsetWidth;
    el.classList.add("animate-ripple-effect");
  };

  const handleClick = (e: React.MouseEvent) => {
    triggerRipple(e);
    setTimeout(() => onClick(e), 150);
  };

  const getSizeClasses = () => {
    switch (item.size) {
      case 'small':
        return 'col-span-1 row-span-1';
      case 'large':
        return 'col-span-2 row-span-2';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: isDragging ? 0.95 : 1,
        zIndex: isDragging ? 50 : 1
      }}
      transition={{ 
        delay: index * 0.05 + 0.2, 
        type: "spring", 
        stiffness: 120,
        damping: 20
      }}
      whileTap={{ scale: 0.98 }}
      drag={true}
      dragElastic={0.1}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`group cursor-pointer select-none relative transition-all duration-500 will-change-transform ${getSizeClasses()} ${
        isDragging ? 'brightness-90 pointer-events-none' : ''
      }`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onContextMenu={onContextMenu}
    >
      <Card className="relative overflow-hidden border-2 border-border group-hover:border-primary/70 transition-all duration-700 bg-card/85 group-hover:bg-card/95 soft-shadow group-hover:soft-shadow-2xl h-full backdrop-blur-md">
        {/* Ripple effect - only on click */}
        <span
          ref={rippleRef}
          className="pointer-events-none absolute rounded-full bg-primary/25 opacity-70 scale-100 z-20"
          style={{ transform: "scale(0)", transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)" }}
        />

        {/* Static background gradient - only animate on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${item.gradient}`} />

        {/* Context menu indicator */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          whileHover={{ scale: 1.1 }}
        >
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </motion.div>

        <CardHeader className="pb-4 relative z-10">
          <div
            className={`w-full h-24 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-700 border border-border relative overflow-hidden`}
          >
            {/* Icon glow effect - only on hover */}
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-100 transition-opacity duration-500" />
            )}
            <div className="text-foreground drop-shadow-lg relative z-10">
              {item.icon}
            </div>
          </div>
          
          <CardTitle className="text-lg font-bold font-playfair text-foreground group-hover:text-primary transition-colors duration-300">
            {item.title}
          </CardTitle>
          <CardDescription className="font-playfair text-sm text-muted-foreground">
            {item.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-foreground font-playfair">{item.value}</div>
              <div className="text-xs font-medium text-muted-foreground font-playfair flex items-center space-x-1">
                <span>{item.change}</span>
                {item.change.includes('+') && <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">↗</Badge>}
                {item.change.includes('-') && <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-600">↘</Badge>}
              </div>
            </div>
            {/* Static arrow - no continuous animation */}
            <div className="group-hover:translate-x-1 group-hover:scale-105 transition-transform duration-300">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>

        {/* Enhanced border glow - only on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 rounded-xl border-2 border-primary/50" />
        </div>
      </Card>

      <style>{`
        .animate-ripple-effect {
          animation: ripple-effect 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes ripple-effect {
          from { transform: scale(0); opacity: 0.8; }
          70%  { transform: scale(2.2); opacity: 0.4; }
          to   { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default InteractiveCard;
