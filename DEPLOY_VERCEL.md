# Guía de Deploy en Vercel - Vitalis PRO

## Paso 1: Inicializar Git y Subir a GitHub

### 1.1 Inicializar repositorio Git

```bash
cd "C:\Users\hp\Apps\Vitalis Pro\vitalis-app"
git init
git add .
git commit -m "Initial commit: Vitalis PRO - SaaS Clima Laboral"
```

### 1.2 Crear repositorio en GitHub

1. Ve a: https://github.com/new
2. Nombre del repositorio: `vitalis-pro`
3. Descripción: `Plataforma SaaS para medir y mejorar el clima laboral`
4. Visibilidad: **Private** (recomendado) o Public
5. NO inicialices con README, .gitignore ni licencia
6. Clic en "Create repository"

### 1.3 Conectar y hacer push

```bash
git remote add origin https://github.com/TU-USUARIO/vitalis-pro.git
git branch -M main
git push -u origin main
```

---

## Paso 2: Configurar Vercel

### 2.1 Crear cuenta en Vercel

1. Ve a: https://vercel.com/signup
2. Regístrate con tu cuenta de GitHub (recomendado)
3. Autoriza Vercel para acceder a tus repositorios

### 2.2 Importar proyecto

1. En el dashboard de Vercel, clic en "Add New" → "Project"
2. Busca tu repositorio `vitalis-pro`
3. Clic en "Import"

### 2.3 Configurar el proyecto

En la pantalla de configuración:

- **Project Name**: `vitalis-pro` (o el que prefieras)
- **Framework Preset**: Next.js (se detecta automáticamente)
- **Root Directory**: `./` (dejar por defecto)
- **Build Command**: `npm run build` (ya configurado)
- **Output Directory**: `.next` (ya configurado)

---

## Paso 3: Configurar Variables de Entorno

**MUY IMPORTANTE**: Antes de hacer deploy, configura las variables de entorno.

### 3.1 En Vercel, ve a "Environment Variables"

Agrega las siguientes variables:

#### Google Sheets Configuration

**GOOGLE_SHEET_ID**
```
1uj1A2oz1IkSyZPKhPNSfKVz1s3cMqk-5W7QesZuRnaY
```

**GOOGLE_PRIVATE_KEY**
```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCq+mmkAPsSegkT
kNdg99EAr+i1Rex7rP1014CYnuRlsHxWKTxuzc/P1dETD0MDrUeeKmB5b3omBNmR
65bXCkPihxcdzftehWuhzW8ODqMVum3tavtEAGx3Yo6QOd0ie/9DGzj9zQdOR+Vt
ZwV36upDZDD8s/F/ZxecGpfld383O7Ccv1X93cBpZ8G3iOiWxxu2Zg2WThX/R0LD
eFQ+k0cDf5xV8s+Z2jfmZ0+/kEfID8Wsb1BY8MaotYf5RBm2VrWp9N7X125w8xeH
Uci9M3z9AqH1TqWOVijiA0qkS5ehRC2897aiPmnBeb7PHZIUjiLYHxJ5w2rAcHjl
T+V5j8rPAgMBAAECggEATPhEHGewn2W+tkcrHmUReqy2Jvzec+KxiysEojBNg5XK
s4MGyJ7wYZDQ+TKSqZIVPpe3LJPJulnOlEkpc48UdmL4PhufgLKxfHqd9wcR1dNC
b3IMwVUrfycoJLdX3JFTnaMgqejl1BC7sN+C77QaV9I/11MucXs4frbeEJgV9ge1
eQ3sJtMZJXLMjDdqDhhxyYQTGlybQo+3hHDfGdTTcA3tSIajVO7uKa5kzX4XBHB6
DnV5V+sbpX5tMKCMnG9OndR6c9A0QD+d0HGGUA2cw9iKizn8/HcMjz8Jr9hMxE8T
UG45qtiJlM2ARzMvFT6VnGAkvvznvhZ0644EzGudcQKBgQDZ6DDh49bEtpf/dW67
gVFrIbCAmU432db/Ee9JLLDmLb91Zr7HdbpaT5ENP6MCbKOYqooshjBxp8/4KIiv
84v+bSVwMyeiO9+Wwfed8xRiQ2P4nLd68upzuIetib9a2Ka9BUquTO57aAersbXw
htEiztKis+WSiz6+c/RFC4jJpwKBgQDI3g42jqvQNn7WHHqPDWcuxaYtocwT2OXv
BWnPSY6dtKuegmSveUU6b/erx54qjIxEnklGczirbApsvfuw3qeZYx5ol8T+yDkr
cKBQlzALK/jvO7nUXJS7kmRt2W0o1GrN2lhIWib67Z+aRY7vkMul9/JQu91r9hNO
biyId/NKmQKBgQCsPtnE9TBjNmJX0B/Dn6kYIf0+6e/mPg+weCDJmsYKbMcWqizL
xceUc6iY7GCSHgYDO2sVXs0USi4eXwwM6VsTtnsNgaImn2VR6ekttWO7eMGhV1/B
lBq3dnnpNyVHTlIev/wUY0Nv0P+fPE4w3qCZ/xqI+eLSP7dNHKNNoJxzqQKBgQCu
noQCn8LzbfyTjAxrgf5aZc6SSt7LvjodsToLzulhZifv03FOLoGlTKMlvZJdcPOb
z3LqAM6aD4F8iShd2SIgMU/FI3NI/qzce7uSc+x7Oc3dw7FH0PgnnBscd/Dylr8G
l7M5qs3KRHsENUYOM3UmokcQMlFKQpEEFLk4JfbluQKBgEjfr0jZngExsu2enjXU
i8QYa6rRkpyuLS6LVxpTeLeC/SlYVKYKO6GAB6Dq/nSlLVrjNXM7VEvj+e6P43sn
9iE3udwy3nHkylQ3+Mc2nBZowr+4hcog9ueae4rNDVngVWE4Z4nLdooWOajXdf5g
x0iFdWhA60ZL2QeFGq07Crdu
-----END PRIVATE KEY-----
```
⚠️ **IMPORTANTE**: Copia TODO incluyendo `-----BEGIN` y `-----END-----`

**GOOGLE_CLIENT_EMAIL**
```
vitalis-sheets-service@pagina-web-477519.iam.gserviceaccount.com
```

#### NextAuth Configuration

**NEXTAUTH_URL**
```
https://vitalis-pro.vercel.app
```
(Cambia por tu dominio real cuando se despliegue)

**NEXTAUTH_SECRET**

Genera un secret seguro ejecutando en tu terminal:
```bash
openssl rand -base64 32
```
Copia el resultado y úsalo como valor.

#### OpenAI (Opcional)

**OPENAI_API_KEY**
```
sk-opcional
```
(Agregar tu API key de OpenAI cuando implementes análisis con IA)

### 3.2 Marcar variables para todos los entornos

Para cada variable, marca los checkboxes:
- ✅ Production
- ✅ Preview
- ✅ Development

---

## Paso 4: Deploy

1. Clic en "Deploy"
2. Vercel comenzará a construir tu aplicación
3. Espera 2-3 minutos
4. ¡Listo! Tu app está en vivo 🎉

---

## Paso 5: Verificar y Configurar

### 5.1 Verificar que funciona

1. Ve a la URL generada (ej: `https://vitalis-pro.vercel.app`)
2. Prueba:
   - Landing page con fondos animados ✅
   - Botón "Ver Demo" → `/demo/demo-empresa/dashboard` ✅
   - Registro de cuenta ✅
   - Login ✅

### 5.2 Actualizar NEXTAUTH_URL

Si la URL es diferente a la que pusiste:
1. Ve a Project Settings → Environment Variables
2. Edita `NEXTAUTH_URL` con la URL correcta
3. Redeploy (Settings → Deployments → ... → Redeploy)

### 5.3 Configurar dominio personalizado (Opcional)

1. En Vercel: Settings → Domains
2. Agrega tu dominio: `vitalis.tudominio.com`
3. Configura DNS según las instrucciones
4. Actualiza `NEXTAUTH_URL` con el nuevo dominio

---

## Paso 6: Compartir el Google Sheet

**IMPORTANTE**: Asegúrate de que el Google Sheet esté compartido con la service account en PRODUCCIÓN también.

1. Abre: https://docs.google.com/spreadsheets/d/1uj1A2oz1IkSyZPKhPNSfKVz1s3cMqk-5W7QesZuRnaY
2. Verifica que `vitalis-sheets-service@pagina-web-477519.iam.gserviceaccount.com` tenga acceso de **Editor**

---

## Comandos Útiles

### Actualizar el código en producción

```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción de los cambios"
git push

# Vercel desplegará automáticamente
```

### Ver logs en tiempo real

1. Ve a tu proyecto en Vercel
2. Clic en el deployment actual
3. Pestaña "Logs" para ver errores

### Rollback a versión anterior

1. Settings → Deployments
2. Encuentra la versión anterior
3. ... → "Promote to Production"

---

## Solución de Problemas

### Error: "Google Sheets API permission denied"

- Verifica que el sheet esté compartido con la service account
- Verifica que `GOOGLE_PRIVATE_KEY` esté completo (con `\n` entre líneas)

### Error: "Module not found"

- Verifica que todas las dependencias estén en `package.json`
- Haz commit y push de `package.json` y `package-lock.json`

### Error: Build failed

- Revisa los logs en Vercel
- Verifica que el código compile localmente con `npm run build`

---

## Próximos Pasos

Una vez desplegado:

1. ✅ Probar flujo completo de registro → login → dashboard
2. ✅ Verificar que los datos se guarden en Google Sheets
3. ✅ Compartir link de demo con clientes potenciales
4. 📈 Monitorear métricas en Vercel Analytics
5. 🚀 Implementar mejoras según feedback

---

## Contacto y Soporte

- **Documentación Vercel**: https://vercel.com/docs
- **Documentación Next.js**: https://nextjs.org/docs
- **Google Sheets API**: https://developers.google.com/sheets/api

---

¡Éxito con tu lanzamiento de Vitalis PRO! 🎉
