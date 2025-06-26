import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/global/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ModuleCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  module: "identity" | "vision" | "balance" | "ritual";
  className?: string;
  headerContent?: React.ReactNode;
  animate?: boolean;
  delay?: number;
}

export function ModuleCard({
  title,
  subtitle,
  icon,
  children,
  module,
  className,
  headerContent,
  animate = true,
  delay = 0,
}: ModuleCardProps) {
  const moduleBorderColors = {
    identity: "hover:border-purple-500/30",
    vision: "hover:border-blue-500/30",
    balance: "hover:border-cyan-500/30",
    ritual: "hover:border-emerald-500/30",
  };

  const cardContent = (
    <Card className={cn(
      "h-full flex flex-col",
      "bg-card/80 dark:bg-card/60 backdrop-blur-sm border-border/50 shadow-sm transition-shadow hover:shadow-lg",
      moduleBorderColors[module] || '',
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-4">
          {icon && <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/80 to-primary/50 text-primary-foreground shadow-inner">
            {icon}
          </div>}
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>
        </div>
        {headerContent}
      </CardHeader>
      <CardContent className="flex-grow h-full">
        {children}
      </CardContent>
    </Card>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}