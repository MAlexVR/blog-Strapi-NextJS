# Configuración de Strapi con Supabase, Cloudinary y Render

Este proyecto detalla los pasos para configurar Strapi con una base de datos en Supabase y Cloudinary como proveedor de almacenamiento de archivos.

## Paso 1: Crear el proyecto Strapi

Ejecuta el siguiente comando para crear un nuevo proyecto de Strapi:

```bash
npx create-strapi-app my-project
```

Selecciona la opción "Custom (manual settings)" para personalizar la configuración durante la instalación.
Cuando te pregunte el tipo de base de datos, selecciona **PostgreSQL**.

## Paso 2: Instalar soporte para PostgreSQL

Dado que estamos utilizando Supabase, que se basa en PostgreSQL, instala el paquete `pg` para soporte:

```bash
npm install pg
```

## Paso 3: Configurar las variables de entorno en el archivo `.env`

Crea un archivo `.env` en la raíz de tu proyecto y agrega las siguientes configuraciones:

```env
# Server
HOST=<your_host>
PORT=<your_port>

# Secrets
APP_KEYS=<your_app_keys>
API_TOKEN_SALT=<your_api_token_salt>
ADMIN_JWT_SECRET=<your_admin_jwt_secret>
TRANSFER_TOKEN_SALT=<your_transfer_token_salt>

# Cloudinary
CLOUDINARY_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# Supabase
DATABASE_CLIENT=postgres
DATABASE_HOST=<your_database_host>
DATABASE_PORT=<your_database_port>
DATABASE_NAME=<your_database_name>
DATABASE_USERNAME=<your_database_username>
DATABASE_PASSWORD=<your_database_password>
DATABASE_SSL=<your_database_ssl>
JWT_SECRET=<your_jwt_secret>
```

## Paso 4: Configurar la base de datos en Strapi

Abre el archivo `config/database.js` y actualiza la configuración para que Strapi utilice las variables de entorno que configuraste en el archivo `.env`:

```javascript
module.exports = {
  connection: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      ssl:
        process.env.DATABASE_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
    },
    debug: false,
  },
};
```

## Paso 5: Integrar Cloudinary en Strapi

Instala el proveedor de subida de archivos de Cloudinary ejecutando el siguiente comando:

```bash
npm install @strapi/provider-upload-cloudinary
```

Luego, configura el proveedor en el archivo `config/plugins.js`. Si el archivo no existe, créalo en la carpeta `config`:

```javascript
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_API_KEY"),
        api_secret: env("CLOUDINARY_API_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
```

## Paso 6: Configurar `middleware.js`

Crea o edita el archivo `config/middleware.js` para incluir la configuración de middleware predeterminada:

```javascript
module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
```

## Paso 7: Iniciar el servidor de desarrollo de Strapi

Ejecuta el siguiente comando para iniciar Strapi:

```bash
npm run develop
```

Esto iniciará el servidor de desarrollo y podrás acceder al panel de administración en `http://localhost:1337/admin`.

## Desplegar Strapi en Render

Este documento detalla los pasos para desplegar tu proyecto de Strapi con base de datos Supabase y Cloudinary en [Render](https://render.com/).

### Paso 1: Crear una cuenta en Render

1. Dirígete a [https://render.com/](https://render.com/) y regístrate.
2. Conecta tu cuenta de GitHub a Render para permitir el despliegue del proyecto.

### Paso 2: Crear un nuevo servicio web en Render

1. En el panel de Render, selecciona "New" -> "Web Service".
2. Selecciona el repositorio de GitHub donde se encuentra tu proyecto de Strapi (bajo la carpeta `backend`).
3. Llena los detalles básicos del servicio:
   - **Name**: Elige un nombre para tu proyecto.
   - **Branch**: Selecciona la rama que contiene tu proyecto (e.g., `main`).
   - **Root Directory**: Configura la carpeta raíz del proyecto, en este caso `backend`.

### Paso 3: Configurar la construcción y los comandos de ejecución

En la sección de configuración del servicio, completa la siguiente información:

- **Environment**: Node.js
- **Build Command**: Configura el comando para construir el proyecto:
  ```bash
  npm install && npm run build
  ```
- **Start Command**: Configura el comando para iniciar el servidor:
  ```bash
  npm run start
  ```

### Paso 4: Configurar las variables de entorno

Render necesita las variables de entorno configuradas para funcionar correctamente. En el panel del servicio, navega a la sección **Environment** y agrega las siguientes variables:

- **HOST**: `0.0.0.0`
- **PORT**: `1337`
- **APP_KEYS**: `<your_app_keys>`
- **API_TOKEN_SALT**: `<your_api_token_salt>`
- **ADMIN_JWT_SECRET**: `<your_admin_jwt_secret>`
- **TRANSFER_TOKEN_SALT**: `<your_transfer_token_salt>`
- **JWT_SECRET**: `<your_jwt_secret>`

#### Cloudinary Variables

- **CLOUDINARY_NAME**: `<your_cloudinary_name>`
- **CLOUDINARY_API_KEY**: `<your_cloudinary_api_key>`
- **CLOUDINARY_API_SECRET**: `<your_cloudinary_api_secret>`

#### Supabase Variables

- **DATABASE_CLIENT**: `postgres`
- **DATABASE_HOST**: `<your_database_host>`
- **DATABASE_PORT**: `<your_database_port>`
- **DATABASE_NAME**: `<your_database_name>`
- **DATABASE_USERNAME**: `<your_database_username>`
- **DATABASE_PASSWORD**: `<your_database_password>`
- **DATABASE_SSL**: `false`

### Paso 5: Configurar el servicio de base de datos (opcional)

En Render, puedes conectar servicios de bases de datos directamente. En este caso, como estás utilizando Supabase, asegúrate de que Supabase esté configurado y que Render pueda conectarse mediante las credenciales que se colocaron en las variables de entorno.

### Paso 6: Desplegar la aplicación

1. Después de configurar las variables de entorno, selecciona **Create Web Service** para comenzar a desplegar tu proyecto.
2. Render instalará las dependencias, construirá el proyecto, y luego iniciará el servidor.

### Paso 7: Verificar la aplicación

- Una vez completado el despliegue, Render mostrará la URL de tu servicio en el panel.
- Puedes acceder a la URL para ver tu instancia de Strapi en funcionamiento.
- También puedes acceder al panel de administración de Strapi añadiendo `/admin` a la URL proporcionada.

### Nota adicional

- Asegúrate de revisar los registros del servicio en Render para cualquier error relacionado con la base de datos o la conexión con Cloudinary.
- En caso de que necesites cambiar las variables de entorno, puedes hacerlo desde la pestaña **Environment** del servicio y luego reiniciar la aplicación para aplicar los cambios.
