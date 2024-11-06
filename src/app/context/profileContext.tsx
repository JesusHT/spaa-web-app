import React, { createContext, useContext, ReactNode } from 'react';
import { Profile } from '@/app/models/ProfileModel';

interface ProfileContextProps {
    profile: Profile | null;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ profile: Profile | null; children: ReactNode }> = ({ profile, children }) => {
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile debe usarse dentro de un ProfileProvider');
  }
  return context;
};