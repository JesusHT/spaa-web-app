'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/app/hooks/useAuthentication';

import Menu from '@/app/ui/nav-links';
import { ProfileProvider } from '@/app/context/profileContext';
import { Profile } from '@/app/models/ProfileModel';

import useMenu from '@/app/hooks/useMenu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isAuthenticated = useAuthentication();
  const router = useRouter();
  const [user, setUser] = useState<Profile | null>(null); 
  const { userData } = useMenu();

  useEffect(() => {
    if (isAuthenticated === null) {
      return;
    }

    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    if (isAuthenticated && userData) {
      setUser(userData);
    }
  }, [isAuthenticated, router, userData]);

  if (isAuthenticated === null) {
    return null;  
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ProfileProvider profile={user}>
      <section className="flex min-h-screen">
        <Menu userData={userData} />
        <div className="flex-grow">
          {children}
        </div>
      </section>
    </ProfileProvider>
  );
};

export default DashboardLayout;
