'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  '¿Qué es VITALIS?',
  '¿Qué es PDC?',
  '¿Cuál es la diferencia entre VITALIS y PDC?',
  '¿Cómo interpreto los resultados?',
  '¿Cómo crear un plan de mejora?',
  '¿Cada cuánto aplicar encuestas?',
  '¿Qué hago si una categoría sale baja?',
  '¿Cuántos empleados puedo agregar?',
];

const BOT_RESPONSES: Record<string, string> = {
  'vitalis': 'VITALIS es una encuesta de clima laboral con 35 preguntas que mide satisfacción, bienestar y cultura organizacional. Está basada en el modelo SPORT y evalúa 10 categorías clave del ambiente laboral.\n\n¿Te gustaría saber más sobre alguna categoría específica?',
  'pdc': 'PDC (Performance Diagnostic Checklist) es una encuesta de 43 preguntas enfocada en diagnóstico de desempeño operativo. Evalúa eficiencia de procesos, recursos, comunicación y mejora continua en 10 dimensiones.\n\n¿Quieres saber cuándo aplicarla?',
  'resultado': 'Los resultados se miden en escala 1-5:\n• 4.0-5.0 (Verde): Excelente, mantener\n• 3.0-3.9 (Amarillo): Aceptable, mejorable\n• 1.0-2.9 (Rojo): Crítico, requiere acción\n\nRevisa el dashboard y reportes para análisis detallado por categoría y departamento.',
  'plan': 'Para crear un plan de mejora:\n1) Identifica áreas con score <3.0\n2) Ve a "Planes de Mejora"\n3) Crea un plan con acciones específicas\n4) Asigna responsables y fechas\n5) Monitorea progreso regularmente\n\n¿Necesitas ejemplos de acciones efectivas?',
  'frecuencia': 'Frecuencia recomendada:\n• VITALIS: Cada 6 meses (clima es más estable)\n• PDC: Trimestral (procesos cambian más rápido)\n\nPuedes hacer seguimientos más frecuentes en áreas específicas después de implementar mejoras.',
  'diferencia': 'Diferencias clave:\n\n🟣 VITALIS (Clima Laboral):\n• ¿Cómo se SIENTEN los empleados?\n• Satisfacción, cultura, bienestar\n• Cada 6 meses\n\n🔵 PDC (Desempeño):\n• ¿Qué tan bien FUNCIONAN los procesos?\n• Eficiencia, recursos, procedimientos\n• Trimestral\n\nAmbas son complementarias.',
  'categoria_baja': 'Si una categoría sale <3.0:\n1. Lee los comentarios abiertos\n2. Identifica causas raíz\n3. Crea un Plan de Mejora\n4. Define 4-8 acciones específicas\n5. Asigna responsables\n6. Implementa cambios\n7. Vuelve a medir en 3-6 meses\n\n¿Qué categoría te preocupa?',
  'empleados': 'Límites por plan:\n• Free: Hasta 50 empleados\n• Professional: Hasta 200 empleados\n• Enterprise: Ilimitados\n\n¿Cuántos empleados tienes en tu organización?',
  'anonimo': 'Sí, ambas encuestas son 100% anónimas. Los empleados responden sin identificarse. Solo se recopilan datos demográficos generales (como departamento) que no comprometen la privacidad individual.\n\nEsto garantiza respuestas honestas y sinceras.',
  'tasa_respuesta': 'Una tasa de respuesta saludable es 70-85%.\n\nPara mejorarla:\n• Comunica el propósito claramente\n• Garantiza anonimato\n• Da tiempo suficiente (2-3 semanas)\n• Envía recordatorios amigables\n• Comparte resultados y acciones previas',
  'tiempo': 'Tiempo estimado:\n• VITALIS: 8-10 minutos\n• PDC: 10-12 minutos\n\nEstán diseñadas para ser completas pero respetando el tiempo de tus colaboradores.',
  'exportar': 'Puedes exportar:\n• Reportes en PDF (desde Reportes)\n• Datos de empleados en Excel (desde Empleados)\n• Incluye gráficas, análisis y comparativas\n\n¿Necesitas exportar algo ahora?',
  'default': 'Interesante pregunta. Te recomiendo:\n1. Revisar nuestra sección de FAQs completa\n2. Contactar a soporte para consultas específicas\n3. Explorar el dashboard y reportes\n\n¿Hay algo más en lo que pueda ayudarte?',
};

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente virtual de Vitalis PRO 👋 ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // VITALIS
    if (lowerQuestion.includes('vitalis') && !lowerQuestion.includes('diferencia') && !lowerQuestion.includes('vs')) {
      return BOT_RESPONSES.vitalis;
    }

    // PDC
    if (lowerQuestion.includes('pdc') || lowerQuestion.includes('performance') || lowerQuestion.includes('diagnóstico') || lowerQuestion.includes('diagnostico')) {
      return BOT_RESPONSES.pdc;
    }

    // Diferencias
    if (lowerQuestion.includes('diferencia') || lowerQuestion.includes('vs') || lowerQuestion.includes('comparar')) {
      return BOT_RESPONSES.diferencia;
    }

    // Resultados
    if (lowerQuestion.includes('resultado') || lowerQuestion.includes('interpretar') || lowerQuestion.includes('score') || lowerQuestion.includes('índice')) {
      return BOT_RESPONSES.resultado;
    }

    // Categoría baja
    if (lowerQuestion.includes('baja') || lowerQuestion.includes('bajo') || lowerQuestion.includes('críti') || lowerQuestion.includes('rojo') || lowerQuestion.includes('problema')) {
      return BOT_RESPONSES.categoria_baja;
    }

    // Plan de mejora/acción
    if (lowerQuestion.includes('plan') || lowerQuestion.includes('mejora') || lowerQuestion.includes('acción') || lowerQuestion.includes('accion')) {
      return BOT_RESPONSES.plan;
    }

    // Frecuencia
    if (lowerQuestion.includes('frecuencia') || lowerQuestion.includes('cuándo') || lowerQuestion.includes('cuando') || lowerQuestion.includes('cada cuanto')) {
      return BOT_RESPONSES.frecuencia;
    }

    // Empleados
    if (lowerQuestion.includes('empleado') || lowerQuestion.includes('cuántos') || lowerQuestion.includes('límite') || lowerQuestion.includes('limite') || lowerQuestion.includes('plan')) {
      return BOT_RESPONSES.empleados;
    }

    // Anonimato
    if (lowerQuestion.includes('anoni') || lowerQuestion.includes('privaci') || lowerQuestion.includes('confidencial')) {
      return BOT_RESPONSES.anonimo;
    }

    // Tasa de respuesta
    if (lowerQuestion.includes('tasa') || lowerQuestion.includes('responden') || lowerQuestion.includes('participación') || lowerQuestion.includes('participacion')) {
      return BOT_RESPONSES.tasa_respuesta;
    }

    // Tiempo
    if (lowerQuestion.includes('tiempo') || lowerQuestion.includes('minutos') || lowerQuestion.includes('demora') || lowerQuestion.includes('duración') || lowerQuestion.includes('duracion')) {
      return BOT_RESPONSES.tiempo;
    }

    // Exportar
    if (lowerQuestion.includes('exportar') || lowerQuestion.includes('descargar') || lowerQuestion.includes('pdf') || lowerQuestion.includes('excel')) {
      return BOT_RESPONSES.exportar;
    }

    return BOT_RESPONSES.default;
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(messageText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-3 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all z-40 flex items-center justify-center group touch-manipulation"
        aria-label="Abrir asistente virtual"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-3 md:bottom-6 md:right-6 w-[calc(100vw-1.5rem)] max-w-[95vw] md:w-96 md:max-w-96 h-[500px] md:h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl z-40 border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 md:p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base">Asistente Virtual</h3>
            <div className="flex items-center gap-2 text-xs text-indigo-100">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              En línea
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 rounded-lg p-2 transition-colors"
          aria-label="Cerrar asistente"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString('es-MX', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Questions - Always Visible */}
        {!isTyping && (
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>Preguntas frecuentes:</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTED_QUESTIONS.slice(0, 4).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="w-full text-left text-xs px-3 py-2 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-lg transition-all text-gray-700 hover:text-indigo-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 md:p-4 border-t border-gray-200 bg-white rounded-b-2xl"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-base"
            disabled={isTyping}
          />
          <Button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="px-3 md:px-4 py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 rounded-xl"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center hidden md:block">
          Respuestas generadas automáticamente • No guarda conversaciones
        </p>
      </form>
    </div>
  );
}
