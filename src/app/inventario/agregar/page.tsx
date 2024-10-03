'use client';

import React from 'react';
import Menu from '../../ui/nav-links';
import FormInsert from '../../components/forms/inventory';

import { useAuthentication } from '../../hooks/useAuthentication';
import { useRouter } from 'next/navigation';

const Inventory = () => {
  const isAuthenticated = useAuthentication();
  const router = useRouter();
  const idModule = 2;

  if (isAuthenticated === null) {
    return <h1>Cargando...</h1>;
  }

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return (
    <div className="flex">
      <Menu /> 
        <FormInsert idModule={idModule}/>
    </div>
  );
};

export default Inventory;
