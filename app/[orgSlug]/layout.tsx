'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgSlug: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [org, setOrg] = useState<any>(null);

  useEffect(() => {
    // Verificar autenticación (simplificado - en producción usar NextAuth)
    const userData = localStorage.getItem('user');
    const orgData = localStorage.getItem('organization');

    if (!userData || !orgData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    setOrg(JSON.parse(orgData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('organization');
    router.push('/login');
  };

  if (!user || !org) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: `/${params.orgSlug}/dashboard`, icon: '📊' },
    { name: 'Encuestas', href: `/${params.orgSlug}/surveys`, icon: '📋' },
    { name: 'Empleados', href: `/${params.orgSlug}/employees`, icon: '👥' },
    { name: 'Reportes', href: `/${params.orgSlug}/reports`, icon: '📈' },
    { name: 'Configuración', href: `/${params.orgSlug}/settings`, icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            V
          </div>
          <div>
            <div className="font-bold text-gray-900">Vitalis PRO</div>
            <div className="text-xs text-gray-500">{org.name}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User menu */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {navigation.find((n) => n.href === pathname)?.name || 'Vitalis'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-full text-sm font-medium">
              Plan: {org.plan.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
