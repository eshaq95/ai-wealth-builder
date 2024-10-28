'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../utils/colors';

interface Subscription {
  name: string;
  amount: number;
  billingCycle: 'Monthly' | 'Yearly' | 'Weekly';
  category: string;
  nextBilling: string;
  logo?: string;
}

const Subscriptions: React.FC = () => {
  // Example subscriptions
  const subscriptions: Subscription[] = [
    {
      name: "Netflix",
      amount: 15.99,
      billingCycle: "Monthly",
      category: "Entertainment",
      nextBilling: "2024-03-15",
      logo: "🎬"
    },
    {
      name: "Spotify",
      amount: 9.99,
      billingCycle: "Monthly",
      category: "Entertainment",
      nextBilling: "2024-03-20",
      logo: "🎵"
    },
    {
      name: "Amazon Prime",
      amount: 139,
      billingCycle: "Yearly",
      category: "Shopping",
      nextBilling: "2024-12-01",
      logo: "📦"
    },
    {
      name: "Gym Membership",
      amount: 49.99,
      billingCycle: "Monthly",
      category: "Health",
      nextBilling: "2024-03-01",
      logo: "💪"
    },
    {
      name: "iCloud Storage",
      amount: 2.99,
      billingCycle: "Monthly",
      category: "Technology",
      nextBilling: "2024-03-15",
      logo: "☁️"
    }
  ];

  const monthlyTotal = subscriptions.reduce((total, sub) => {
    if (sub.billingCycle === 'Monthly') {
      return total + sub.amount;
    } else if (sub.billingCycle === 'Yearly') {
      return total + (sub.amount / 12);
    }
    return total;
  }, 0);

  const yearlyTotal = monthlyTotal * 12;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-6 shadow-lg"
          style={{ backgroundColor: colors.base3 }}
        >
          <h3 className="text-sm font-medium" style={{ color: colors.base01 }}>Monthly Total</h3>
          <p className="text-2xl font-bold mt-2" style={{ color: colors.blue }}>
            ${monthlyTotal.toFixed(2)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl p-6 shadow-lg"
          style={{ backgroundColor: colors.base3 }}
        >
          <h3 className="text-sm font-medium" style={{ color: colors.base01 }}>Yearly Total</h3>
          <p className="text-2xl font-bold mt-2" style={{ color: colors.violet }}>
            ${yearlyTotal.toFixed(2)}
          </p>
        </motion.div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold" style={{ color: colors.base01 }}>
            Active Subscriptions
          </h3>
          <button
            className="px-4 py-2 rounded-lg transition-all duration-200"
            style={{ 
              backgroundColor: colors.blue,
              color: colors.base3,
            }}
          >
            Add Subscription
          </button>
        </div>

        <div className="space-y-3">
          {subscriptions.map((subscription, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl flex items-center justify-between"
              style={{ 
                backgroundColor: colors.base3,
                border: `1px solid ${colors.base1}`,
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{subscription.logo}</span>
                <div>
                  <p className="font-medium" style={{ color: colors.base01 }}>
                    {subscription.name}
                  </p>
                  <p className="text-sm" style={{ color: colors.base00 }}>
                    {subscription.category} • {subscription.billingCycle}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium" style={{ color: colors.base01 }}>
                  ${subscription.amount.toFixed(2)}
                </p>
                <p className="text-sm" style={{ color: colors.base00 }}>
                  Next: {new Date(subscription.nextBilling).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
