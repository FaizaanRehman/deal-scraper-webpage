'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type DemoModeContextType = {
  isDemoMode: boolean;
  setDemoMode: (value: boolean) => void;
};

const DemoModeContext = createContext<DemoModeContextType | null>(null);

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize from URL first, then localStorage
  const [isDemoMode, setDemoMode] = useState(() => {
    const demoParam = searchParams.get('demo');
    if (demoParam !== null) return demoParam === '1';

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isDemoMode');
      return stored === 'true';
    }

    return false;
  });

  // Keep localStorage in sync
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isDemoMode', isDemoMode.toString());
    }
  }, [isDemoMode]);

  // Keep URL in sync
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (isDemoMode) params.set('demo', '1');
    else params.delete('demo');

    // Only update URL if different to avoid unnecessary history entries
    if (params.toString() !== searchParams.toString()) {
      router.replace(`?${params.toString()}`);
    }
  }, [isDemoMode, searchParams, router]);

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
