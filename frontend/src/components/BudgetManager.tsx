'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { colors } from '../utils/colors';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

interface BudgetCategory {
  name: string;
  planned: number;
  actual: number;
}

interface MonthlyIncome {
  source: string;
  amount: number;
}

const BudgetManager: React.FC = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { name: 'Housing', planned: 2000, actual: 1950 },
    { name: 'Transportation', planned: 500, actual: 450 },
    { name: 'Food', planned: 800, actual: 920 },
    { name: 'Utilities', planned: 300, actual: 280 },
    { name: 'Entertainment', planned: 400, actual: 380 },
    { name: 'Savings', planned: 1000, actual: 1000 },
  ]);

  const [income, setIncome] = useState<MonthlyIncome[]>([
    { source: 'Salary', amount: 5000 },
    { source: 'Freelance', amount: 1000 },
    { source: 'Investments', amount: 500 },
  ]);

  const totalIncome = income.reduce((sum, source) => sum + source.amount, 0);
  const totalPlanned = categories.reduce((sum, cat) => sum + cat.planned, 0);
  const totalActual = categories.reduce((sum, cat) => sum + cat.actual, 0);
  const savingsRate = ((totalIncome - totalActual) / totalIncome * 100).toFixed(1);

  const COLORS = [colors.blue, colors.violet, colors.cyan, colors.green, colors.yellow, colors.orange];

  const getAIRecommendations = () => {
    // This would connect to your AI backend
    return [
      "Consider reducing entertainment spending by 10%",
      "You're on track with your savings goal",
      "Food expenses are slightly over budget",
      "Great job keeping utilities under budget!"
    ];
  };

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-6 shadow-lg"
          style={{ backgroundColor: colors.base2 }}
        >
          <h3 className="text-sm font-medium" style={{ color: colors.base01 }}>Total Income</h3>
          <p className="text-2xl font-bold mt-2" style={{ color: colors.green }}>
            ${totalIncome.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl p-6 shadow-lg"
          style={{ backgroundColor: colors.base2 }}
        >
          <h3 className="text-sm font-medium" style={{ color: colors.base01 }}>Total Expenses</h3>
          <p className="text-2xl font-bold mt-2" style={{ color: colors.red }}>
            ${totalActual.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl p-6 shadow-lg"
          style={{ backgroundColor: colors.base2 }}
        >
          <h3 className="text-sm font-medium" style={{ color: colors.base01 }}>Savings Rate</h3>
          <p className="text-2xl font-bold mt-2" style={{ color: colors.blue }}>
            {savingsRate}%
          </p>
        </motion.div>
      </div>

      {/* Budget vs Actual Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-6 shadow-lg"
        style={{ backgroundColor: colors.base2 }}
      >
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.base01 }}>
          Budget vs Actual
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categories}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.base1} />
              <XAxis dataKey="name" style={{ fill: colors.base01 }} />
              <YAxis style={{ fill: colors.base01 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.base2,
                  border: `1px solid ${colors.base1}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="planned" name="Planned" fill={colors.blue} />
              <Bar dataKey="actual" name="Actual" fill={colors.violet} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-6 shadow-lg"
        style={{ backgroundColor: colors.base2 }}
      >
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.base01 }}>
          AI Recommendations
        </h3>
        <div className="space-y-3">
          {getAIRecommendations().map((recommendation, index) => (
            <div
              key={index}
              className="p-4 rounded-lg flex items-start gap-3"
              style={{ backgroundColor: colors.base3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke={colors.blue}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <p style={{ color: colors.base01 }}>{recommendation}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BudgetManager;
