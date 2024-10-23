'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/app/hooks/useAuthentication';

import Menu from '@/app/ui/nav-links';

interface InventoryLayoutProps {
  children: React.ReactNode;
}

const InventoryLayout: React.FC<InventoryLayoutProps> = ({ children }) => {
  const isAuthenticated = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return null;
  }

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <section className="flex min-h-screen">
      <Menu />
      <div className="flex-grow">
        {children}
      </div>
    </section>
  );
};

export default InventoryLayout;
