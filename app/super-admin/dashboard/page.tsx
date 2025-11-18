'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Users, BarChart3, Plus, Settings, LogOut } from 'lucide-react';

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(userStr);
    if (userData.role !== 'super_admin') {
      router.push('/login');
      return;
    }

    setUser(userData);
    loadOrganizations();
  }, [router]);

  async function loadOrganizations() {
    try {
      const res = await fetch('/api/super-admin/organizations');
      if (res.ok) {
        const data = await res.json();
        setOrganizations(data.organizations || []);
      }
    } catch (error) {
      console.error('Error loading organizations:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('organization');
    router.push('/login');
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl">
                V
              </div>
              <div>
                <h1 className="text-base md:text-xl font-bold text-gray-900">Vitalis PRO</h1>
                <p className="text-xs text-purple-600 font-semibold">SUPER ADMIN</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 text-xs md:text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Organizaciones</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{organizations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Activas</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {organizations.filter(o => o.isActive === 'true').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Trial</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {organizations.filter(o => o.plan === 'trial').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 md:gap-0 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Organizaciones</h2>
          <Link
            href="/register"
            className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 font-medium text-sm md:text-base"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            <span>Nueva Organización</span>
          </Link>
        </div>

        {/* Organizations List */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando organizaciones...</p>
            </div>
          ) : organizations.length === 0 ? (
            <div className="p-8 text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hay organizaciones registradas</p>
              <Link
                href="/register"
                className="inline-block mt-4 text-indigo-600 hover:underline font-medium"
              >
                Crear la primera organización
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
              <table className="min-w-full w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Organización
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                      Slug
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Plan
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                      Max Empleados
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Estado
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden xl:table-cell">
                      Creada
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {organizations.map((org) => (
                    <tr key={org.id} className="hover:bg-gray-50">
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 text-sm md:text-base">{org.name}</div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap hidden lg:table-cell">
                        <code className="text-xs md:text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {org.slug}
                        </code>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                          {org.plan}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600 hidden md:table-cell">
                        {org.maxEmployees}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        {org.isActive === 'true' ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Activa
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            Inactiva
                          </span>
                        )}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600 hidden xl:table-cell">
                        {org.createdAt ? new Date(org.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">
                        <Link
                          href={`/${org.slug}/dashboard`}
                          className="text-indigo-600 hover:text-indigo-900 font-medium"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
