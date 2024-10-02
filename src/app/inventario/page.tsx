'use client';

import React from 'react';
import Menu from '../ui/nav-links';
import { useAuthentication } from '../hooks/useAuthentication';
import { useRouter } from 'next/navigation';

export default function Inventory() {
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
      <Menu />
      <h1>Este es el inventario</h1>
    </>
  );
}