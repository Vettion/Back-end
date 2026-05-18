# Vettion - API REST (Backend)

Vettion es el sistema de gestión del lado del servidor para una clínica veterinaria. Proporciona una API RESTful para gestionar de forma centralizada clientes, pacientes (mascotas), citas médicas, personal y estado de las salas.

## 🚀 Tecnologías Utilizadas

- **Entorno de Ejecución:** Node.js (v24.15.0)
- **Framework Web:** Express.js
- **Base de Datos:** MariaDB (v11.3.2)
- **Despliegue Local:** Docker y Docker Compose
- **ORM / Query Builder:** Knex.js (driver `mysql`)
- **Validación de Datos:** express-validator

## ⚙️ Módulos Principales de la API (Rutas)

La API expone los siguientes recursos principales a través de sus endpoints:

- `/owners` - Gestión de dueños de mascotas.
- `/pets` - Gestión de mascotas (pacientes).
- `/appointments` - Gestión de citas veterinarias.
- `/veterinarians` - Gestión del personal veterinario.
- `/rooms` - Gestión del estado de las salas de la clínica.
- `/services` & `/clean_services` - Gestión de servicios médicos y de limpieza.
- `/cleaners` - Gestión del personal de limpieza.
- `/pathologies` - Gestión de patologías y enfermedades.
- `/registers` - Registros e historiales.

## 🛠️ Requisitos Previos

Para ejecutar este backend en un entorno local, necesitas tener instalado:
- **Node.js** (Se recomienda usar la versión especificada en el package.json)
- **Docker** y **Docker Compose** (Para desplegar automáticamente la base de datos MariaDB)

## 🚀 Despliegue y Ejecución Local

Sigue estos pasos para arrancar el servidor en tu máquina:

1. **Instalar Dependencias**
   Abre tu terminal en la carpeta del backend y ejecuta:
   ```bash
   npm install
   ```

2. **Configuración de Variables de Entorno**
   El proyecto incluye archivos de muestra para la configuración:
   - Copia `.env.sample` a `.env`
   - O usa `config.sample.yaml` para crear tu `config.local.yaml`
   *Nota: Estos archivos contienen las credenciales necesarias para que el contenedor de Docker configure la base de datos MariaDB.*

3. **Levantar Base de Datos y Servidor (Modo Desarrollo)**
   Para arrancar todo con un solo comando:
   ```bash
   npm run dev
   ```
   > Este comando hace dos cosas:
   > 1. Utiliza `docker-compose.dev.yaml` para crear y levantar un contenedor llamado `vettion-dev-db` con MariaDB en el puerto 3306.
   > 2. Arranca la aplicación Node.js utilizando `nodemon` en el puerto `8080`, lo que permite que el servidor se reinicie automáticamente si detecta cambios en el código.

   *(Para arrancar solo la aplicación Node en modo producción, puedes usar `npm start`)*

## 📂 Estructura del Código

A continuación se muestra la estructura principal de directorios y archivos del backend:

```text
Back-end/
├── db/                         # Scripts de inicialización de la base de datos
│   ├── init.sql
│   ├── procedures.sql
│   └── seeds.sql
├── src/                        # Código fuente de la API
│   ├── configuration/          # Archivos de configuración
│   ├── controller/             # Controladores (lógica de respuesta HTTP)
│   ├── middlewares/            # Middlewares de Express (Manejo de errores, etc.)
│   ├── router/                 # Definición de rutas (endpoints)
│   ├── service/                # Lógica de negocio y consultas DB (Knex)
│   ├── test/                   # Pruebas automatizadas
│   ├── utils/                  # Funciones utilitarias compartidas
│   ├── validators/             # Validadores de datos de entrada
│   └── app.js                  # Archivo principal de entrada
├── docker-compose.dev.yaml     # Configuración para levantar MariaDB con Docker
├── package.json                # Dependencias y scripts de Node.js
└── README.md                   # Documentación del backend
```

Detalle de la carpeta `src/`:

- `src/app.js`: Archivo de entrada de la aplicación. Configura Express, middlewares y define los enrutadores principales.
- `src/router/`: Archivos de definición de rutas (endpoints).
- `src/controller/`: Lógica para procesar las peticiones HTTP y devolver respuestas.
- `src/service/`: Lógica de negocio y consultas a la base de datos utilizando Knex.js.
- `src/validators/`: Funciones de validación para asegurar la integridad de los datos de entrada (usando express-validator).
- `src/middlewares/`: Funciones intermedias para interceptar peticiones (ej. manejo global de errores).
- `src/utils/`: Funciones utilitarias compartidas en el proyecto.
- `src/configuration/`: Archivos para la lectura de propiedades o configuración del entorno.
