import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { plan } = await request.json();
    const orgId = params.id;

    if (!plan) {
      return NextResponse.json(
        { message: 'Plan es requerido' },
        { status: 400 }
      );
    }

    // Determinar maxEmployees según el plan
    const planLimits: Record<string, number> = {
      trial: 50,
      professional: 200,
      enterprise: 999999,
    };

    const maxEmployees = planLimits[plan] || 50;

    // Obtener todas las organizaciones
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'organizations!A:I',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      return NextResponse.json(
        { message: 'Organización no encontrada' },
        { status: 404 }
      );
    }

    // Encontrar la fila de la organización
    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === orgId) {
        rowIndex = i + 1; // +1 porque las filas en Sheets empiezan en 1
        break;
      }
    }

    if (rowIndex === -1) {
      return NextResponse.json(
        { message: 'Organización no encontrada' },
        { status: 404 }
      );
    }

    // Actualizar plan (columna F = índice 5) y maxEmployees (columna G = índice 6)
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        valueInputOption: 'RAW',
        data: [
          {
            range: `organizations!F${rowIndex}`,
            values: [[plan]],
          },
          {
            range: `organizations!G${rowIndex}`,
            values: [[maxEmployees]],
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      organization: {
        id: orgId,
        plan,
        maxEmployees,
      },
    });
  } catch (error) {
    console.error('Error al actualizar organización:', error);
    return NextResponse.json(
      { message: 'Error al actualizar organización' },
      { status: 500 }
    );
  }
}
