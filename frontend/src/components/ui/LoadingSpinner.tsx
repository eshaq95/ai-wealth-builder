'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../utils/colors';

export const LoadingSpinner: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-2xl shadow-xl"
      style={{ backgroundColor: colors.base2 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-blue-500 rounded-full animate-spin"
          style={{ borderTopColor: colors.blue }}
        ></div>
        <p style={{ color: colors.base01 }}>Loading...</p>
      </div>
    </motion.div>
  </div>
);
