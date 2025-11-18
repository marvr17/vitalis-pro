'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Search, Download, Edit2, Trash2, Mail } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  status: 'active' | 'inactive';
}

export default function DemoEmployeesPage({ params }: { params: { orgSlug: string } }) {
  const [searchTerm, setSearchTerm] = useState('');

  const employees: Employee[] = [
    {
      id: '1',
      name: 'Ana García',
      email: 'ana.garcia@empresa.com',
      department: 'Ventas',
      position: 'Gerente de Ventas',
      startDate: '2022-01-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@empresa.com',
      department: 'Tecnología',
      position: 'Desarrollador Senior',
      startDate: '2021-06-10',
      status: 'active',
    },
    {
      id: '3',
      name: 'María López',
      email: 'maria.lopez@empresa.com',
      department: 'Marketing',
      position: 'Coordinadora de Marketing',
      startDate: '2023-03-20',
      status: 'active',
    },
    {
      id: '4',
      name: 'Juan Martínez',
      email: 'juan.martinez@empresa.com',
      department: 'Recursos Humanos',
      position: 'Especialista en RH',
      startDate: '2022-08-05',
      status: 'active',
    },
    {
      id: '5',
      name: 'Laura Sánchez',
      email: 'laura.sanchez@empresa.com',
      department: 'Finanzas',
      position: 'Contadora',
      startDate: '2020-11-12',
      status: 'active',
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Colaboradores</h1>
          <p className="text-gray-600 mt-1">Gestiona tu equipo y envía encuestas</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" disabled>
            <Upload className="w-4 h-4" />
            Importar CSV
          </Button>
          <Button className="gap-2" disabled>
            <Plus className="w-4 h-4" />
            Agregar Empleado
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Empleados</span>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">{employees.length}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Activos</span>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {employees.filter((e) => e.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Departamentos</span>
              <span className="text-2xl">🏢</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {new Set(employees.map((e) => e.department)).size}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Nuevos (30d)</span>
              <span className="text-2xl">🆕</span>
            </div>
            <div className="text-3xl font-bold text-orange-600">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o departamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="gap-2" disabled>
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
          <CardDescription>
            {filteredEmployees.length} empleado(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Nombre
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Departamento
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Puesto
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">
                            Ingreso: {new Date(employee.startDate).toLocaleDateString('es-MX')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {employee.email}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                        {employee.department}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{employee.position}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          employee.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {employee.status === 'active' ? '✓ Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 cursor-not-allowed rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 cursor-not-allowed rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No se encontraron empleados
              </h3>
              <p className="text-gray-600">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
