'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Save } from 'lucide-react';
import Link from 'next/link';

export default function CreateSurveyPage({ params }: { params: { orgSlug: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, status: 'draft' | 'active') {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      status,
    };

    try {
      // TODO: Call API to create survey
      console.log('Creating survey:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect back to surveys list
      router.push(`/${params.orgSlug}/surveys`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/${params.orgSlug}/surveys`}>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Encuesta</h1>
          <p className="text-gray-600 mt-1">Crea una encuesta de clima laboral Vitalis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Información de la Encuesta</CardTitle>
              <CardDescription>
                Configura los detalles básicos de tu encuesta
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form id="survey-form" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la encuesta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="Ej: Encuesta Clima Laboral Q4 2024"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción (opcional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="Describe el objetivo de esta encuesta..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Cuestionario Vitalis</h4>
                  <p className="text-sm text-blue-800 mb-2">
                    Esta encuesta utilizará el cuestionario optimizado de Vitalis con 35 preguntas
                    distribuidas en 10 categorías:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Claridad de Roles y Objetivos</li>
                    <li>• Capacitación y Recursos</li>
                    <li>• Recursos y Ambiente Físico</li>
                    <li>• Liderazgo y Feedback</li>
                    <li>• Reconocimiento y Consecuencias</li>
                    <li>• Balance Vida-Trabajo</li>
                    <li>• Trabajo en Equipo</li>
                    <li>• Desarrollo Profesional</li>
                    <li>• Compensación y Beneficios</li>
                    <li>• Compromiso y Cultura</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    variant="outline"
                    className="flex-1 gap-2"
                    disabled={loading}
                    onClick={(e: any) => handleSubmit(e, 'draft')}
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Guardando...' : 'Guardar Borrador'}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gap-2"
                    disabled={loading}
                    onClick={(e: any) => handleSubmit(e, 'active')}
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Enviando...' : 'Crear y Enviar'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-0">
            <CardHeader>
              <CardTitle className="text-indigo-900">¿Cómo funciona?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-indigo-800">
              <div className="flex gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <p className="font-semibold mb-1">Crea la encuesta</p>
                  <p>Completa los datos básicos</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <p className="font-semibold mb-1">Se envía automáticamente</p>
                  <p>Todos tus empleados recibirán un link por email</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <p className="font-semibold mb-1">Recibe resultados</p>
                  <p>Análisis automático con IA en 24 horas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Estadísticas Promedio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tiempo de respuesta:</span>
                <span className="font-semibold text-gray-900">~15 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tasa de respuesta:</span>
                <span className="font-semibold text-gray-900">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total preguntas:</span>
                <span className="font-semibold text-gray-900">35</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-yellow-500">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> Te recomendamos realizar encuestas trimestrales para
                monitorear la evolución del clima laboral.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
