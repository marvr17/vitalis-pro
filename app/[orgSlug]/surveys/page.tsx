'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Users, TrendingUp, Eye, Send } from 'lucide-react';
import Link from 'next/link';

interface Survey {
  id: string;
  name: string;
  createdAt: string;
  status: 'draft' | 'active' | 'closed';
  totalEmployees: number;
  responses: number;
  responseRate: number;
  globalScore?: number;
}

export default function SurveysPage({ params }: { params: { orgSlug: string } }) {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    setTimeout(() => {
      setSurveys([
        {
          id: '1',
          name: 'VITALIS - Clima Laboral Q4 2024',
          createdAt: '2024-10-15',
          status: 'active',
          totalEmployees: 45,
          responses: 39,
          responseRate: 87,
          globalScore: 3.8,
        },
        {
          id: '2',
          name: 'PDC - Diagnóstico de Desempeño Q4 2024',
          createdAt: '2024-11-01',
          status: 'active',
          totalEmployees: 45,
          responses: 12,
          responseRate: 27,
        },
        {
          id: '3',
          name: 'VITALIS - Clima Laboral Q3 2024',
          createdAt: '2024-07-15',
          status: 'closed',
          totalEmployees: 42,
          responses: 40,
          responseRate: 95,
          globalScore: 3.5,
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status: Survey['status']) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700',
      active: 'bg-green-100 text-green-700',
      closed: 'bg-blue-100 text-blue-700',
    };
    const labels = {
      draft: 'Borrador',
      active: 'Activa',
      closed: 'Cerrada',
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Encuestas</h1>
          <p className="text-gray-600 mt-1">Mide y analiza el clima laboral de tu equipo</p>
        </div>
        <Link href={`/${params.orgSlug}/surveys/create`}>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nueva Encuesta
          </Button>
        </Link>
      </div>

      {/* Survey Types Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                V
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">VITALIS - Clima Laboral</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Mide satisfacción, bienestar y cultura organizacional. Enfocado en el ambiente emocional y motivacional del equipo.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">35 preguntas</span>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">10 categorías</span>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Modelo SPORT</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                P
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">PDC - Diagnóstico de Desempeño</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Evalúa eficiencia operativa, procesos y recursos. Enfocado en el desempeño organizacional y mejora de procesos.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">43 preguntas</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">10 dimensiones</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Performance</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Encuestas</span>
              <span className="text-2xl">📋</span>
            </div>
            <div className="text-3xl font-bold text-indigo-600">{surveys.length}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Activas</span>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {surveys.filter((s) => s.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Promedio Respuesta</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(
                surveys.reduce((acc, s) => acc + s.responseRate, 0) / surveys.length
              )}%
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Respuestas</span>
              <span className="text-2xl">💬</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {surveys.reduce((acc, s) => acc + s.responses, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Surveys List */}
      <div className="grid grid-cols-1 gap-6">
        {surveys.map((survey) => (
          <Card key={survey.id} className="shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Section - Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{survey.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(survey.createdAt).toLocaleDateString('es-MX')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {survey.totalEmployees} empleados
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(survey.status)}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tasa de respuesta</span>
                      <span className="font-semibold text-gray-900">
                        {survey.responses} / {survey.totalEmployees} ({survey.responseRate}%)
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${survey.responseRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Global Score */}
                  {survey.globalScore && (
                    <div className="mt-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Índice Global:</span>
                      <span className={`text-lg font-bold ${getScoreColor(survey.globalScore)}`}>
                        {survey.globalScore.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Section - Actions */}
                <div className="flex lg:flex-col gap-2">
                  <Link href={`/${params.orgSlug}/surveys/${survey.id}`} className="flex-1 lg:flex-none">
                    <Button variant="outline" className="w-full gap-2">
                      <Eye className="w-4 h-4" />
                      Ver Resultados
                    </Button>
                  </Link>
                  {survey.status === 'draft' && (
                    <Button className="flex-1 lg:flex-none gap-2">
                      <Send className="w-4 h-4" />
                      Enviar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {surveys.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay encuestas</h3>
              <p className="text-gray-600 mb-6">
                Crea tu primera encuesta para empezar a medir el clima laboral
              </p>
              <Link href={`/${params.orgSlug}/surveys/create`}>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Crear Primera Encuesta
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
