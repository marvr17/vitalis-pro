'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Target, Calendar, Users, CheckCircle2, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface ActionPlan {
  id: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'in_progress' | 'completed' | 'pending';
  score: number;
  targetScore: number;
  actions: number;
  completedActions: number;
  responsible: string;
  deadline: string;
  progress: number;
}

export default function ImprovementPlansPage({ params }: { params: { orgSlug: string } }) {
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed' | 'pending'>('all');

  const actionPlans: ActionPlan[] = [
    {
      id: '1',
      title: 'Mejorar Feedback y Liderazgo',
      category: 'Liderazgo',
      priority: 'high',
      status: 'in_progress',
      score: 2.3,
      targetScore: 3.5,
      actions: 8,
      completedActions: 5,
      responsible: 'María López - RH',
      deadline: '2024-12-31',
      progress: 62,
    },
    {
      id: '2',
      title: 'Optimizar Recursos y Herramientas',
      category: 'Recursos',
      priority: 'high',
      status: 'in_progress',
      score: 2.8,
      targetScore: 4.0,
      actions: 6,
      completedActions: 3,
      responsible: 'Carlos Rodríguez - TI',
      deadline: '2024-11-30',
      progress: 50,
    },
    {
      id: '3',
      title: 'Programa de Reconocimiento',
      category: 'Reconocimiento',
      priority: 'medium',
      status: 'pending',
      score: 3.3,
      targetScore: 4.2,
      actions: 5,
      completedActions: 0,
      responsible: 'Ana García - RH',
      deadline: '2025-01-15',
      progress: 0,
    },
    {
      id: '4',
      title: 'Mejorar Compensación y Beneficios',
      category: 'Compensación',
      priority: 'medium',
      status: 'pending',
      score: 3.2,
      targetScore: 3.8,
      actions: 4,
      completedActions: 0,
      responsible: 'Finanzas',
      deadline: '2025-02-28',
      progress: 0,
    },
  ];

  const filteredPlans = filter === 'all'
    ? actionPlans
    : actionPlans.filter(plan => plan.status === filter);

  const getPriorityBadge = (priority: ActionPlan['priority']) => {
    const styles = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-green-100 text-green-700 border-green-200',
    };
    const labels = {
      high: '🔴 Alta',
      medium: '🟡 Media',
      low: '🟢 Baja',
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[priority]}`}>
        {labels[priority]}
      </span>
    );
  };

  const getStatusBadge = (status: ActionPlan['status']) => {
    const styles = {
      in_progress: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-gray-100 text-gray-700',
    };
    const labels = {
      in_progress: 'En Progreso',
      completed: 'Completado',
      pending: 'Pendiente',
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Planes de Acción (PDC)</h1>
          <p className="text-gray-600 mt-1">Gestiona mejoras continuas del clima laboral</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Crear Plan de Acción
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Planes</span>
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600">{actionPlans.length}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">En Progreso</span>
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600">
              {actionPlans.filter(p => p.status === 'in_progress').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Completados</span>
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">
              {actionPlans.filter(p => p.status === 'completed').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Progreso Promedio</span>
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {Math.round(actionPlans.reduce((acc, p) => acc + p.progress, 0) / actionPlans.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="flex-1 sm:flex-none"
            >
              Todos ({actionPlans.length})
            </Button>
            <Button
              variant={filter === 'in_progress' ? 'default' : 'outline'}
              onClick={() => setFilter('in_progress')}
              className="flex-1 sm:flex-none"
            >
              En Progreso ({actionPlans.filter(p => p.status === 'in_progress').length})
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
              className="flex-1 sm:flex-none"
            >
              Pendientes ({actionPlans.filter(p => p.status === 'pending').length})
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
              className="flex-1 sm:flex-none"
            >
              Completados ({actionPlans.filter(p => p.status === 'completed').length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Plans List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="shadow-xl hover:shadow-2xl transition-all border-l-4 border-l-indigo-500">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {plan.category.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          {getPriorityBadge(plan.priority)}
                          {getStatusBadge(plan.status)}
                          <span className="text-sm text-gray-600">
                            <span className="font-medium">Categoría:</span> {plan.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Índice Actual</div>
                    <div className="text-2xl font-bold text-red-600">{plan.score.toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Índice Objetivo</div>
                    <div className="text-2xl font-bold text-green-600">{plan.targetScore.toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Acciones</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {plan.completedActions}/{plan.actions}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Progreso</div>
                    <div className="text-2xl font-bold text-purple-600">{plan.progress}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progreso del plan</span>
                    <span className="font-semibold text-gray-900">{plan.progress}%</span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {plan.responsible}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Fecha límite: {new Date(plan.deadline).toLocaleDateString('es-MX')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                    <Button size="sm">
                      Actualizar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPlans.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay planes en esta categoría
              </h3>
              <p className="text-gray-600 mb-6">
                Crea un nuevo plan de acción para mejorar el clima laboral
              </p>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Crear Plan de Acción
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Help Card */}
      <Card className="shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-0">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">¿Qué es un Plan de Acción (PDC)?</h4>
              <p className="text-sm text-gray-700 mb-3">
                Los Planes de Desarrollo de Competencias (PDC) son estrategias estructuradas para
                mejorar áreas críticas del clima laboral. Cada plan incluye acciones concretas,
                responsables y métricas de éxito.
              </p>
              <Link href="#" className="text-sm font-medium text-indigo-600 hover:underline">
                Ver guía completa →
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
