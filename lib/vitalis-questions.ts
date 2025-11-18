export interface Question {
  id: string;
  text: string;
  type: 'scale' | 'text' | 'select';
  category: string;
  options?: string[];
  required: boolean;
}

export const VITALIS_QUESTIONS: Question[] = [
  // SECCIÓN A: DEMOGRÁFICOS
  {
    id: 'area',
    text: 'Área de trabajo',
    type: 'text',
    category: 'demograficos',
    required: true,
  },
  {
    id: 'puesto',
    text: 'Puesto',
    type: 'text',
    category: 'demograficos',
    required: true,
  },
  {
    id: 'antiguedad',
    text: 'Antigüedad en la empresa',
    type: 'select',
    category: 'demograficos',
    options: ['Menos de 6 meses', '6 meses a 1 año', '1 a 2 años', '2 a 4 años', 'Más de 4 años'],
    required: true,
  },

  // SECCIÓN B: CLARIDAD Y RECURSOS
  {
    id: 'q11',
    text: 'Comprendo claramente qué se espera de mí en mi trabajo y cómo contribuye a los objetivos de la empresa',
    type: 'scale',
    category: 'claridad',
    required: true,
  },
  {
    id: 'q12',
    text: 'He recibido la capacitación necesaria para realizar mi trabajo eficientemente',
    type: 'scale',
    category: 'capacitacion',
    required: true,
  },
  {
    id: 'q13',
    text: 'Tengo todos los recursos, herramientas y materiales necesarios para hacer mi trabajo',
    type: 'scale',
    category: 'recursos',
    required: true,
  },
  {
    id: 'q14',
    text: 'Las instalaciones de trabajo son adecuadas, seguras y cómodas',
    type: 'scale',
    category: 'recursos',
    required: true,
  },
  {
    id: 'q15',
    text: 'Los procesos y sistemas de trabajo son eficientes, lógicos y sin obstáculos innecesarios',
    type: 'scale',
    category: 'procesos',
    required: true,
  },

  // SECCIÓN C: LIDERAZGO
  {
    id: 'q16',
    text: 'Mi supervisor me da instrucciones claras y retroalimentación útil sobre mi desempeño',
    type: 'scale',
    category: 'liderazgo',
    required: true,
  },
  {
    id: 'q17',
    text: 'Mi supervisor me apoya, está disponible cuando lo necesito y escucha mis preocupaciones',
    type: 'scale',
    category: 'liderazgo',
    required: true,
  },
  {
    id: 'q18',
    text: 'Mi supervisor es un buen modelo a seguir, cumple lo que exige y actúa como mentor',
    type: 'scale',
    category: 'liderazgo',
    required: true,
  },

  // SECCIÓN D: RECONOCIMIENTO Y CARGA
  {
    id: 'q19',
    text: 'Recibo reconocimiento cuando hago bien mi trabajo y veo los efectos positivos de mi esfuerzo',
    type: 'scale',
    category: 'reconocimiento',
    required: true,
  },
  {
    id: 'q20',
    text: 'Mi carga de trabajo es manejable y no interfiere con mi vida personal o familiar',
    type: 'scale',
    category: 'balance',
    required: true,
  },

  // SECCIÓN E: TRABAJO EN EQUIPO
  {
    id: 'q21',
    text: 'Me siento parte de un equipo y la comunicación con mis compañeros es buena',
    type: 'scale',
    category: 'equipo',
    required: true,
  },
  {
    id: 'q22',
    text: 'Existe respeto y buen trato entre todos los colaboradores',
    type: 'scale',
    category: 'equipo',
    required: true,
  },
  {
    id: 'q23',
    text: 'El trabajo en equipo y la colaboración entre áreas es efectiva',
    type: 'scale',
    category: 'equipo',
    required: true,
  },
  {
    id: 'q24',
    text: 'La empresa es diversa, inclusiva y trata a todos con justicia y sin favoritismos',
    type: 'scale',
    category: 'equidad',
    required: true,
  },

  // SECCIÓN F: AMBIENTE
  {
    id: 'q25',
    text: 'El ambiente de trabajo es positivo, motivante y me siento valorado',
    type: 'scale',
    category: 'ambiente',
    required: true,
  },
  {
    id: 'q26',
    text: 'La empresa invierte en mi bienestar físico y mental',
    type: 'scale',
    category: 'bienestar',
    required: true,
  },
  {
    id: 'q27',
    text: 'La empresa es flexible con permisos, horarios y entiende mi situación personal',
    type: 'scale',
    category: 'flexibilidad',
    required: true,
  },

  // SECCIÓN G: DESARROLLO
  {
    id: 'q28',
    text: 'La empresa me ofrece oportunidades de capacitación y desarrollo para mejorar mis habilidades',
    type: 'scale',
    category: 'desarrollo',
    required: true,
  },
  {
    id: 'q29',
    text: 'He tenido oportunidades de asumir nuevas responsabilidades y enfrentar retos profesionales',
    type: 'scale',
    category: 'desarrollo',
    required: true,
  },
  {
    id: 'q30',
    text: 'Existen oportunidades claras de ascenso, promoción y crecimiento dentro de la empresa',
    type: 'scale',
    category: 'desarrollo',
    required: true,
  },

  // SECCIÓN H: COMPENSACIÓN
  {
    id: 'q31',
    text: 'Considero que mi salario es justo, equitativo y acorde a mi desempeño',
    type: 'scale',
    category: 'compensacion',
    required: true,
  },
  {
    id: 'q32',
    text: 'Estoy satisfecho con las prestaciones, beneficios e incentivos que ofrece la empresa',
    type: 'scale',
    category: 'compensacion',
    required: true,
  },

  // SECCIÓN I: COMPROMISO
  {
    id: 'q33',
    text: 'Me siento orgulloso de trabajar aquí y recomendaría esta empresa como un buen lugar para trabajar',
    type: 'scale',
    category: 'compromiso',
    required: true,
  },

  // SECCIÓN J: PREGUNTAS ABIERTAS
  {
    id: 'open1',
    text: '¿Qué es lo que más te gusta y motiva de trabajar en esta empresa?',
    type: 'text',
    category: 'abierta',
    required: false,
  },
  {
    id: 'open2',
    text: '¿En qué área(s) crees que la empresa debería mejorar?',
    type: 'text',
    category: 'abierta',
    required: false,
  },
  {
    id: 'open3',
    text: '¿Cómo visualizas a la empresa en 5 años?',
    type: 'text',
    category: 'abierta',
    required: false,
  },
];

export const SCALE_OPTIONS = [
  { value: 1, label: 'Totalmente en desacuerdo' },
  { value: 2, label: 'En desacuerdo' },
  { value: 3, label: 'Ni de acuerdo ni en desacuerdo' },
  { value: 4, label: 'De acuerdo' },
  { value: 5, label: 'Totalmente de acuerdo' },
];

export function calculateScores(answers: Record<string, any>) {
  const categories = {
    claridad: ['q11'],
    capacitacion: ['q12'],
    recursos: ['q13', 'q14'],
    procesos: ['q15'],
    liderazgo: ['q16', 'q17', 'q18'],
    reconocimiento: ['q19'],
    balance: ['q20'],
    equipo: ['q21', 'q22', 'q23'],
    equidad: ['q24'],
    ambiente: ['q25'],
    bienestar: ['q26'],
    flexibilidad: ['q27'],
    desarrollo: ['q28', 'q29', 'q30'],
    compensacion: ['q31', 'q32'],
    compromiso: ['q33'],
  };

  const scores: Record<string, number> = {};

  for (const [category, questions] of Object.entries(categories)) {
    const categoryScores = questions
      .map(q => answers[q])
      .filter(v => v !== undefined && v !== null && v !== '');

    if (categoryScores.length > 0) {
      scores[category] = categoryScores.reduce((a, b) => a + Number(b), 0) / categoryScores.length;
    }
  }

  // Score global
  const allScores = Object.values(scores);
  scores.global = allScores.length > 0
    ? allScores.reduce((a, b) => a + b, 0) / allScores.length
    : 0;

  return scores;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    claridad: 'Claridad de Rol',
    capacitacion: 'Capacitación',
    recursos: 'Recursos y Ambiente',
    procesos: 'Procesos',
    liderazgo: 'Liderazgo',
    reconocimiento: 'Reconocimiento',
    balance: 'Balance Vida-Trabajo',
    equipo: 'Trabajo en Equipo',
    equidad: 'Equidad e Inclusión',
    ambiente: 'Ambiente Laboral',
    bienestar: 'Bienestar',
    flexibilidad: 'Flexibilidad',
    desarrollo: 'Desarrollo Profesional',
    compensacion: 'Compensación',
    compromiso: 'Compromiso y Orgullo',
    global: 'Índice Global Vitalis',
  };
  return labels[category] || category;
}
