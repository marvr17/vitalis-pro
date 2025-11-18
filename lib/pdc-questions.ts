/**
 * PDC - Performance Diagnostic Checklist
 * Diagnóstico de Desempeño Organizacional
 * Enfocado en procesos, eficiencia y desempeño operativo
 */

export interface PDCQuestion {
  id: string;
  text: string;
  category: string;
  type: 'scale' | 'text' | 'select';
  options?: string[];
}

export const PDC_QUESTIONS: PDCQuestion[] = [
  // 1. CLARIDAD DE OBJETIVOS Y ROLES
  {
    id: 'pdc_1',
    text: '¿Tengo claridad sobre mis objetivos y metas de desempeño?',
    category: 'claridad',
    type: 'scale',
  },
  {
    id: 'pdc_2',
    text: '¿Sé exactamente qué se espera de mí en mi puesto?',
    category: 'claridad',
    type: 'scale',
  },
  {
    id: 'pdc_3',
    text: '¿Mis responsabilidades están claramente definidas y documentadas?',
    category: 'claridad',
    type: 'scale',
  },
  {
    id: 'pdc_4',
    text: '¿Los objetivos de mi área están alineados con los objetivos de la empresa?',
    category: 'claridad',
    type: 'scale',
  },

  // 2. RECURSOS Y HERRAMIENTAS
  {
    id: 'pdc_5',
    text: '¿Cuento con las herramientas necesarias para realizar mi trabajo eficientemente?',
    category: 'recursos',
    type: 'scale',
  },
  {
    id: 'pdc_6',
    text: '¿Tengo acceso a la información que necesito cuando la necesito?',
    category: 'recursos',
    type: 'scale',
  },
  {
    id: 'pdc_7',
    text: '¿Los sistemas y tecnología que uso funcionan adecuadamente?',
    category: 'recursos',
    type: 'scale',
  },
  {
    id: 'pdc_8',
    text: '¿El presupuesto asignado es suficiente para cumplir mis objetivos?',
    category: 'recursos',
    type: 'scale',
  },

  // 3. PROCESOS Y PROCEDIMIENTOS
  {
    id: 'pdc_9',
    text: '¿Los procesos de trabajo están bien definidos y son claros?',
    category: 'procesos',
    type: 'scale',
  },
  {
    id: 'pdc_10',
    text: '¿Los procedimientos actuales permiten trabajar de manera eficiente?',
    category: 'procesos',
    type: 'scale',
  },
  {
    id: 'pdc_11',
    text: '¿Existen cuellos de botella o duplicidad de esfuerzos en los procesos?',
    category: 'procesos',
    type: 'scale',
  },
  {
    id: 'pdc_12',
    text: '¿Se documentan y actualizan regularmente los procesos de trabajo?',
    category: 'procesos',
    type: 'scale',
  },

  // 4. CAPACITACIÓN Y COMPETENCIAS
  {
    id: 'pdc_13',
    text: '¿Recibí la capacitación necesaria para desempeñar mi rol actual?',
    category: 'capacitacion',
    type: 'scale',
  },
  {
    id: 'pdc_14',
    text: '¿Tengo las habilidades técnicas requeridas para mi puesto?',
    category: 'capacitacion',
    type: 'scale',
  },
  {
    id: 'pdc_15',
    text: '¿Se me ofrece formación continua para mantenerme actualizado?',
    category: 'capacitacion',
    type: 'scale',
  },
  {
    id: 'pdc_16',
    text: '¿Puedo aplicar lo aprendido en capacitaciones a mi trabajo diario?',
    category: 'capacitacion',
    type: 'scale',
  },

  // 5. COMUNICACIÓN Y COORDINACIÓN
  {
    id: 'pdc_17',
    text: '¿La comunicación entre áreas es efectiva y oportuna?',
    category: 'comunicacion',
    type: 'scale',
  },
  {
    id: 'pdc_18',
    text: '¿Recibo información clara y completa para tomar decisiones?',
    category: 'comunicacion',
    type: 'scale',
  },
  {
    id: 'pdc_19',
    text: '¿Las reuniones son productivas y tienen resultados concretos?',
    category: 'comunicacion',
    type: 'scale',
  },
  {
    id: 'pdc_20',
    text: '¿Existe buena coordinación entre mi área y otras áreas?',
    category: 'comunicacion',
    type: 'scale',
  },

  // 6. MEDICIÓN Y RETROALIMENTACIÓN
  {
    id: 'pdc_21',
    text: '¿Recibo retroalimentación regular sobre mi desempeño?',
    category: 'medicion',
    type: 'scale',
  },
  {
    id: 'pdc_22',
    text: '¿Existen métricas claras para medir mi desempeño?',
    category: 'medicion',
    type: 'scale',
  },
  {
    id: 'pdc_23',
    text: '¿Se monitorean y miden los resultados de mi área?',
    category: 'medicion',
    type: 'scale',
  },
  {
    id: 'pdc_24',
    text: '¿La retroalimentación que recibo es específica y útil?',
    category: 'medicion',
    type: 'scale',
  },

  // 7. TOMA DE DECISIONES
  {
    id: 'pdc_25',
    text: '¿Tengo la autoridad necesaria para tomar decisiones en mi rol?',
    category: 'decisiones',
    type: 'scale',
  },
  {
    id: 'pdc_26',
    text: '¿Las decisiones se toman basadas en datos y análisis?',
    category: 'decisiones',
    type: 'scale',
  },
  {
    id: 'pdc_27',
    text: '¿Se me consulta cuando se toman decisiones que afectan mi trabajo?',
    category: 'decisiones',
    type: 'scale',
  },
  {
    id: 'pdc_28',
    text: '¿Las decisiones importantes se comunican de manera oportuna?',
    category: 'decisiones',
    type: 'scale',
  },

  // 8. RESOLUCIÓN DE PROBLEMAS
  {
    id: 'pdc_29',
    text: '¿Los problemas se identifican y resuelven rápidamente?',
    category: 'problemas',
    type: 'scale',
  },
  {
    id: 'pdc_30',
    text: '¿Existe un proceso claro para escalar problemas cuando es necesario?',
    category: 'problemas',
    type: 'scale',
  },
  {
    id: 'pdc_31',
    text: '¿Se analizan las causas raíz de los problemas recurrentes?',
    category: 'problemas',
    type: 'scale',
  },
  {
    id: 'pdc_32',
    text: '¿Mi jefe me apoya cuando enfrento obstáculos en mi trabajo?',
    category: 'problemas',
    type: 'scale',
  },

  // 9. TIEMPO Y PRODUCTIVIDAD
  {
    id: 'pdc_33',
    text: '¿Puedo completar mi trabajo en el tiempo asignado?',
    category: 'tiempo',
    type: 'scale',
  },
  {
    id: 'pdc_34',
    text: '¿La carga de trabajo está distribuida equitativamente?',
    category: 'tiempo',
    type: 'scale',
  },
  {
    id: 'pdc_35',
    text: '¿Tengo tiempo suficiente para planificar y no solo "apagar fuegos"?',
    category: 'tiempo',
    type: 'scale',
  },
  {
    id: 'pdc_36',
    text: '¿Las interrupciones y distracciones están bajo control?',
    category: 'tiempo',
    type: 'scale',
  },

  // 10. MEJORA CONTINUA
  {
    id: 'pdc_37',
    text: '¿Se fomenta la innovación y mejora continua en mi área?',
    category: 'mejora',
    type: 'scale',
  },
  {
    id: 'pdc_38',
    text: '¿Mis sugerencias de mejora son escuchadas y consideradas?',
    category: 'mejora',
    type: 'scale',
  },
  {
    id: 'pdc_39',
    text: '¿Se implementan cambios cuando se identifican oportunidades de mejora?',
    category: 'mejora',
    type: 'scale',
  },
  {
    id: 'pdc_40',
    text: '¿Existe un proceso formal para proponer y evaluar mejoras?',
    category: 'mejora',
    type: 'scale',
  },

  // PREGUNTAS ABIERTAS
  {
    id: 'pdc_open_1',
    text: '¿Cuál es el principal obstáculo que impide que tu área alcance sus objetivos?',
    category: 'abierta',
    type: 'text',
  },
  {
    id: 'pdc_open_2',
    text: '¿Qué proceso o procedimiento debería cambiarse para mejorar la eficiencia?',
    category: 'abierta',
    type: 'text',
  },
  {
    id: 'pdc_open_3',
    text: '¿Qué herramienta, sistema o recurso adicional necesitas para trabajar mejor?',
    category: 'abierta',
    type: 'text',
  },
];

export const PDC_CATEGORY_NAMES = {
  claridad: 'Claridad de Objetivos y Roles',
  recursos: 'Recursos y Herramientas',
  procesos: 'Procesos y Procedimientos',
  capacitacion: 'Capacitación y Competencias',
  comunicacion: 'Comunicación y Coordinación',
  medicion: 'Medición y Retroalimentación',
  decisiones: 'Toma de Decisiones',
  problemas: 'Resolución de Problemas',
  tiempo: 'Tiempo y Productividad',
  mejora: 'Mejora Continua',
  abierta: 'Comentarios Adicionales',
};
