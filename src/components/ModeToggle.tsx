'use client';

import { Switch } from '@headlessui/react';
import { useDemoMode } from '@/context/DemoModeProvider';

export default function ModeToggle() {
  const { isDemoMode, setDemoMode } = useDemoMode();

  return (
    <div className="flex items-center gap-3">
      <span
        className={!isDemoMode ? 'font-semibold' : 'text-[var(--color-muted)]'}
      >
        Live
      </span>

      <Switch
        checked={isDemoMode}
        onChange={setDemoMode}
        className={`${isDemoMode ? 'bg-purple-600' : 'bg-emerald-600'} relative inline-flex h-6 w-11 items-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
      >
        <span
          className={`${
            isDemoMode ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <span
        className={isDemoMode ? 'font-semibold' : 'text-[var(--color-muted)]'}
      >
        Demo
      </span>
    </div>
  );
}
