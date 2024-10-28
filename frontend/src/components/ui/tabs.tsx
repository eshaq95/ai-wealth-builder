import React, { useState, ReactElement } from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabContextProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabContext = React.createContext<TabContextProps | undefined>(undefined);

export const Tabs: React.FC<TabsProps> = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`tabs ${className || ''}`}>{children}</div>
    </TabContext.Provider>
  );
};

export const TabsList: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex mb-4">{children}</div>
);

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, value }) => {
  const context = React.useContext(TabContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');
  const { activeTab, setActiveTab } = context;
  
  return (
    <button
      className={`px-4 py-2 ${activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ children, value }) => {
  const context = React.useContext(TabContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');
  const { activeTab } = context;
  
  return (
    <div className={activeTab === value ? 'block' : 'hidden'}>{children}</div>
  );
};
