'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';

export default function ReportsPage({ params }: { params: { orgSlug: string } }) {
  const categories = [
    { name: 'Claridad de Roles y Objetivos', score: 4.2, trend: 'up', change: '+0.3' },
    { name: 'Capacitación y Recursos', score: 3.8, trend: 'up', change: '+0.2' },
    { name: 'Recursos y Ambiente Físico', score: 3.5, trend: 'down', change: '-0.1' },
    { name: 'Liderazgo y Feedback', score: 3.9, trend: 'up', change: '+0.4' },
    { name: 'Reconocimiento y Consecuencias', score: 3.3, trend: 'same', change: '0.0' },
    { name: 'Balance Vida-Trabajo', score: 3.7, trend: 'up', change: '+0.2' },
    { name: 'Trabajo en Equipo', score: 4.1, trend: 'up', change: '+0.3' },
    { name: 'Desarrollo Profesional', score: 3.6, trend: 'down', change: '-0.2' },
    { name: 'Compensación y Beneficios', score: 3.4, trend: 'same', change: '0.0' },
    { name: 'Compromiso y Cultura', score: 4.0, trend: 'up', change: '+0.5' },
  ];

  const departments = [
    { name: 'Ventas', score: 4.1, employees: 12 },
    { name: 'Tecnología', score: 3.9, employees: 15 },
    { name: 'Marketing', score: 3.7, employees: 8 },
    { name: 'Recursos Humanos', score: 4.3, employees: 5 },
    { name: 'Finanzas', score: 3.8, employees: 5 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 4.0) return 'bg-green-100';
    if (score >= 3.0) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes y Análisis</h1>
          <p className="text-gray-600 mt-1">Visualiza tendencias y métricas de clima laboral</p>
        </div>
        <Button className="gap-2" variant="outline">
          <Download className="w-4 h-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Global Score */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">3.8</div>
                  <div className="text-xs text-white/80">de 5.0</div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Índice Global</h2>
                <p className="text-gray-600">Encuesta Clima Laboral Q4 2024</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+0.3 vs periodo anterior</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">87%</div>
                <div className="text-sm text-gray-600">Tasa de respuesta</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">39</div>
                <div className="text-sm text-gray-600">Respuestas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">45</div>
                <div className="text-sm text-gray-600">Empleados</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Analysis */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Análisis por Categoría
          </CardTitle>
          <CardDescription>
            Resultados detallados de las 10 categorías del modelo SPORT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(category.trend)}
                      <span className={`text-xs font-medium ${
                        category.trend === 'up' ? 'text-green-600' :
                        category.trend === 'down' ? 'text-red-600' :
                        'text-gray-400'
                      }`}>
                        {category.change}
                      </span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${getScoreBgColor(category.score)}`}>
                    <span className={`text-lg font-bold ${getScoreColor(category.score)}`}>
                      {category.score.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                      category.score >= 4.0 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      category.score >= 3.0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${(category.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Analysis */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Análisis por Departamento</CardTitle>
          <CardDescription>
            Comparativa de índices entre departamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {dept.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-600">{dept.employees} empleados</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(dept.score)}`}>
                      {dept.score.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Índice promedio</div>
                  </div>
                  <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        dept.score >= 4.0 ? 'bg-green-500' :
                        dept.score >= 3.0 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(dept.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="shadow-xl border-l-4 border-l-indigo-600">
        <CardHeader>
          <CardTitle>Insights Clave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-semibold text-green-900">Fortalezas</h4>
                <p className="text-sm text-green-700 mt-1">
                  El equipo valora positivamente el trabajo en equipo (4.1) y la claridad de roles (4.2).
                  Recursos Humanos destaca con el mejor índice (4.3).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl">⚠️</div>
              <div>
                <h4 className="font-semibold text-yellow-900">Áreas de Oportunidad</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Reconocimiento y Consecuencias (3.3) y Compensación (3.4) son las categorías con menor
                  puntuación. Se recomienda revisar políticas de incentivos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl">📈</div>
              <div>
                <h4 className="font-semibold text-blue-900">Tendencia Positiva</h4>
                <p className="text-sm text-blue-700 mt-1">
                  El índice global mejoró +0.3 puntos. Compromiso y Cultura (+0.5) y Liderazgo (+0.4)
                  muestran las mayores mejoras.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
