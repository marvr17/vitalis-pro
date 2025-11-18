# Vitalis PRO - Plataforma SaaS de Clima Laboral

Plataforma profesional multi-tenant para medir y analizar el clima laboral de empresas mediante encuestas optimizadas y análisis con IA.

## Características Principales

- **Dashboard Interactivo**: KPIs en tiempo real con diseño profesional estilo "gringo SaaS"
- **Gestión de Empleados**: Importación CSV, búsqueda avanzada, gestión completa
- **Encuestas Vitalis**: 35 preguntas optimizadas en 10 categorías
- **Análisis con IA**: Recomendaciones automáticas y planes de acción
- **Multi-tenant**: Aislamiento completo de datos por organización
- **Reportes PDF**: Exportación de resultados y análisis

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + componentes personalizados
- **Base de Datos**: Google Sheets (migrable a PostgreSQL)
- **Autenticación**: bcryptjs (actualizar a NextAuth.js en producción)
- **Tipado**: TypeScript
- **Iconos**: Lucide React

## Inicio Rápido

### 1. Instalación de Dependencias

```bash
cd vitalis-app
npm install
```

### 2. Configuración de Google Sheets

#### 2.1 Crear Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto llamado "Vitalis PRO"
3. Habilita la API de Google Sheets:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Sheets API"
   - Haz clic en "Enable"

#### 2.2 Crear Service Account

1. Ve a "APIs & Services" > "Credentials"
2. Clic en "Create Credentials" > "Service Account"
3. Nombre: `vitalis-sheets-service`
4. Role: "Editor"
5. Clic en "Done"

#### 2.3 Generar Clave JSON

1. Encuentra tu service account en la lista
2. Clic en los tres puntos > "Manage Keys"
3. "Add Key" > "Create new key" > "JSON"
4. Guarda el archivo descargado

#### 2.4 Compartir Google Sheet

1. Abre tu Google Sheet: [https://docs.google.com/spreadsheets/d/1uj1A2oz1IkSyZPKhPNSfKVz1s3cMqk-5W7QesZuRnaY](https://docs.google.com/spreadsheets/d/1uj1A2oz1IkSyZPKhPNSfKVz1s3cMqk-5W7QesZuRnaY)
2. Clic en "Share"
3. Agrega el email del service account (de tu archivo JSON: `client_email`)
4. Permisos: "Editor"

### 3. Variables de Entorno

Crea o edita el archivo `.env.local`:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=1uj1A2oz1IkSyZPKhPNSfKVz1s3cMqk-5W7QesZuRnaY
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com

# Auth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=vitalis-pro-secret-change-this-in-production-2024
```

**IMPORTANTE**:
- Copia el `private_key` del JSON descargado (incluyendo `\n`)
- Usa comillas dobles para `GOOGLE_PRIVATE_KEY`

### 4. Estructura de Google Sheets

Tu Google Sheet debe tener estas hojas (tabs):

- **Organizations**: id, name, slug, industry, size, plan, maxEmployees, isActive, createdAt
- **Users**: id, organizationId, email, password, name, role, createdAt
- **Employees**: id, organizationId, name, email, department, position, startDate, status
- **Surveys**: id, organizationId, name, description, createdAt, status
- **Responses**: id, surveyId, employeeId, answers, submittedAt, globalScore

### 5. Ejecutar Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Flujo de Uso

### 1. Registro de Organización

1. Ve a `/register`
2. Completa: Nombre de empresa, Nombre admin, Email, Contraseña
3. Se crea automáticamente:
   - Organización con slug único
   - Usuario admin
   - Plan trial (50 empleados max, 30 días)

### 2. Gestión de Empleados

1. Dashboard > Empleados
2. **Agregar Individual**: Botón "Agregar Empleado"
3. **Importación CSV**:
   - Botón "Importar CSV"
   - Descarga plantilla
   - Sube archivo con: name, email, department, position, startDate

### 3. Crear Encuesta

1. Dashboard > Encuestas > "Nueva Encuesta"
2. Completa nombre y descripción
3. **Guardar Borrador** o **Crear y Enviar**
4. Al enviar, todos los empleados reciben link único

### 4. Responder Encuesta

1. Empleados acceden a `/survey/[surveyId]`
2. Responden 35 preguntas en 10 categorías
3. Progreso guardado por categoría
4. Envío final anónimo

### 5. Ver Resultados

1. Dashboard > Encuestas > "Ver Resultados"
2. KPIs: Índice global, tasa respuesta, áreas críticas
3. Desglose por categoría con gráficos
4. Alertas críticas con recomendaciones
5. Cursos sugeridos basados en resultados

## Estructura del Proyecto

```
vitalis-app/
├── app/
│   ├── [orgSlug]/              # Rutas multi-tenant
│   │   ├── dashboard/          # Dashboard principal
│   │   ├── employees/          # Gestión empleados
│   │   ├── surveys/            # Lista encuestas
│   │   │   ├── create/         # Crear encuesta
│   │   │   └── [surveyId]/     # Resultados
│   │   └── layout.tsx          # Layout con sidebar
│   ├── survey/[surveyId]/      # Formulario público
│   ├── login/                  # Login
│   ├── register/               # Registro
│   └── api/
│       ├── auth/login/         # API login
│       ├── organizations/      # API organizaciones
│       └── employees/          # API empleados
├── components/
│   ├── ui/                     # Componentes base
│   └── employees/              # Componentes empleados
├── lib/
│   ├── sheets.ts               # Cliente Google Sheets
│   ├── vitalis-questions.ts    # Cuestionario optimizado
│   └── utils.ts                # Utilidades
└── public/
```

## Categorías Vitalis (35 preguntas)

1. **Claridad de Roles y Objetivos** (4 preguntas)
2. **Capacitación y Recursos** (3 preguntas)
3. **Recursos y Ambiente Físico** (4 preguntas)
4. **Liderazgo y Feedback** (4 preguntas)
5. **Reconocimiento y Consecuencias** (3 preguntas)
6. **Balance Vida-Trabajo** (3 preguntas)
7. **Trabajo en Equipo** (4 preguntas)
8. **Desarrollo Profesional** (3 preguntas)
9. **Compensación y Beneficios** (3 preguntas)
10. **Compromiso y Cultura** (4 preguntas)

## Sistema de Scoring

- **Escala Likert**: 1 (Muy en desacuerdo) - 5 (Muy de acuerdo)
- **Índice Global**: Promedio de todas las categorías
- **Interpretación**:
  - 🟢 4.0-5.0: Saludable
  - 🟡 3.0-3.9: Mejorable
  - 🔴 <3.0: Crítico

## Próximos Pasos (Roadmap)

### Fase 1 - MVP Completado ✅
- [x] Componentes UI profesionales
- [x] Dashboard con KPIs
- [x] Gestión empleados + CSV
- [x] Módulo encuestas completo
- [x] Formulario público

### Fase 2 - Análisis Avanzado
- [ ] API de respuestas funcional
- [ ] Cálculo automático de scores
- [ ] Análisis con IA (OpenAI)
- [ ] Recomendaciones PDC
- [ ] Generación PDF reportes

### Fase 3 - Funcionalidades Pro
- [ ] Módulo PDC (diagnóstico performance)
- [ ] Benchmarking entre empresas
- [ ] Emails automáticos (Resend)
- [ ] Recordatorios encuestas
- [ ] Panel de administración

### Fase 4 - Escalabilidad
- [ ] Migración a PostgreSQL/Supabase
- [ ] NextAuth.js + cookies seguras
- [ ] Rate limiting
- [ ] Logs y monitoreo
- [ ] Tests automatizados

## Despliegue

### Vercel (Recomendado)

1. Push a GitHub
2. Conecta repositorio en Vercel
3. Configura variables de entorno
4. Deploy automático

### Variables de Entorno en Producción

```env
GOOGLE_SHEET_ID=...
GOOGLE_PRIVATE_KEY=...
GOOGLE_CLIENT_EMAIL=...
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=... # Genera uno nuevo con: openssl rand -base64 32
```

## Seguridad

- ⚠️ **Autenticación actual es MVP**: Migrar a NextAuth.js para producción
- ⚠️ **Google Sheets tiene límites**: Max 500 req/100 sec, considera caché
- ✅ **Passwords hasheados** con bcryptjs (10 rounds)
- ✅ **Aislamiento de datos** por organizationId
- ✅ **Validación** de inputs en APIs

## Soporte

Para problemas o dudas:
1. Revisa `EJECUTAR_PROYECTO.md` para troubleshooting
2. Verifica logs del servidor en consola
3. Confirma permisos de Google Sheets

## Licencia

Propietario - Vitalis PRO © 2024
