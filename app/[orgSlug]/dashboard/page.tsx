'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage({ params }: { params: { orgSlug: string } }) {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalSurveys: 0,
    responseRate: 0,
    globalScore: 0,
    criticalAreas: 0,
    trend: 'stable' as 'up' | 'down' | 'stable',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    // Por ahora, datos de ejemplo
    setTimeout(() => {
      setStats({
        totalEmployees: 45,
        totalSurveys: 2,
        responseRate: 87,
        globalScore: 3.8,
        criticalAreas: 2,
        trend: 'up',
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 4.0) return 'from-green-50 to-emerald-50';
    if (score >= 3.0) return 'from-yellow-50 to-amber-50';
    return 'from-red-50 to-rose-50';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">
          ¡Bienvenido de vuelta! 👋
        </h1>
        <p className="text-indigo-100 text-lg">
          Aquí está el resumen de tu clima laboral
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Global Score */}
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className={`p-6 bg-gradient-to-br ${getScoreBg(stats.globalScore)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Índice Global</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(stats.globalScore)} mb-1`}>
              {stats.globalScore.toFixed(1)}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={stats.trend === 'up' ? 'text-green-600' : 'text-gray-500'}>
                {stats.trend === 'up' && '↗ +0.3 vs mes anterior'}
                {stats.trend === 'down' && '↘ -0.2 vs mes anterior'}
                {stats.trend === 'stable' && '→ Sin cambios'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Response Rate */}
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Tasa de Respuesta</span>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {stats.responseRate}%
            </div>
            <div className="text-sm text-gray-600">
              {Math.round(stats.totalEmployees * (stats.responseRate / 100))} de {stats.totalEmployees} empleados
            </div>
          </CardContent>
        </Card>

        {/* Critical Areas */}
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-6 bg-gradient-to-br from-orange-50 to-red-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Áreas Críticas</span>
              <span className="text-2xl">🔴</span>
            </div>
            <div className="text-4xl font-bold text-red-600 mb-1">
              {stats.criticalAreas}
            </div>
            <div className="text-sm text-red-600 font-medium">
              Requieren atención inmediata
            </div>
          </CardContent>
        </Card>

        {/* Total Employees */}
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <CardContent className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Colaboradores</span>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-1">
              {stats.totalEmployees}
            </div>
            <Link
              href={`/${params.orgSlug}/employees`}
              className="text-sm text-purple-600 hover:underline font-medium"
            >
              Gestionar →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Categories Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Categories by Score */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Desglose por Categoría</CardTitle>
              <CardDescription>Puntajes promedio por área evaluada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Liderazgo', score: 2.3, icon: '👔' },
                { name: 'Desarrollo Profesional', score: 4.1, icon: '📚' },
                { name: 'Recursos y Ambiente', score: 2.8, icon: '🏢' },
                { name: 'Compensación', score: 3.2, icon: '💰' },
                { name: 'Balance Vida-Trabajo', score: 3.6, icon: '⚖️' },
                { name: 'Trabajo en Equipo', score: 4.3, icon: '🤝' },
              ].map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium text-gray-700">{category.name}</span>
                    </div>
                    <span className={`text-lg font-bold ${getScoreColor(category.score)}`}>
                      {category.score.toFixed(1)}
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                        category.score >= 4.0
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : category.score >= 3.0
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                          : 'bg-gradient-to-r from-red-500 to-rose-500'
                      }`}
                      style={{ width: `${(category.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg bg-gradient-to-br from-gray-50 to-white">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Link
                href={`/${params.orgSlug}/surveys/create`}
                className="p-6 rounded-xl border-2 border-dashed border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-center"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📋</div>
                <div className="font-medium text-gray-700">Nueva Encuesta</div>
              </Link>
              <Link
                href={`/${params.orgSlug}/employees`}
                className="p-6 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all group text-center"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">👤</div>
                <div className="font-medium text-gray-700">Agregar Empleados</div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Alerts & Insights */}
        <div className="space-y-6">
          {/* Critical Alerts */}
          <Card className="shadow-lg border-l-4 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-600">⚠️ Alertas Críticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="font-medium text-red-900 mb-1">Liderazgo (2.3)</div>
                <div className="text-sm text-red-700 mb-2">
                  65% reporta "no recibo feedback"
                </div>
                <button className="text-sm text-red-600 hover:underline font-medium">
                  Ver plan de acción →
                </button>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="font-medium text-red-900 mb-1">Recursos (2.8)</div>
                <div className="text-sm text-red-700 mb-2">
                  70% menciona "faltan herramientas"
                </div>
                <button className="text-sm text-red-600 hover:underline font-medium">
                  Aplicar PDC →
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { text: '12 nuevas respuestas', time: 'Hace 2 horas', icon: '📝' },
                { text: '3 empleados agregados', time: 'Hace 5 horas', icon: '👤' },
                { text: 'Encuesta Q4 finalizada', time: 'Hace 1 día', icon: '✅' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xl">{activity.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{activity.text}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-0">
            <CardHeader>
              <CardTitle className="text-indigo-900">🎯 Próximos Pasos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">Encuesta enviada</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">87% ha respondido</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-indigo-600">→</span>
                <span className="text-gray-700 font-medium">Revisar plan de acción</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">○</span>
                <span className="text-gray-500">Implementar mejoras</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
