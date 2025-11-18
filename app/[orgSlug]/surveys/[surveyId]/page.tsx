'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface CategoryScore {
  name: string;
  score: number;
  icon: string;
}

export default function SurveyResultsPage({
  params,
}: {
  params: { orgSlug: string; surveyId: string };
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // TODO: Fetch real data from API
    setTimeout(() => {
      setData({
        survey: {
          name: 'Encuesta Clima Laboral Q4 2024',
          createdAt: '2024-10-15',
          status: 'active',
        },
        stats: {
          totalEmployees: 45,
          responses: 39,
          responseRate: 87,
          globalScore: 3.8,
        },
        categoryScores: [
          { name: 'Liderazgo', score: 2.3, icon: '👔' },
          { name: 'Desarrollo Profesional', score: 4.1, icon: '📚' },
          { name: 'Recursos y Ambiente', score: 2.8, icon: '🏢' },
          { name: 'Compensación', score: 3.2, icon: '💰' },
          { name: 'Balance Vida-Trabajo', score: 3.6, icon: '⚖️' },
          { name: 'Trabajo en Equipo', score: 4.3, icon: '🤝' },
          { name: 'Claridad de Roles', score: 3.9, icon: '🎯' },
          { name: 'Capacitación', score: 3.4, icon: '📖' },
          { name: 'Reconocimiento', score: 3.0, icon: '🏆' },
          { name: 'Compromiso', score: 3.7, icon: '❤️' },
        ],
        criticalIssues: [
          {
            category: 'Liderazgo',
            score: 2.3,
            issue: '65% reporta "no recibo feedback regularmente"',
            recommendation: 'Implementar reuniones 1-on-1 quincenales',
          },
          {
            category: 'Recursos y Ambiente',
            score: 2.8,
            issue: '70% menciona "faltan herramientas necesarias"',
            recommendation: 'Auditoría de recursos por departamento',
          },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/${params.orgSlug}/surveys`}>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.survey.name}</h1>
            <p className="text-gray-600 mt-1">
              Resultados y análisis detallado
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Descargar Reporte
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={`border-0 shadow-lg bg-gradient-to-br ${getScoreBg(data.stats.globalScore)}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Índice Global</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(data.stats.globalScore)} mb-1`}>
              {data.stats.globalScore.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">de 5.0</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Tasa de Respuesta</span>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {data.stats.responseRate}%
            </div>
            <div className="text-sm text-gray-600">
              {data.stats.responses} de {data.stats.totalEmployees}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Áreas Saludables</span>
              <span className="text-2xl">🟢</span>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-1">
              {data.categoryScores.filter((c: CategoryScore) => c.score >= 4.0).length}
            </div>
            <div className="text-sm text-gray-600">Score ≥ 4.0</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-rose-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Áreas Críticas</span>
              <span className="text-2xl">🔴</span>
            </div>
            <div className="text-4xl font-bold text-red-600 mb-1">
              {data.categoryScores.filter((c: CategoryScore) => c.score < 3.0).length}
            </div>
            <div className="text-sm text-gray-600">Score &lt; 3.0</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Scores */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Breakdown */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Desglose por Categoría</CardTitle>
              <CardDescription>Puntajes promedio por área evaluada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.categoryScores
                .sort((a: CategoryScore, b: CategoryScore) => a.score - b.score)
                .map((category: CategoryScore) => (
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

          {/* AI Analysis (Placeholder) */}
          <Card className="shadow-lg border-l-4 border-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Análisis con IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Fortalezas:</strong> Tu equipo destaca en Trabajo en Equipo (4.3) y
                Desarrollo Profesional (4.1), lo que indica una cultura colaborativa y de
                crecimiento.
              </p>
              <p>
                <strong>Áreas de Oportunidad:</strong> Liderazgo (2.3) y Recursos (2.8) requieren
                atención inmediata. Se identificaron patrones relacionados con comunicación
                insuficiente y falta de herramientas.
              </p>
              <p>
                <strong>Tendencia:</strong> Comparado con el trimestre anterior, se observa una
                mejora de +0.3 puntos en el índice global, principalmente impulsada por mejoras en
                Balance Vida-Trabajo.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Alerts */}
        <div className="space-y-6">
          {/* Critical Issues */}
          <Card className="shadow-lg border-l-4 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alertas Críticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.criticalIssues.map((issue: any, i: number) => (
                <div key={i} className="p-4 bg-red-50 rounded-lg">
                  <div className="font-medium text-red-900 mb-1">
                    {issue.category} ({issue.score})
                  </div>
                  <div className="text-sm text-red-700 mb-2">{issue.issue}</div>
                  <div className="text-sm font-medium text-red-800 mb-2">
                    💡 Recomendación:
                  </div>
                  <div className="text-sm text-red-700">{issue.recommendation}</div>
                  <Button variant="outline" size="sm" className="mt-3 w-full text-red-600 border-red-300 hover:bg-red-50">
                    Ver plan de acción →
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Courses */}
          <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 border-0">
            <CardHeader>
              <CardTitle className="text-purple-900">📚 Cursos Recomendados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg">
                <div className="font-medium text-gray-900 mb-1 text-sm">
                  Liderazgo Efectivo y Feedback
                </div>
                <div className="text-xs text-gray-600 mb-2">Duración: 8 semanas • Online</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-purple-600">$299 USD</span>
                  <Button size="sm" variant="outline">Ver más</Button>
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="font-medium text-gray-900 mb-1 text-sm">
                  Gestión de Recursos y Equipos
                </div>
                <div className="text-xs text-gray-600 mb-2">Duración: 6 semanas • Online</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-purple-600">$249 USD</span>
                  <Button size="sm" variant="outline">Ver más</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demographics (Placeholder) */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Demografía
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Por departamento:</span>
                <span className="font-semibold text-gray-900">5 áreas</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Antigüedad promedio:</span>
                <span className="font-semibold text-gray-900">2.3 años</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Participación:</span>
                <span className="font-semibold text-gray-900">87%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
