import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { createOrganization, createUser, getUserByEmail, generateId } from '@/lib/sheets';
import { slugify } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, adminName, email, password } = body;

    // Validaciones
    if (!companyName || !adminName || !email || !password) {
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Este email ya está registrado' },
        { status: 400 }
      );
    }

    // Crear organización
    const orgId = generateId();
    const slug = slugify(companyName);

    const organization = await createOrganization({
      id: orgId,
      name: companyName,
      slug: slug,
      plan: 'trial',
      maxEmployees: 50,
    });

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Crear usuario admin
    const userId = generateId();
    const user = await createUser({
      id: userId,
      organizationId: orgId,
      email,
      name: adminName,
      password: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json({
      success: true,
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
      },
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { message: 'Error al crear la cuenta. Por favor intenta de nuevo.' },
      { status: 500 }
    );
  }
}
