import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ModuleCardProps {
  title: string;
  children: React.ReactNode;
  module: "identity" | "vision" | "balance" | "ritual";
  className?: string;
  headerContent?: React.ReactNode;
  animate?: boolean;
  delay?: number;
}

export function ModuleCard({
  title,
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
      "bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg transition-all duration-300",
      moduleBorderColors[module],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold font-playfair">{title}</CardTitle>
        {headerContent}
      </CardHeader>
      <CardContent>
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