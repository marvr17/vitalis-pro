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
  '¿Cómo interpreto los resultados?',
  '¿Cómo crear un plan de mejora?',
  '¿Cada cuánto aplicar encuestas?',
];

const BOT_RESPONSES: Record<string, string> = {
  'vitalis': 'VITALIS es una encuesta de clima laboral con 35 preguntas que mide satisfacción, bienestar y cultura organizacional. Está basada en el modelo SPORT y evalúa 10 categorías clave del ambiente laboral.',
  'pdc': 'PDC (Performance Diagnostic Checklist) es una encuesta de 43 preguntas enfocada en diagnóstico de desempeño operativo. Evalúa eficiencia de procesos, recursos, comunicación y mejora continua en 10 dimensiones.',
  'resultado': 'Los resultados se miden en escala 1-5. Scores >4.0 son excelentes (verde), 3.0-4.0 son aceptables (amarillo), y <3.0 requieren atención inmediata (rojo). Revisa el dashboard y reportes para análisis detallado.',
  'plan': 'Para crear un plan de mejora: 1) Identifica áreas con score <3.0, 2) Ve a Planes de Mejora, 3) Crea un plan con acciones específicas, responsables y fechas límite, 4) Monitorea el progreso regularmente.',
  'frecuencia': 'Recomendamos aplicar VITALIS cada 6 meses y PDC cada trimestre. VITALIS mide aspectos más estables del clima laboral, mientras que PDC rastrea eficiencia operativa que puede cambiar más rápido.',
  'diferencia': 'VITALIS mide el "cómo se sienten" los empleados (clima emocional), mientras que PDC mide "qué tan bien funcionan" los procesos (eficiencia operativa). Ambas son complementarias para una visión completa.',
  'default': 'Interesante pregunta. Te recomiendo revisar nuestra sección de FAQs o contactar a soporte para más información específica sobre este tema.',
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

    if (lowerQuestion.includes('vitalis')) return BOT_RESPONSES.vitalis;
    if (lowerQuestion.includes('pdc') || lowerQuestion.includes('performance')) return BOT_RESPONSES.pdc;
    if (lowerQuestion.includes('resultado') || lowerQuestion.includes('interpretar')) return BOT_RESPONSES.resultado;
    if (lowerQuestion.includes('plan') || lowerQuestion.includes('mejora')) return BOT_RESPONSES.plan;
    if (lowerQuestion.includes('frecuencia') || lowerQuestion.includes('cuándo') || lowerQuestion.includes('cada cuanto')) return BOT_RESPONSES.frecuencia;
    if (lowerQuestion.includes('diferencia') || lowerQuestion.includes('vs')) return BOT_RESPONSES.diferencia;

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
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50 flex items-center justify-center group"
        aria-label="Abrir asistente virtual"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold">Asistente Virtual</h3>
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
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

        {/* Suggested Questions */}
        {messages.length === 1 && !isTyping && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>Preguntas frecuentes:</span>
            </div>
            {SUGGESTED_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="w-full text-left text-sm px-4 py-2 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-lg transition-all text-gray-700 hover:text-indigo-700"
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 border-t border-gray-200 bg-white rounded-b-2xl"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <Button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 rounded-xl"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Respuestas generadas automáticamente • No guarda conversaciones
        </p>
      </form>
    </div>
  );
}
