'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../utils/colors';

interface Transaction {
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold" style={{ color: colors.base01 }}>
          Recent Transactions
        </h3>
        <button
          className="px-4 py-2 rounded-lg transition-all duration-200"
          style={{ 
            backgroundColor: colors.blue,
            color: colors.base3,
          }}
        >
          Add Transaction
        </button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl"
            style={{ 
              backgroundColor: colors.base3,
              border: `1px solid ${colors.base1}`,
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium" style={{ color: colors.base01 }}>
                  {transaction.description}
                </p>
                <p className="text-sm" style={{ color: colors.base00 }}>
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p 
                  className="font-medium"
                  style={{ 
                    color: transaction.amount > 0 ? colors.green : colors.red 
                  }}
                >
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </p>
                <p className="text-sm" style={{ color: colors.base00 }}>
                  {transaction.category}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
