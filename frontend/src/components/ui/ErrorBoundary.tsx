'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { colors } from '../../utils/colors';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: colors.base3 }}>
          <div className="max-w-md w-full p-8 rounded-2xl shadow-lg" style={{ backgroundColor: colors.base2 }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.red }}>Something went wrong</h2>
            <p className="mb-4" style={{ color: colors.base01 }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg transition-all duration-200"
              style={{ backgroundColor: colors.blue, color: colors.base3 }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
