'use client'

export default function SkeletonTable() {
  return (
    <div className="flex mt-3">
      {/* Contenido principal */}
      <div className="flex-1 p-6 bg-gray-100">

        {/* Tabla esqueleto */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100">Folio</th>
                <th className="py-2 px-4 bg-gray-100">Nombre</th>
                <th className="py-2 px-4 bg-gray-100">Cantidad</th>
                <th className="py-2 px-4 bg-gray-100">Descripción</th>
                <th className="py-2 px-4 bg-gray-100">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <div className="h-8 w-12 bg-green-300 rounded animate-pulse"></div>
                    <div className="h-8 w-12 bg-yellow-300 rounded animate-pulse"></div>
                    <div className="h-8 w-12 bg-red-300 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
