"use client"

import { usePathname } from 'next/navigation';
import { Navigation } from './navigation';
import { Footer } from './footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return (
      <LanguageProvider>
        {children}
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <Navigation />
      <main className="pt-0">
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  );
}

