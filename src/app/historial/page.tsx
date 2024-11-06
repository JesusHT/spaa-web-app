'use client';

import React from 'react';
import Menu from '../ui/nav-links';
import { useAuthentication } from '../hooks/useAuthentication';
import { useRouter } from 'next/navigation';

export default function History() {
  const isAuthenticated = useAuthentication();
  const router = useRouter();

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  return (
    <>
    <div className="flex">
      <Menu />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Historial</h1>
      </div>
    </div>
    </>
  );
}
