'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQ[] = [
  // VITALIS
  {
    question: '¿Qué es VITALIS y para qué sirve?',
    answer: 'VITALIS es una encuesta de clima laboral diseñada para medir la satisfacción, bienestar y cultura organizacional de tu equipo. Utiliza 35 preguntas basadas en el modelo SPORT y evalúa 10 categorías clave del ambiente laboral como liderazgo, reconocimiento, balance vida-trabajo y más.',
    category: 'VITALIS',
  },
  {
    question: '¿Cuántas preguntas tiene VITALIS?',
    answer: 'VITALIS contiene 35 preguntas cuidadosamente seleccionadas: 32 preguntas con escala Likert (1-5) y 3 preguntas abiertas para comentarios específicos. Este número está optimizado para obtener información valiosa sin cansar a los participantes.',
    category: 'VITALIS',
  },
  {
    question: '¿Cada cuánto tiempo debo aplicar VITALIS?',
    answer: 'Recomendamos aplicar VITALIS cada 6 meses. Esto permite detectar cambios significativos en el clima laboral sin saturar a los empleados con encuestas frecuentes. Para monitorear mejoras después de implementar planes de acción, puedes hacer encuestas de seguimiento trimestrales enfocadas en áreas específicas.',
    category: 'VITALIS',
  },
  {
    question: '¿Las respuestas de VITALIS son anónimas?',
    answer: 'Sí, VITALIS es completamente anónimo. Los empleados responden sin identificarse, lo que garantiza respuestas honestas y sinceras. Solo se recopilan datos demográficos generales (como departamento) que permiten análisis por grupos sin comprometer la privacidad individual.',
    category: 'VITALIS',
  },

  // PDC
  {
    question: '¿Qué es PDC y en qué se diferencia de VITALIS?',
    answer: 'PDC (Performance Diagnostic Checklist) es una encuesta de 43 preguntas enfocada en el desempeño operativo y la eficiencia de procesos. Mientras VITALIS mide "cómo se sienten" los empleados (clima emocional), PDC mide "qué tan bien funcionan" los procesos organizacionales (eficiencia). Ambas son complementarias.',
    category: 'PDC',
  },
  {
    question: '¿Qué evalúa PDC específicamente?',
    answer: 'PDC evalúa 10 dimensiones: Claridad de objetivos, Recursos y herramientas, Procesos y procedimientos, Capacitación, Comunicación, Medición y retroalimentación, Toma de decisiones, Resolución de problemas, Tiempo y productividad, y Mejora continua. Se enfoca en identificar obstáculos operativos.',
    category: 'PDC',
  },
  {
    question: '¿Con qué frecuencia debo aplicar PDC?',
    answer: 'Recomendamos aplicar PDC trimestralmente. Como evalúa procesos y eficiencia operativa (que cambian más rápido que el clima emocional), una frecuencia mayor permite detectar y corregir problemas de desempeño oportunamente.',
    category: 'PDC',
  },

  // RESULTADOS
  {
    question: '¿Cómo interpreto los resultados de las encuestas?',
    answer: 'Los resultados se miden en escala 1-5:\n• 4.0-5.0 (Verde): Excelente, mantener y replicar buenas prácticas\n• 3.0-3.9 (Amarillo): Aceptable, oportunidad de mejora\n• 1.0-2.9 (Rojo): Crítico, requiere atención inmediata y plan de acción\nRevisa el dashboard para ver tendencias y comparar departamentos.',
    category: 'Resultados',
  },
  {
    question: '¿Qué es el índice global y cómo se calcula?',
    answer: 'El índice global es el promedio de todas las respuestas de escala Likert (1-5) en la encuesta. Representa una fotografía general del estado del clima laboral o desempeño operativo. Se calcula sumando todos los puntajes y dividiendo entre el total de preguntas respondidas.',
    category: 'Resultados',
  },
  {
    question: '¿Qué hago si una categoría sale muy baja?',
    answer: 'Cuando una categoría tiene score < 3.0:\n1. Revisa los comentarios abiertos para entender las causas\n2. Ve a "Planes de Mejora" y crea un plan de acción\n3. Define acciones específicas, responsables y fechas\n4. Implementa las mejoras\n5. Vuelve a medir en 3-6 meses para verificar progreso',
    category: 'Resultados',
  },
  {
    question: '¿Puedo comparar resultados entre departamentos?',
    answer: 'Sí, la sección de Reportes te permite ver análisis por departamento. Esto ayuda a identificar áreas específicas que necesitan atención o departamentos con mejores prácticas que pueden compartirse con el resto de la organización.',
    category: 'Resultados',
  },

  // PLANES DE MEJORA
  {
    question: '¿Qué es un Plan de Mejora?',
    answer: 'Un Plan de Mejora es una estrategia estructurada para mejorar áreas críticas detectadas en las encuestas. Incluye:\n• Objetivo específico (ej: "Subir liderazgo de 2.3 a 3.5")\n• Acciones concretas\n• Responsables\n• Fechas límite\n• Métricas de seguimiento',
    category: 'Planes de Mejora',
  },
  {
    question: '¿Cómo creo un buen Plan de Mejora?',
    answer: 'Un Plan de Mejora efectivo debe:\n1. Tener un objetivo medible y alcanzable\n2. Incluir 4-8 acciones específicas (no vagas)\n3. Asignar responsables claros\n4. Establecer fechas realistas\n5. Definir cómo medirás el éxito\n6. Involucrar a los afectados en las soluciones\n7. Hacer seguimiento mensual del progreso',
    category: 'Planes de Mejora',
  },

  // TÉCNICO
  {
    question: '¿Dónde se guardan los datos?',
    answer: 'Todos los datos se almacenan de forma segura en Google Sheets con cifrado y permisos restringidos. Solo los administradores de tu organización tienen acceso. Las respuestas anónimas no pueden ser rastreadas a individuos específicos.',
    category: 'Técnico',
  },
  {
    question: '¿Puedo exportar los resultados?',
    answer: 'Sí, puedes exportar los datos en formato PDF desde la sección de Reportes, o en formato Excel desde Empleados. Los reportes incluyen gráficas, análisis por categoría y comparativas.',
    category: 'Técnico',
  },
  {
    question: '¿Cuántos empleados puedo agregar?',
    answer: 'Depende de tu plan:\n• Plan Free: Hasta 50 empleados\n• Plan Professional: Hasta 200 empleados\n• Plan Enterprise: Ilimitados\nContacta ventas para planes personalizados.',
    category: 'Técnico',
  },
  {
    question: '¿Puedo personalizar las preguntas?',
    answer: 'En el Plan Professional y Enterprise puedes agregar hasta 10 preguntas personalizadas adicionales a VITALIS y PDC. Las preguntas base están diseñadas por expertos y recomendamos mantenerlas para asegurar confiabilidad estadística.',
    category: 'Técnico',
  },

  // IMPLEMENTACIÓN
  {
    question: '¿Cómo invito a mis empleados a responder?',
    answer: 'Desde la sección "Encuestas", clic en "Enviar", y la plataforma generará links únicos anónimos que puedes enviar por email, Slack, WhatsApp o el canal que prefieras. Los empleados no necesitan crear cuenta, solo abrir el link.',
    category: 'Implementación',
  },
  {
    question: '¿Qué tasa de respuesta debo esperar?',
    answer: 'Una tasa de respuesta saludable es 70-85%. Factores que influyen:\n• Comunicación clara del propósito\n• Anonimato garantizado\n• Tiempo adecuado (2-3 semanas)\n• Recordatorios amigables\n• Apoyo de liderazgo\n• Compartir resultados y acciones previas',
    category: 'Implementación',
  },
  {
    question: '¿Cuánto tiempo toma responder cada encuesta?',
    answer: 'VITALIS toma aproximadamente 8-10 minutos y PDC toma 10-12 minutos. Ambas están diseñadas para ser completas pero respetando el tiempo de los colaboradores.',
    category: 'Implementación',
  },
];

const CATEGORIES = ['Todos', 'VITALIS', 'PDC', 'Resultados', 'Planes de Mejora', 'Técnico', 'Implementación'];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredFAQs = FAQS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl">
              <HelpCircle className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas rápidas sobre Vitalis PRO, encuestas y planes de mejora
          </p>
        </div>

        {/* Search */}
        <Card className="shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar pregunta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    {openIndex === index && (
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed mt-3">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 flex-shrink-0 p-2">
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredFAQs.length === 0 && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda o cambia la categoría
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Card */}
        <Card className="shadow-xl mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              ¿No encontraste tu respuesta?
            </h3>
            <p className="text-gray-700 mb-6">
              Nuestro asistente virtual está disponible para ayudarte con cualquier pregunta adicional
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 font-medium transition-all shadow-lg"
            >
              Contactar Soporte
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
