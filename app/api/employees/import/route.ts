import { NextResponse } from 'next/server';
import { createEmployee, generateId, getOrganizationById, getEmployeesByOrganization } from '@/lib/sheets';

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

    // Verificar límite de empleados del plan
    const organization = await getOrganizationById(organizationId);
    if (!organization) {
      return NextResponse.json(
        { message: 'Organización no encontrada' },
        { status: 404 }
      );
    }

    const currentEmployees = await getEmployeesByOrganization(organizationId);
    const maxEmployees = parseInt(organization.maxEmployees) || 50;
    const availableSlots = maxEmployees - currentEmployees.length;

    if (availableSlots <= 0) {
      return NextResponse.json(
        {
          message: `Has alcanzado el límite de ${maxEmployees} empleados de tu plan ${organization.plan}. No puedes importar más empleados.`,
          limit: maxEmployees,
          current: currentEmployees.length,
        },
        { status: 403 }
      );
    }

    if (employees.length > availableSlots) {
      return NextResponse.json(
        {
          message: `Solo puedes importar ${availableSlots} empleados más. Tu plan ${organization.plan} permite un máximo de ${maxEmployees} empleados y actualmente tienes ${currentEmployees.length}.`,
          limit: maxEmployees,
          current: currentEmployees.length,
          available: availableSlots,
          trying: employees.length,
        },
        { status: 403 }
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
          age: emp.age ? parseInt(emp.age) : undefined,
          gender: emp.gender || '',
          tenure: emp.tenure || '',
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
