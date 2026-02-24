'use client';

import { createContext, useContext, useState } from 'react';

type DemoModeContextType = {
  isDemoMode: boolean;
  setDemoMode: (value: boolean) => void;
};

const DemoModeContext = createContext<DemoModeContextType | null>(null);

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setDemoMode] = useState(false);

  return (
    <DemoModeContext.Provider value={{ isDemoMode, setDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (!context) throw new Error('useDemoMode must be used inside provider');
  return context;
}
