// Script para configurar la estructura inicial de Google Sheets
const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function setupSheets() {
  try {
    // Autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    console.log('🚀 Configurando Google Sheets...\n');

    // Obtener hojas existentes
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];

    console.log('📋 Hojas existentes:', existingSheets.join(', '));

    // Definir estructura de hojas
    const sheetsToCreate = [
      {
        name: 'Organizations',
        headers: ['id', 'name', 'slug', 'industry', 'size', 'plan', 'maxEmployees', 'isActive', 'createdAt']
      },
      {
        name: 'Users',
        headers: ['id', 'organizationId', 'email', 'password', 'name', 'role', 'createdAt']
      },
      {
        name: 'Employees',
        headers: ['id', 'organizationId', 'name', 'email', 'department', 'position', 'startDate', 'status']
      },
      {
        name: 'Surveys',
        headers: ['id', 'organizationId', 'name', 'description', 'createdAt', 'status']
      },
      {
        name: 'Responses',
        headers: ['id', 'surveyId', 'employeeId', 'answers', 'submittedAt', 'globalScore']
      }
    ];

    // Crear hojas que no existen
    const requests = [];

    for (const sheet of sheetsToCreate) {
      if (!existingSheets.includes(sheet.name)) {
        console.log(`➕ Creando hoja: ${sheet.name}`);
        requests.push({
          addSheet: {
            properties: {
              title: sheet.name,
            }
          }
        });
      }
    }

    // Ejecutar creación de hojas
    if (requests.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests }
      });
      console.log('✅ Hojas creadas exitosamente\n');
    } else {
      console.log('✅ Todas las hojas ya existen\n');
    }

    // Agregar headers a cada hoja
    console.log('📝 Configurando headers...\n');

    for (const sheet of sheetsToCreate) {
      const range = `${sheet.name}!A1:${String.fromCharCode(64 + sheet.headers.length)}1`;

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
          values: [sheet.headers]
        }
      });

      console.log(`✅ ${sheet.name}: ${sheet.headers.length} columnas configuradas`);
    }

    // Formatear headers (negrita)
    const formatRequests = sheetsToCreate.map(sheet => ({
      repeatCell: {
        range: {
          sheetId: null, // Se llenará automáticamente
          startRowIndex: 0,
          endRowIndex: 1,
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 },
            textFormat: { bold: true }
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat)'
      }
    }));

    console.log('\n🎨 Aplicando formato a headers...');

    // Obtener IDs de hojas
    const updatedSpreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetIds = {};
    updatedSpreadsheet.data.sheets?.forEach(s => {
      if (s.properties?.title) {
        sheetIds[s.properties.title] = s.properties.sheetId;
      }
    });

    // Aplicar formato a cada hoja
    const finalRequests = sheetsToCreate.map(sheet => ({
      repeatCell: {
        range: {
          sheetId: sheetIds[sheet.name],
          startRowIndex: 0,
          endRowIndex: 1,
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.4, green: 0.4, blue: 0.8 },
            textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat)'
      }
    }));

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: finalRequests }
    });

    console.log('✅ Formato aplicado exitosamente\n');
    console.log('🎉 ¡Google Sheets configurado correctamente!');
    console.log('\n📊 Puedes ver tu sheet en:');
    console.log(`https://docs.google.com/spreadsheets/d/${spreadsheetId}\n`);

  } catch (error) {
    console.error('❌ Error al configurar Google Sheets:', error.message);
    if (error.response?.data?.error) {
      console.error('Detalles:', error.response.data.error);
    }
    process.exit(1);
  }
}

setupSheets();
