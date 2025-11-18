import { google } from 'googleapis';

// Configurar el cliente de Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

// Helper: Convertir array de objetos a filas de Sheet
function objectToRow(obj: any, headers: string[]): any[] {
  return headers.map(header => obj[header] ?? '');
}

// Helper: Convertir filas de Sheet a objetos
function rowsToObjects(rows: any[][], headers: string[]): any[] {
  return rows.slice(1).map(row => {
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] ?? '';
    });
    return obj;
  });
}

// ==========================================
// ORGANIZACIONES
// ==========================================

export async function createOrganization(data: {
  id: string;
  name: string;
  slug: string;
  industry?: string;
  size?: string;
  plan: string;
  maxEmployees: number;
}) {
  const row = [
    data.id,
    data.name,
    data.slug,
    data.industry || '',
    data.size || '',
    data.plan,
    data.maxEmployees,
    'true', // isActive
    new Date().toISOString(),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'organizations!A:I',
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });

  return data;
}

export async function getOrganizationBySlug(slug: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'organizations!A:I',
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) return null;

  const headers = rows[0];
  const orgs = rowsToObjects(rows, headers);

  return orgs.find(org => org.slug === slug) || null;
}

export async function getOrganizationById(id: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'organizations!A:I',
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) return null;

  const headers = rows[0];
  const orgs = rowsToObjects(rows, headers);

  return orgs.find(org => org.id === id) || null;
}

export async function getAllOrganizations() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'organizations!A:I',
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  const orgs = rowsToObjects(rows, headers);

  return orgs;
}

// ==========================================
// USUARIOS (Admins de empresas)
// ==========================================

export async function createUser(data: {
  id: string;
  organizationId: string;
  email: string;
  name: string;
  password: string;
  role: string;
}) {
  const row = [
    data.id,
    data.organizationId,
    data.email,
    data.name,
    data.password,
    data.role,
    'true', // isActive
    new Date().toISOString(),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'users!A:H',
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });

  return data;
}

export async function getUserByEmail(email: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'users!A:H',
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) return null;

  const headers = rows[0];
  const users = rowsToObjects(rows, headers);

  return users.find(user => user.email === email) || null;
}

// ==========================================
// EMPLEADOS
// ==========================================

export async function createEmployee(data: {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  department?: string;
  position?: string;
  age?: number;
  gender?: string;
  tenure?: string;
}) {
  const row = [
    data.id,
    data.organizationId,
    data.name,
    data.email,
    data.department || '',
    data.position || '',
    data.age || '',
    data.gender || '',
    data.tenure || '',
    'true', // isActive
    new Date().toISOString(),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'employees!A:K',
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });

  return data;
}

export async function getEmployeesByOrganization(organizationId: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'employees!A:K',
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  const employees = rowsToObjects(rows, headers);

  return employees.filter(emp => emp.organizationId === organizationId && emp.isActive === 'true');
}

export async function importEmployeesCSV(organizationId: string, csvData: any[]) {
  const rows = csvData.map(emp => [
    generateId(),
    organizationId,
    emp.name,
    emp.email,
    emp.department || '',
    emp.position || '',
    emp.age || '',
    emp.gender || '',
    emp.tenure || '',
    'true',
    new Date().toISOString(),
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'employees!A:K',
    valueInputOption: 'RAW',
    requestBody: {
      values: rows,
    },
  });

  return csvData.length;
}

// ==========================================
// ENCUESTAS
// ==========================================

export async function createSurvey(data: {
  id: string;
  organizationId: string;
  title: string;
  type: string;
  status: string;
  isAnonymous: boolean;
  targetEmployees: string[];
  startDate: string;
  endDate: string;
}) {
  const row = [
    data.id,
    data.organizationId,
    data.title,
    data.type,
    data.status,
    data.isAnonymous ? 'true' : 'false',
    JSON.stringify(data.targetEmployees),
    data.startDate,
    data.endDate,
    new Date().toISOString(),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'surveys!A:J',
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });

  return data;
}

export async function getSurveysByOrganization(organizationId: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'surveys!A:J',
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  const surveys = rowsToObjects(rows, headers);

  return surveys.filter(survey => survey.organizationId === organizationId);
}

// ==========================================
// RESPUESTAS
// ==========================================

export async function createResponse(data: {
  id: string;
  organizationId: string;
  surveyId: string;
  employeeId?: string;
  answers: any;
  scores?: any;
  globalScore?: number;
}) {
  const row = [
    data.id,
    data.organizationId,
    data.surveyId,
    data.employeeId || '',
    JSON.stringify(data.answers),
    JSON.stringify(data.scores || {}),
    data.globalScore || '',
    new Date().toISOString(),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'responses!A:H',
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });

  return data;
}

export async function getResponsesBySurvey(surveyId: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'responses!A:H',
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  const responses = rowsToObjects(rows, headers);

  return responses.filter(resp => resp.surveyId === surveyId);
}

// ==========================================
// UTILIDADES
// ==========================================

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
