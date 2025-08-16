'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn, formatNumber, getBallColor } from '@/lib/utils';

interface LottoBallProps {
  number: number;
  index?: number;
  isBonus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function LottoBall({ 
  number, 
  index = 0, 
  isBonus = false,
  size = 'md',
  animated = true 
}: LottoBallProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-lg',
    lg: 'w-20 h-20 text-2xl',
  };

  const ballContent = (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full text-white font-bold shadow-lg',
        sizeClasses[size],
        getBallColor(number),
        isBonus && 'ring-4 ring-yellow-300 ring-offset-2'
      )}
    >
      <span className="relative z-10">{formatNumber(number)}</span>
      
      {/* Glossy effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/40" />
      
      {/* Inner shadow */}
      <div className="absolute inset-0 rounded-full shadow-inner" />
    </div>
  );

  if (!animated) {
    return ballContent;
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
    >
      {ballContent}
    </motion.div>
  );
}

interface LottoBallGroupProps {
  numbers: number[];
  bonusNumber?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export function LottoBallGroup({ 
  numbers, 
  bonusNumber,
  size = 'md',
  animated = true,
  className 
}: LottoBallGroupProps) {
  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      {numbers.map((number, index) => (
        <LottoBall
          key={`number-${number}`}
          number={number}
          index={index}
          size={size}
          animated={animated}
        />
      ))}
      
      {bonusNumber && (
        <>
          <div className="mx-2 text-2xl text-gray-400">+</div>
          <LottoBall
            number={bonusNumber}
            index={numbers.length}
            isBonus
            size={size}
            animated={animated}
          />
        </>
      )}
    </div>
  );
}