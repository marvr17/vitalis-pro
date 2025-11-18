'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, BarChart3, Settings, Eye, Menu, X as CloseIcon } from 'lucide-react';
import { useState } from 'react';
import VirtualAssistant from '@/components/VirtualAssistant';

export default function DemoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgSlug: string };
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: `/demo/${params.orgSlug}/dashboard`, icon: LayoutDashboard },
    { name: 'Encuestas', href: `/demo/${params.orgSlug}/surveys`, icon: FileText },
    { name: 'Empleados', href: `/demo/${params.orgSlug}/employees`, icon: Users },
    { name: 'Reportes', href: `/demo/${params.orgSlug}/reports`, icon: BarChart3 },
    { name: 'Configuración', href: `/demo/${params.orgSlug}/settings`, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 text-center text-xs sm:text-sm font-medium sticky top-0 z-50">
        <Eye className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Modo Demo - Estás viendo datos de ejemplo •{' '}</span>
        <span className="sm:hidden">Demo •{' '}</span>
        <Link href="/register" className="underline font-bold">
          <span className="hidden sm:inline">Crea tu cuenta gratis →</span>
          <span className="sm:inline">Registrar →</span>
        </Link>
      </div>

      <div className="flex">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed bottom-4 right-4 z-50 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <aside className={`w-64 bg-white border-r min-h-screen fixed left-0 top-[40px] transition-transform duration-300 z-40 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                V
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Vitalis PRO
                </div>
                <div className="text-xs text-gray-500">Demo Company</div>
              </div>
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Demo CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-gradient-to-br from-indigo-50 to-purple-50">
            <p className="text-sm text-gray-700 mb-3 font-medium">
              ¿Te gusta lo que ves?
            </p>
            <Link
              href="/register"
              className="block w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 font-medium text-center shadow-lg"
            >
              Crear mi cuenta
            </Link>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-[40px]"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 md:p-8 mt-[40px]">{children}</main>
      </div>

      {/* Virtual Assistant */}
      <VirtualAssistant />
    </div>
  );
}
