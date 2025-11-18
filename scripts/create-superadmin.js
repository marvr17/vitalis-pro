const { google } = require('googleapis');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function createSuperAdmin() {
  try {
    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;

    // Datos del super admin
    const email = 'marvr17@gmail.com';
    const password = 'admin123';
    const name = 'Super Admin';
    const role = 'super_admin';

    // Hash de la contraseña
    console.log('🔐 Encriptando contraseña...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generar ID único
    const userId = Date.now().toString(36) + Math.random().toString(36).substring(2);

    // Crear fila para Google Sheets
    const row = [
      userId,                    // id
      'PLATFORM',               // organizationId (especial para super admin)
      email,                    // email
      name,                     // name
      hashedPassword,           // password
      role,                     // role
      'true',                   // isActive
      new Date().toISOString(), // createdAt
    ];

    console.log('📝 Agregando Super Admin a Google Sheets...');

    // Agregar a la hoja "users"
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'users!A:H',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    console.log('✅ Super Admin creado exitosamente!');
    console.log('');
    console.log('📧 Email:', email);
    console.log('🔑 Contraseña:', password);
    console.log('👤 Rol:', role);
    console.log('');
    console.log('Ahora puedes iniciar sesión en /login con estas credenciales.');
    console.log('Una vez dentro, serás redirigido al panel de Super Admin.');

  } catch (error) {
    console.error('❌ Error al crear Super Admin:', error);
    process.exit(1);
  }
}

createSuperAdmin();
