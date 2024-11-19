'use client'

export default function SkeletonTableUsers() {
  return (
    <div className="flex mt-3">
      <div className="flex-1 p-6 bg-gray-100">

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-gray-600">Número de trabajador</th>
                <th className="py-3 px-6 text-left text-gray-600">Nombre</th>
                <th className="py-3 px-6 text-left text-gray-600">Role</th>
                <th className="py-3 px-6 text-left text-gray-600">Email</th>
                <th className="py-3 px-6 text-left text-gray-600">Acciones</th>
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
