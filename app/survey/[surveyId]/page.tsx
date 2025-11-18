'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VITALIS_QUESTIONS } from '@/lib/vitalis-questions';

export default function PublicSurveyPage({ params }: { params: { surveyId: string } }) {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Agrupar preguntas por categoría
  const questionsByCategory = VITALIS_QUESTIONS.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {} as Record<string, typeof VITALIS_QUESTIONS>);

  const categories = Object.keys(questionsByCategory);
  const currentCategoryKey = categories[currentCategory];
  const currentQuestions = questionsByCategory[currentCategoryKey] || [];

  const totalQuestions = VITALIS_QUESTIONS.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const categoryNames = {
    claridad: 'Claridad de Roles y Objetivos',
    capacitacion: 'Capacitación y Recursos',
    recursos: 'Recursos y Ambiente Físico',
    liderazgo: 'Liderazgo y Feedback',
    reconocimiento: 'Reconocimiento y Consecuencias',
    balance: 'Balance Vida-Trabajo',
    equipo: 'Trabajo en Equipo',
    desarrollo: 'Desarrollo Profesional',
    compensacion: 'Compensación y Beneficios',
    compromiso: 'Compromiso y Cultura',
  };

  function handleAnswer(questionId: string, value: any) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  function canGoNext() {
    return currentQuestions.every((q) => answers[q.id] !== undefined);
  }

  function handleNext() {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  }

  function handlePrevious() {
    if (currentCategory > 0) {
      setCurrentCategory((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      // TODO: Call API to submit responses
      const res = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyId: params.surveyId,
          answers,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Error al enviar la encuesta. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Gracias por tu participación!
            </h1>
            <p className="text-gray-600 mb-4">
              Tus respuestas han sido registradas exitosamente. Tu opinión es muy valiosa para
              mejorar nuestro clima laboral.
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-indigo-800">
              <p>
                Los resultados serán analizados y compartidos con el equipo de liderazgo para
                implementar mejoras continuas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
              V
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Vitalis PRO
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Encuesta de Clima Laboral
          </h1>
          <p className="text-gray-600">
            Tu opinión es fundamental. Todas las respuestas son confidenciales.
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progreso: {answeredQuestions} de {totalQuestions} preguntas
              </span>
              <span className="text-sm font-semibold text-indigo-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <span>Categoría {currentCategory + 1} de {categories.length}:</span>
              <span className="font-medium text-gray-900">
                {categoryNames[currentCategoryKey as keyof typeof categoryNames]}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardTitle>
              {categoryNames[currentCategoryKey as keyof typeof categoryNames]}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {currentQuestions.map((question, index) => (
              <div key={question.id} className="space-y-3">
                <p className="font-medium text-gray-900">
                  {index + 1}. {question.text}
                </p>

                {question.type === 'scale' && (
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={answers[question.id] === option.value}
                          onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                          className="w-5 h-5 text-indigo-600 focus:ring-2 focus:ring-indigo-600"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  <textarea
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="Escribe tu respuesta aquí..."
                  />
                )}

                {question.type === 'select' && (
                  <select
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  >
                    <option value="">Selecciona una opción...</option>
                    {question.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-6 flex gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentCategory === 0}
            className="flex-1"
          >
            Anterior
          </Button>
          {currentCategory < categories.length - 1 ? (
            <Button onClick={handleNext} disabled={!canGoNext()} className="flex-1">
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canGoNext() || loading}
              className="flex-1"
            >
              {loading ? 'Enviando...' : 'Enviar Encuesta'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
