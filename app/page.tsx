import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient - profesional y moderno */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>

        {/* Animated blobs - colores que transmiten confianza y bienestar */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-l from-indigo-400 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-gradient-to-t from-violet-400 to-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-grid-slate-100 opacity-40"></div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30"></div>
      </div>

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                V
              </div>
              <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Vitalis PRO
              </span>
            </div>
            <div className="flex gap-2 md:gap-4 items-center">
              <Link
                href="/demo/demo-empresa/dashboard"
                className="px-2 md:px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 text-sm md:text-base"
              >
                <span className="hidden md:inline">👁️</span>
                <span className="hidden sm:inline">Ver Demo</span>
                <span className="sm:hidden">Demo</span>
              </Link>
              <Link
                href="/login"
                className="hidden md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="px-3 md:px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 font-medium shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
              >
                <span className="hidden sm:inline">Prueba Gratis</span>
                <span className="sm:hidden">Registrar</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Reduce tu rotación 30%
            <br />
            en 60 días
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            La plataforma que te dice <strong>QUÉ está mal</strong> en tu clima laboral
            y <strong>QUÉ HACER</strong> al respecto.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 font-bold text-lg shadow-lg"
            >
              🚀 Prueba gratis 30 días
            </Link>
            <Link
              href="#como-funciona"
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-bold text-lg"
            >
              Ver cómo funciona
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            ✅ No requiere tarjeta de crédito • ✅ Setup en 5 minutos • ✅ Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">15 min</div>
            <div className="text-gray-600">Tiempo de encuesta</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">24 hrs</div>
            <div className="text-gray-600">Primeros resultados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-600 mb-2">30%</div>
            <div className="text-gray-600">Reducción de rotación</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              ¿Tu empresa sufre de...?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                '❌ Alta rotación de personal',
                '❌ Bajo desempeño sin saber por qué',
                '❌ Encuestas que nadie lee',
                '❌ Clima laboral malo pero no sabes qué arreglar',
                '❌ Inversión en RRHH sin resultados',
                '❌ Colaboradores desmotivados',
              ].map((problem, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                  <span className="text-lg">{problem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="como-funciona" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Vitalis te dice exactamente qué hacer
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Encuesta inteligente de 15 min',
                  desc: '35 preguntas optimizadas basadas en ciencia (SPORT + PDC)',
                },
                {
                  step: '2',
                  title: 'Dashboard en tiempo real',
                  desc: 'Ve exactamente qué áreas están críticas 🔴 y cuáles bien 🟢',
                },
                {
                  step: '3',
                  title: 'Plan de acción automático',
                  desc: 'Recomendaciones específicas: qué hacer, cómo, cuánto cuesta y qué impacto tendrá',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pricing transparente
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$1,999',
                employees: '1-50 empleados',
                features: ['Encuesta Vitalis', 'Dashboard básico', 'Reportes PDF', '1 admin'],
              },
              {
                name: 'Growth',
                price: '$5,999',
                employees: '51-200 empleados',
                features: ['Todo de Starter', 'Módulo PDC', 'IA avanzada', '3 admins', 'Soporte prioritario'],
                popular: true,
              },
              {
                name: 'Business',
                price: '$11,999',
                employees: '201-500 empleados',
                features: ['Todo de Growth', 'White-label', 'API acceso', 'CSM dedicado', 'SLA 99.9%'],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl border-2 ${
                  plan.popular
                    ? 'border-indigo-600 shadow-xl scale-105'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold py-1 px-4 rounded-full inline-block mb-4">
                    MÁS POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {plan.price}
                  <span className="text-lg text-gray-600">/mes</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.employees}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block w-full py-3 rounded-lg font-bold text-center ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Empezar ahora
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para mejorar tu clima laboral?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a las empresas que ya están reduciendo su rotación con Vitalis
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 font-bold text-lg shadow-lg"
          >
            🚀 Prueba gratis 30 días
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Vitalis PRO. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
