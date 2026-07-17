"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { blurIn, fadeUp, fromLeft, fromRight, scaleIn, viewportOnce } from "@/lib/motion";

const VARIANTS = { up: fadeUp, left: fromLeft, right: fromRight, blur: blurIn, scale: scaleIn };

export default function Reveal({
  children,
  variant = "up",
  index = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={VARIANTS[variant]}
      custom={index}
      className={className}
    >
      {children}
    </motion.div>
  );
}
