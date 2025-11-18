'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Mail, Globe, Palette, Bell, Shield, Users, Save } from 'lucide-react';

export default function SettingsPage({ params }: { params: { orgSlug: string } }) {
  const [activeTab, setActiveTab] = useState('organization');
  const [organization, setOrganization] = useState<any>(null);

  useEffect(() => {
    // Load organization from localStorage
    const orgData = localStorage.getItem('organization');
    if (orgData) {
      setOrganization(JSON.parse(orgData));
    }
  }, []);

  const tabs = [
    { id: 'organization', name: 'Organización', icon: Building2 },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'team', name: 'Equipo', icon: Users },
    { id: 'security', name: 'Seguridad', icon: Shield },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-1">Administra la configuración de tu organización</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Organization Tab */}
      {activeTab === 'organization' && (
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Información de la Organización</CardTitle>
              <CardDescription>
                Configura los detalles básicos de tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Empresa
                  </label>
                  <input
                    type="text"
                    defaultValue={organization?.name || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug URL
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">vitalis-pro.vercel.app/</span>
                    <input
                      type="text"
                      defaultValue={organization?.slug || ''}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de Contacto
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    defaultValue={organization?.email || ''}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sitio Web
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    placeholder="https://tu-empresa.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industria
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent">
                  <option>Tecnología</option>
                  <option>Retail</option>
                  <option>Servicios</option>
                  <option>Manufactura</option>
                  <option>Salud</option>
                  <option>Educación</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamaño de la Empresa
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent">
                  <option>1-50 empleados</option>
                  <option>51-200 empleados</option>
                  <option>201-500 empleados</option>
                  <option>500+ empleados</option>
                </select>
              </div>

              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Personalización
              </CardTitle>
              <CardDescription>
                Personaliza la apariencia de tu plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo de la Empresa
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-3xl">
                    V
                  </div>
                  <Button variant="outline">
                    Cambiar Logo
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Principal
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    defaultValue="#6366f1"
                    className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">#6366f1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Preferencias de Notificaciones</CardTitle>
            <CardDescription>
              Controla cómo y cuándo recibes notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Nuevas respuestas</h4>
                  <p className="text-sm text-gray-600">Recibe un email cuando haya nuevas respuestas</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Reportes semanales</h4>
                  <p className="text-sm text-gray-600">Resumen semanal de métricas y tendencias</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Alertas de clima laboral</h4>
                  <p className="text-sm text-gray-600">Notificaciones cuando el índice baje de 3.0</p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Nuevos empleados</h4>
                  <p className="text-sm text-gray-600">Cuando se agreguen nuevos colaboradores</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-600"
                />
              </div>
            </div>

            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Guardar Preferencias
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Equipo Administrativo</CardTitle>
            <CardDescription>
              Gestiona los usuarios con acceso a la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Admin Usuario</h4>
                    <p className="text-sm text-gray-600">{organization?.email || 'admin@empresa.com'}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  Propietario
                </span>
              </div>

              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Users className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-4">
                  Invita a miembros de tu equipo para que gestionen encuestas
                </p>
                <Button variant="outline">
                  Invitar Miembro
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Seguridad de la Cuenta</CardTitle>
            <CardDescription>
              Mantén tu cuenta segura
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Cambiar Contraseña</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
                <Button className="gap-2">
                  Actualizar Contraseña
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
