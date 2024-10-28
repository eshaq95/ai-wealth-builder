'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { colors } from '../utils/colors';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setIsLoading, showToast } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        // First navigate
        await router.push('/dashboard');
        // Then show toast only if needed for errors
      } else {
        const errorData = await response.json();
        showToast({ message: errorData.detail || 'Invalid credentials', type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast({ message: 'Network error occurred', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="email" className="block text-sm font-medium" style={{ color: colors.base01 }}>
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-5 py-4 rounded-xl transition-all duration-300"
          style={{ 
            backgroundColor: colors.base3,
            color: colors.base01,
            border: `1px solid ${colors.base1}`,
          }}
          placeholder="Enter your email"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label htmlFor="password" className="block text-sm font-medium" style={{ color: colors.base01 }}>
          Password
        </label>
        <div className="mt-1 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full px-5 py-4 rounded-xl transition-all duration-300"
            style={{ 
              backgroundColor: colors.base3,
              color: colors.base01,
              border: `1px solid ${colors.base1}`,
            }}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md transition-all duration-200"
            style={{ 
              color: colors.base01,
              opacity: 0.7,
              fontSize: '0.875rem',
            }}
          >
            {showPassword ? (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </motion.div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded transition-colors duration-200"
            style={{ 
              borderColor: colors.base1,
              backgroundColor: colors.base3,
              accentColor: colors.blue,
            }}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: colors.base01 }}>
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a 
            href="#" 
            className="font-medium hover:opacity-80 transition-opacity duration-200"
            style={{ color: colors.blue }}
          >
            Forgot password?
          </a>
        </div>
      </div>

      <motion.button
        type="submit"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full flex justify-center py-4 px-6 rounded-xl text-base font-semibold transition-all duration-300"
        style={{ 
          backgroundColor: colors.blue,
          color: colors.base3,
        }}
      >
        Sign In
      </motion.button>
    </form>
  );
};

export default LoginForm;
