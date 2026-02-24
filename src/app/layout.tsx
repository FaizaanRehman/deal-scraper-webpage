import './globals.css';
import Header from '@/components/Header';
import { DemoModeProvider } from '@/context/DemoModeProvider';

export const metadata = {
  title: 'Deal Scraper',
  description: 'Find the latest deals from Instagram posts',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DemoModeProvider>
          <Header />
          {children}
        </DemoModeProvider>
      </body>
    </html>
  );
}
