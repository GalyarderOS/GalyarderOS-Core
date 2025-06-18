import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModuleHeaderProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  module: "identity" | "vision" | "balance" | "ritual";
  className?: string;
}

export function ModuleHeader({
  title,
  description,
  icon,
  module,
  className,
}: ModuleHeaderProps) {
  const moduleGradients = {
    identity: "from-purple-600 to-blue-600",
    vision: "from-blue-600 to-indigo-600",
    balance: "from-cyan-600 to-blue-600",
    ritual: "from-emerald-600 to-green-600",
  };

  const moduleTextGradients = {
    identity: "from-purple-600 to-blue-600",
    vision: "from-blue-600 to-indigo-600",
    balance: "from-cyan-600 to-blue-600",
    ritual: "from-emerald-600 to-green-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-center space-x-3", className)}
    >
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center",
        `bg-gradient-to-br ${moduleGradients[module] || ''}`
      )}>
        {icon}
      </div>
      <div className="text-left">
        <h1 className={cn(
          "text-4xl font-bold font-playfair",
          `bg-gradient-to-r ${moduleTextGradients[module] || ''} bg-clip-text text-transparent`
        )}>
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
    </motion.div>
  );
}