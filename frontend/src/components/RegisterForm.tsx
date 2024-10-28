'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { colors } from '../utils/colors';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [riskTolerance, setRiskTolerance] = useState(0.5);
  const router = useRouter();
  const { setIsLoading, showToast } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast({ message: 'Passwords do not match', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          risk_tolerance: riskTolerance
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        showToast({ message: 'Account created successfully!', type: 'success' });
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        showToast({ message: errorData.detail || 'Registration failed', type: 'error' });
      }
    } catch (error) {
      console.error('Registration error:', error);
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
        <label htmlFor="register-email" className="block text-sm font-medium" style={{ color: colors.base01 }}>
          Email
        </label>
        <input
          type="email"
          id="register-email"
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
        <label htmlFor="register-password" className="block text-sm font-medium" style={{ color: colors.base01 }}>
          Password
        </label>
        <input
          type="password"
          id="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-5 py-4 rounded-xl transition-all duration-300"
          style={{ 
            backgroundColor: colors.base3,
            color: colors.base01,
            border: `1px solid ${colors.base1}`,
          }}
          placeholder="Create a password"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="confirm-password" className="block text-sm font-medium" style={{ color: colors.base01 }}>
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1 block w-full px-5 py-4 rounded-xl transition-all duration-300"
          style={{ 
            backgroundColor: colors.base3,
            color: colors.base01,
            border: `1px solid ${colors.base1}`,
          }}
          placeholder="Confirm your password"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label className="block text-sm font-medium" style={{ color: colors.base01 }}>
          Risk Tolerance
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={riskTolerance}
          onChange={(e) => setRiskTolerance(parseFloat(e.target.value))}
          className="w-full h-2 mt-2"
          style={{ 
            accentColor: colors.blue,
            backgroundColor: colors.base2
          }}
        />
        <div className="flex justify-between text-sm mt-1" style={{ color: colors.base01 }}>
          <span>Conservative</span>
          <span>Moderate</span>
          <span>Aggressive</span>
        </div>
      </motion.div>

      <motion.button
        type="submit"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full flex justify-center py-4 px-6 rounded-xl text-base font-semibold transition-all duration-300"
        style={{ 
          backgroundColor: colors.blue,
          color: colors.base3,
        }}
      >
        Create Account
      </motion.button>
    </form>
  );
};

export default RegisterForm;
