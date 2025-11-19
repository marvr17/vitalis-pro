import { NextResponse } from 'next/server';
import { getEmployeesByOrganization, createEmployee, generateId, getOrganizationById } from '@/lib/sheets';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');

    if (!organizationId) {
      return NextResponse.json(
        { message: 'organizationId es requerido' },
        { status: 400 }
      );
    }

    const employees = await getEmployeesByOrganization(organizationId);

    return NextResponse.json({ employees });
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    return NextResponse.json(
      { message: 'Error al obtener empleados' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { organizationId, name, email, department, position, age, gender, tenure } = body;

    // Validaciones
    if (!organizationId || !name || !email) {
      return NextResponse.json(
        { message: 'organizationId, name y email son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Email inválido' },
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

    if (currentEmployees.length >= maxEmployees) {
      const planNames: Record<string, string> = {
        trial: 'Trial',
        professional: 'Professional',
        enterprise: 'Enterprise',
      };

      const planName = planNames[organization.plan] || organization.plan;

      return NextResponse.json(
        {
          message: `Has alcanzado el límite de ${maxEmployees} empleados de tu plan ${planName}. Contacta al administrador para aumentar tu límite.`,
          limit: maxEmployees,
          current: currentEmployees.length,
          plan: organization.plan
        },
        { status: 403 }
      );
    }

    // Crear empleado
    const employeeId = generateId();
    const employee = await createEmployee({
      id: employeeId,
      organizationId,
      name,
      email,
      department: department || '',
      position: position || '',
      age: age ? parseInt(age) : undefined,
      gender: gender || '',
      tenure: tenure || '',
    });

    return NextResponse.json({
      success: true,
      employee,
    });
  } catch (error: any) {
    console.error('Error al crear empleado:', error);
    return NextResponse.json(
      { message: 'Error al crear empleado. ' + error.message },
      { status: 500 }
    );
  }
}
