'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useMenu from '@/app/hooks/useMenu';
import useLogout from '@/app/hooks/useLogout';
import SkeletonMenu from '@/app/components/skeletons/skeletonMenu';
import '@/public/css/menu.css';

export default function NavLinks() {
  const pathname = usePathname();
  const { userData, error } = useMenu();
  const { handleSubmit } = useLogout();
  

  if (!userData) {
    return <SkeletonMenu />;
  }

  return (
    <nav className="flex flex-col w-60 h-screen bg-menu text-white" id="menu">

      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold">
          {userData?.user?.name || 'Usuario'}
        </h1>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        <ul className="flex flex-col p-4 space-y-2">
          <li>
            <Link href="/dashboard" className={`flex items-center p-2 text-lg rounded-md ${pathname.includes('/dashboard') ? 'bg-secondary-color' : ''}`}>
              <i className="fa fa-home fa-2x mr-3"></i>
              <span>Inicio</span>
            </Link>
          </li>

          <li>
            <Link href="/inventario" className={`flex items-center p-2 text-lg rounded-md ${pathname.includes('/inventario') ? 'bg-secondary-color' : ''}`}>
                <i className="fa-solid fa-chart-simple fa-2x mr-3"></i>
                <span>Inventario</span>
              </Link>
          </li>

          {userData?.auth?.id_role !== 3 && (
            <>
              <li>
                <Link href="/usuarios" className={`flex items-center p-2 text-lg rounded-md ${pathname.includes('/usuarios') ? 'bg-secondary-color' : ''}`}>
                  <i className="fa fa-user-plus fa-2x mr-3"></i>
                  <span>Usuarios</span>
                </Link>
              </li>
              <li>
                <Link href="/historial" className={`flex items-center p-2 text-lg rounded-md ${pathname.includes('/historial') ? 'bg-secondary-color' : ''}`}>
                  <i className="fa-solid fa-clock-rotate-left fa-2x mr-3"></i>
                  <span>Historial</span>
                </Link>
              </li>
              
            </>
          )}
        </ul>
      </div>
      <div className="p-4">
        <ul className="flex flex-col p-4 space-y-2 border-t border-gray-700">
          <li>
            <button onClick={handleSubmit} className="flex items-center p-2 text-lg rounded-md">
              <i className="fa fa-power-off fa-2x mr-3"></i>
              <span>Cerrar sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
