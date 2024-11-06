'use client'

import '@/public/css/menu.css';


export default function SkeletonMenu() {
  return (
    <nav className="flex flex-col w-64 h-screen bg-menu text-white" id="menu">

      <div className="flex items-center justify-between px-6 py-4">
        <div className="h-6 w-32 bg-secondary-color animate-pulse"></div>
      </div>

      <div className="flex-grow overflow-y-auto">
        <ul className="flex flex-col p-4 space-y-2">
          <li>
            <div className="flex items-center p-2 text-lg hover:bg-secondary-color rounded-md">
              <div className="h-6 w-6 bg-secondary-color animate-pulse mr-3"></div>
              <div className="h-6 w-24 bg-secondary-color animate-pulse"></div> 
            </div>
          </li>
          <li>
            <div className="flex items-center p-2 text-lg hover:bg-secondary-color rounded-md">
              <div className="h-6 w-6 bg-secondary-color animate-pulse mr-3"></div> 
              <div className="h-6 w-24 bg-secondary-color animate-pulse"></div> 
            </div>
          </li>
          <li>
            <div className="flex items-center p-2 text-lg hover:bg-secondary-color rounded-md">
              <div className="h-6 w-6 bg-secondary-color animate-pulse mr-3"></div> 
              <div className="h-6 w-24 bg-secondary-color animate-pulse"></div> 
            </div>
          </li>
          <li>
            <div className="flex items-center p-2 text-lg hover:bg-secondary-color rounded-md">
              <div className="h-6 w-6 bg-secondary-color animate-pulse mr-3"></div> 
              <div className="h-6 w-24 bg-secondary-color animate-pulse"></div>
            </div>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <ul className="flex flex-col p-4 space-y-2 border-t border-gray-700">
          <li>
            <div className="flex items-center p-2 text-lg hover:bg-secondary-color rounded-md">
              <div className="h-6 w-6 bg-secondary-color animate-pulse mr-3"></div>
              <div className="h-6 w-24 bg-secondary-color animate-pulse"></div> 
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
