'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-64 h-screen bg-gray-800 text-white" id="menu">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-900">
        <h1 className="text-xl font-semibold">Usuario</h1>
        <button className="text-xl">
          <i className="fa fa-solid fa-bars"></i>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul className="flex flex-col p-4 space-y-2">
          <li>
            <Link href="/dashboard" className={`flex items-center p-2 text-lg hover:bg-gray-700 rounded-md ${pathname === '/dashboard' ? 'bg-gray-700' : ''}`}>
              <i className="fa fa-home fa-2x mr-3"></i>
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link href="/inventario" className={`flex items-center p-2 text-lg hover:bg-gray-700 rounded-md ${pathname === '/inventario' ? 'bg-gray-700' : ''}`}>
              <i className="fa-solid fa-chart-simple fa-2x mr-3"></i>
              <span>Inventario</span>
            </Link>
          </li>
          <li>
            <Link href="/historial" className={`flex items-center p-2 text-lg hover:bg-gray-700 rounded-md ${pathname === '/historial' ? 'bg-gray-700' : ''}`}>
              <i className="fa-solid fa-clock-rotate-left fa-2x mr-3"></i>
              <span>Historial</span>
            </Link>
          </li>
          <li>
            <Link href="/usuarios" className={`flex items-center p-2 text-lg hover:bg-gray-700 rounded-md ${pathname === '/usuarios' ? 'bg-gray-700' : ''}`}>
              <i className="fa fa-user-plus fa-2x mr-3"></i>
              <span>Usuarios</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <ul className="flex flex-col p-4 space-y-2 border-t border-gray-700">
          <li>
            <button className="flex items-center p-2 text-lg hover:bg-gray-700 rounded-md">
              <i className="fa fa-power-off fa-2x mr-3"></i>
              <span>Cerrar sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
   
}
