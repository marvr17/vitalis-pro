'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertTriangle, Users } from 'lucide-react';
import Link from 'next/link';

export default function DemoDashboardPage() {
  const stats = {
    totalEmployees: 127,
    totalSurveys: 4,
    responseRate: 89,
    globalScore: 3.7,
    criticalAreas: 2,
    trend: 'up' as const,
  };

  const categoryScores = [
    { name: 'Liderazgo', score: 2.4, icon: '👔' },
    { name: 'Desarrollo Profesional', score: 4.2, icon: '📚' },
    { name: 'Recursos y Ambiente', score: 2.9, icon: '🏢' },
    { name: 'Compensación', score: 3.3, icon: '💰' },
    { name: 'Balance Vida-Trabajo', score: 3.8, icon: '⚖️' },
    { name: 'Trabajo en Equipo', score: 4.4, icon: '🤝' },
  ];

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
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">
            Dashboard - Demo Company
          </h1>
          <p className="text-indigo-100 text-lg">
            Explora cómo Vitalis PRO te ayuda a mejorar tu clima laboral
          </p>
        </div>
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
              <span className="text-green-600">
                ↗ +0.3 vs mes anterior
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
              113 de {stats.totalEmployees} empleados
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
              href={`/demo/demo-empresa/employees`}
              className="text-sm text-purple-600 hover:underline font-medium"
            >
              Ver lista →
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
              {categoryScores.map((category) => (
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
        </div>

        {/* Right Column - Alerts & Insights */}
        <div className="space-y-6">
          {/* Critical Alerts */}
          <Card className="shadow-lg border-l-4 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alertas Críticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="font-medium text-red-900 mb-1">Liderazgo (2.4)</div>
                <div className="text-sm text-red-700 mb-2">
                  68% reporta "no recibo feedback regularmente"
                </div>
                <Button variant="outline" size="sm" className="w-full text-red-600 border-red-300 hover:bg-red-50">
                  Ver plan de acción →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Demo CTA */}
          <Card className="shadow-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-bold text-lg mb-2">¿Te gusta lo que ves?</h3>
              <p className="text-indigo-100 text-sm mb-4">
                Crea tu cuenta gratis y empieza a mejorar tu clima laboral hoy
              </p>
              <Link href="/register">
                <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100 font-bold">
                  Crear mi cuenta gratis
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
