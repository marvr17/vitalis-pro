import { NextResponse } from 'next/server';
import { createEmployee, generateId } from '@/lib/sheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { organizationId, employees } = body;

    if (!organizationId || !employees || !Array.isArray(employees)) {
      return NextResponse.json(
        { message: 'organizationId y employees array son requeridos' },
        { status: 400 }
      );
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const emp of employees) {
      try {
        // Validaciones básicas
        if (!emp.name || !emp.email) {
          results.failed++;
          results.errors.push(`Fila omitida: falta nombre o email`);
          continue;
        }

        if (!emailRegex.test(emp.email)) {
          results.failed++;
          results.errors.push(`Email inválido: ${emp.email}`);
          continue;
        }

        // Crear empleado
        await createEmployee({
          id: generateId(),
          organizationId,
          name: emp.name,
          email: emp.email,
          department: emp.department || '',
          position: emp.position || '',
          startDate: emp.startDate || new Date().toISOString().split('T')[0],
          status: 'active',
        });

        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(`Error con ${emp.email}: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error: any) {
    console.error('Error al importar empleados:', error);
    return NextResponse.json(
      { message: 'Error al importar empleados: ' + error.message },
      { status: 500 }
    );
  }
}
