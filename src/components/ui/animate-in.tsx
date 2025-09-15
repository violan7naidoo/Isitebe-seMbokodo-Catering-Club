'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimateInProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
};

export function AnimateIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: AnimateInProps) {
  const directionMap = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px 0px' }}
      transition={{
        duration: 0.6,
        delay: delay * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
