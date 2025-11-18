import { NextResponse } from 'next/server';
import { getAllOrganizations } from '@/lib/sheets';

export async function GET(request: Request) {
  try {
    // TODO: En producción, verificar que el usuario sea super_admin mediante JWT/cookies
    // Por ahora, confiamos en la verificación del frontend

    const organizations = await getAllOrganizations();

    return NextResponse.json({
      success: true,
      organizations,
    });
  } catch (error) {
    console.error('Error obteniendo organizaciones:', error);
    return NextResponse.json(
      { message: 'Error al obtener organizaciones' },
      { status: 500 }
    );
  }
}
