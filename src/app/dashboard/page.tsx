'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import Menu from '@/app/ui/nav-links';
import { useAuthentication } from '@/app/hooks/useAuthentication';

export default function Dashboard() {
  const isAuthenticated = useAuthentication();
  const router = useRouter();

  if (isAuthenticated === null) {
    return <h1>Cargando...</h1>;
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
        <h1 className="text-2xl font-bold mb-4">Estadisticas</h1>
      </div>
    </div>
    </>
  );
}
