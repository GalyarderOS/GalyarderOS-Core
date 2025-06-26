
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/global/ui/card';
import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/global/ui/badge';
import { Button } from '@/components/global/ui/button';

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
}) => {
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
    <div
      className={`group cursor-pointer select-none relative transition-all duration-150 ${getSizeClasses()} ${isDragging ? 'opacity-70 pointer-events-none' : ''}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable={true}
      style={{ zIndex: isDragging ? 50 : 1 }}
    >
      <Card className="relative overflow-hidden border bg-card h-full shadow group-hover:shadow-lg group-hover:border-primary/50 transition-all duration-150">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-10">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <CardHeader className="pb-4 relative z-10">
          <div className={`w-full h-24 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-4`}>
            <div className="text-foreground relative z-10">{item.icon}</div>
          </div>
          <CardTitle className="text-lg font-bold font-playfair text-foreground group-hover:text-primary transition-colors">
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
            <div className="transition-colors group-hover:text-primary">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveCard;
