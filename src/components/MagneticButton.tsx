"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  strength = 0.35,
  block = false,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  block?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * strength, y: relY * strength });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.5 }}
      className={`${block ? "block w-full" : "inline-block"} ${className}`}
    >
      {children}
    </motion.div>
  );
}
