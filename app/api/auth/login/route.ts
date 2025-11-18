import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { getUserByEmail, getOrganizationById } from '@/lib/sheets';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Obtener organización
    const organization = await getOrganizationById(user.organizationId);

    if (!organization || organization.isActive !== 'true') {
      return NextResponse.json(
        { message: 'Organización no activa' },
        { status: 403 }
      );
    }

    // Devolver datos del usuario (sin password)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        plan: organization.plan,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { message: 'Error al iniciar sesión' },
      { status: 500 }
    );
  }
}
