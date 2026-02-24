import Image from 'next/image';
import ModeToggle from '@/components/ModeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-card-border)] bg-[var(--color-header)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Left: Identity */}
          <div className="flex flex-row items-center gap-2 sm:gap-4">
            <Image src="/icon.svg" alt="Logo" width={30} height={30} />
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--color-foreground)]">
              Deal Scraper
            </h1>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
