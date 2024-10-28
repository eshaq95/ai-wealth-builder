import React from 'react';

export const Card: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="bg-white shadow rounded-lg p-6">{children}</div>
);

export const CardHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const CardTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

export const CardContent: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div>{children}</div>
);
