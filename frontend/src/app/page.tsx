'use client';

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

// Solarized Light Colors
const colors = {
  base03: '#002b36',
  base02: '#073642',
  base01: '#586e75',
  base00: '#657b83',
  base0: '#839496',
  base1: '#93a1a1',
  base2: '#eee8d5',
  base3: '#fdf6e3',
  yellow: '#b58900',
  orange: '#cb4b16',
  red: '#dc322f',
  magenta: '#d33682',
  violet: '#6c71c4',
  blue: '#268bd2',
  cyan: '#2aa198',
  green: '#859900'
};

// Replace the decorative rings with meaningful graphics
const SecurityBadge = () => (
  <div className="absolute bottom-10 right-10 flex items-center gap-2 p-4 rounded-lg" 
    style={{ backgroundColor: colors.base2, color: colors.base01 }}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
    <span className="text-sm font-medium">Bank-grade Security</span>
  </div>
);

const AiBadge = () => (
  <div className="absolute top-10 left-10 flex items-center gap-2 p-4 rounded-lg"
    style={{ backgroundColor: colors.base2, color: colors.base01 }}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    <span className="text-sm font-medium">AI-Powered</span>
  </div>
);

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen" style={{ backgroundColor: colors.base3 }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10"></div>

      <div className="relative flex min-h-screen flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3"
          >
            <h1 className="text-5xl font-semibold tracking-tight" style={{ color: colors.base01 }}>
              AI Wealth Builder
            </h1>
            <p className="text-lg" style={{ color: colors.base00 }}>
              Professional AI-Powered Investment Management
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl shadow-lg overflow-hidden"
            style={{ backgroundColor: colors.base2 }}
          >
            <div className="p-1 gap-1 flex" style={{ backgroundColor: colors.base3 }}>
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-base font-medium rounded-xl transition-all duration-300`}
                style={{
                  backgroundColor: isLogin ? colors.blue : 'transparent',
                  color: isLogin ? colors.base3 : colors.base00,
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-base font-medium rounded-xl transition-all duration-300`}
                style={{
                  backgroundColor: !isLogin ? colors.blue : 'transparent',
                  color: !isLogin ? colors.base3 : colors.base00,
                }}
              >
                Create Account
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-8"
              >
                {isLogin ? <LoginForm /> : <RegisterForm />}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm"
            style={{ color: colors.base01 }}
          >
            <p>Protected by enterprise-grade security</p>
          </motion.div>

          {/* Replace the decorative rings with meaningful badges */}
          <AiBadge />
          <SecurityBadge />
        </div>
      </div>
    </main>
  );
}
