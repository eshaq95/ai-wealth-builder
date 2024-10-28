'use client';  // Add this at the top

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';  // Fixed import
import { useApp } from '../context/AppContext';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import TransactionList from './TransactionList';
import BudgetManager from './BudgetManager';
import Subscriptions from './Subscriptions';

// Solarized Colors
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

const CHART_COLORS = [colors.blue, colors.violet, colors.cyan, colors.green];

interface Asset {
  name: string;
  value: number;
}

interface Portfolio {
  total_value: number;
  assets: Asset[];
}

interface Transaction {
  category: string;
  amount: number;
  date: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [portfolioHistory, setPortfolioHistory] = useState<{ date: string; value: number }[]>([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const router = useRouter();
  const { setIsLoading, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'transactions' | 'investments' | 'subscriptions'>('budget');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/portfolio', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          showToast({ message: 'Session expired. Please login again.', type: 'error' });
          router.push('/');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }

        const data = await response.json();
        console.log('Portfolio data:', data); // Add this for debugging
        setPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        showToast({ message: 'Failed to load portfolio data', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Placeholder data for transactions and portfolio history
    // In a real application, you would fetch this data from the API as well
    setTransactions([
      { category: 'Income', amount: 5000, date: '2023-05-01', description: 'Salary' },
      { category: 'Expense', amount: -1000, date: '2023-05-05', description: 'Rent' },
      { category: 'Investment', amount: -2000, date: '2023-05-10', description: 'Stock Purchase' },
    ]);

    setPortfolioHistory([
      { date: '2023-01', value: 80000 },
      { date: '2023-02', value: 85000 },
      { date: '2023-03', value: 90000 },
      { date: '2023-04', value: 95000 },
      { date: '2023-05', value: 100000 },
    ]);
  }, [router, setIsLoading, showToast]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-[#0A0F23] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7E2AE1]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.base3 }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: colors.base2, borderBottom: `1px solid ${colors.base1}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold" style={{ color: colors.base01 }}>
              AI Wealth Builder
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg transition-all duration-200"
              style={{ 
                backgroundColor: colors.base2,
                color: colors.base01,
                border: `1px solid ${colors.base1}`,
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="rounded-2xl shadow-lg p-6 space-y-4" style={{ backgroundColor: colors.base2 }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: colors.base01 }}>
                Quick Actions
              </h2>
              <button 
                className="w-full py-3 px-4 rounded-xl transition-all duration-200"
                onClick={() => setActiveTab('budget')}
                style={{ 
                  backgroundColor: activeTab === 'budget' ? colors.blue : colors.base2,
                  color: activeTab === 'budget' ? colors.base3 : colors.base01,
                  border: `1px solid ${colors.base1}`
                }}
              >
                Budget Manager
              </button>
              <button 
                className="w-full py-3 px-4 rounded-xl transition-all duration-200"
                onClick={() => setActiveTab('transactions')}
                style={{ 
                  backgroundColor: activeTab === 'transactions' ? colors.blue : colors.base2,
                  color: activeTab === 'transactions' ? colors.base3 : colors.base01,
                  border: `1px solid ${colors.base1}`
                }}
              >
                View Transactions
              </button>
              <button 
                className="w-full py-3 px-4 rounded-xl transition-all duration-200"
                onClick={() => setActiveTab('investments')}
                style={{ 
                  backgroundColor: activeTab === 'investments' ? colors.blue : colors.base2,
                  color: activeTab === 'investments' ? colors.base3 : colors.base01,
                  border: `1px solid ${colors.base1}`
                }}
              >
                Investments
              </button>
              <button 
                className="w-full py-3 px-4 rounded-xl transition-all duration-200"
                onClick={() => setActiveTab('subscriptions')}
                style={{ 
                  backgroundColor: activeTab === 'subscriptions' ? colors.blue : colors.base2,
                  color: activeTab === 'subscriptions' ? colors.base3 : colors.base01,
                  border: `1px solid ${colors.base1}`
                }}
              >
                Subscriptions
              </button>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="lg:col-span-3 rounded-2xl shadow-lg p-6"
            style={{ backgroundColor: colors.base2 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'budget' && <BudgetManager />}
              {activeTab === 'transactions' && <TransactionList transactions={transactions} />}
              {activeTab === 'investments' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6" style={{ color: colors.base01 }}>
                    Portfolio Overview
                  </h2>
                  {portfolio && (
                    <>
                      <div className="text-3xl font-bold mb-8" style={{ color: colors.blue }}>
                        ${portfolio.total_value.toLocaleString()}
                      </div>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={portfolio.assets}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {portfolio.assets.map((entry: Asset, index: number) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: colors.base2,
                                border: `1px solid ${colors.base1}`,
                                borderRadius: '8px',
                                color: colors.base01
                              }}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  )}
                </div>
              )}
              {activeTab === 'subscriptions' && <Subscriptions />}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
