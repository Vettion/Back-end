<div align="center">
  <img src="https://github.com/user-attachments/assets/1204bfec-6738-40ee-a6bc-83149b93cb22" width="200" height="200" alt="Vettion Logo" />
  <h1>Vettion Frontend</h1>
  <p>
    <strong>API REST para sistema de gestión de clínica veterinaria</strong>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
    <img src="https://img.shields.io/badge/Knex.js-E83951?style=for-the-badge" alt="Knex.js" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </p>
</div>

Un backend robusto y escalable que expone los endpoints necesarios para administrar mascotas, dueños, citas médicas, personal y catálogos, construido sobre la arquitectura de Node.js y Express.

---

## 📋 Descripción

**Vettion Backend** es la API RESTful central para el control integral de los procesos de una clínica veterinaria. Desarrollada con Node.js y Express, se encarga del procesamiento de datos, validación y almacenamiento organizado, operando sobre una base de datos relacional (MariaDB/MySQL).

El proyecto implementa una arquitectura multicapa (Rutas, Controladores y Servicios), cuenta con validación robusta de entrada de datos a través de express-validator y orquestación de lógicas complejas como validación de turnos, cruce de agendas y disponibilidad de salas para una óptima gestión clínica.

---

## ✨ Características

- 🏥 **Gestión Clínica Completa:** Endpoints (CRUD) para administración de dueños, expedientes de mascotas, historiales médicos y diagnósticos (patologías).
- 📅 **Calendario y Citas:** Sistema dinámico para reservar, modificar y validar citas médicas cotejando la vigencia de doctores y salas operativas.
- 🧑‍⚕️ **Gestión de Personal:** Administración del staff de la clínica veterinaria (veterinarios y limpiadores).
- ✔️ **Validación de Datos:** Middleware de sanitización y validación estricta utilizando `express-validator`.
- 🏗️ **Arquitectura MVC Modificada:** Patrón claro con separación transaccional en capas (Controllers, Routes, Services).
- 🐳 **Docker Listo:** Incluye despliegue con `docker-compose.dev.yaml` para un arranque rápido y agnóstico al entorno, cargando datos de SQL por defecto.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de tiempo de ejecución de JavaScript.
- **Express.js** - Framework web rápido, minimalista y flexible.
- **MySQL2 & Knex.js** - Conexión nativa a DB SQL con constructor de consultas (Query Builder) optimizado de forma limpia y segura.
- **Express Validator** - Conjunto de middlewares para Express que valida los campos de los request.
- **Jest & Chai** - Entorno unitario de Testing enfocado al backend.

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js >= 20.x
- MariaDB/MySQL >= 10.x
- npm >= 10.x
- Docker y Docker Compose (Opcional, pre-requisito recomendado)

## Archivos de Configuración YAML

A diferencia de otros proyectos que utilizan `.env`, Vettion parametriza su configuración en un `.yaml`. Crea y edita un archivo `config.local.yaml` en la raíz partiendo del ejemplo de muestra:

```bash
cp config.sample.yaml config.local.yaml
```

---

## 🚀 Instalación Rápida

**1. Clona el Repositorio**

```bash
git clone https://github.com/tuusuario/Vettion-Backend.git
cd Vettion-Backend
```

**2. Instala las Dependencias**

```bash
npm install
```

**3. Configura tu Entorno local**
Asegúrate de haber creado el archivo `config.local.yaml` como se detalló en los requisitos previos.

**4. Inicializa la Base de Datos y el API Server**
Si utilizas Docker, existe un comando atajo que levantará **MariaDB/MySQL** y ejecutará el servidor con Nodemon integrado de un solo bloque (también inyectará de forma automática los archivos `db/init.sql`, `db/procedures.sql` y `db/seeds.sql` al contenedor):

```bash
# Iniciar stack de desarrollo (Docker Db + API)
npm run dev
```

Si por el contrario no te sirves de docker, puedes emplear node puro:

```bash
# Modo normal (Producción)
npm start
```

✅ La API estará escuchando en `http://localhost:8080/` (o puerto expuesto).

---

## 📡 API Endpoints Principales

Aquí un resumen de los endpoints base soportados por Vettion. Puedes consultar o importar directamente la colección de Postman desde tu clonado local (`Vettion.postman_collection.json`).

### 👤 Dueños (`/owners`)

| Método | Endpoint      | Descripción                             |
| ------ | ------------- | --------------------------------------- |
| POST   | `/owners`     | Registrar a un nuevo dueño              |
| GET    | `/owners`     | Listado general de dueños               |
| GET    | `/owners/:id` | Buscar la información de un único dueño |
| PUT    | `/owners/:id` | Modificar un dueño existente            |
| DELETE | `/owners/:id` | Eliminar dueño de la base de datos      |

### 🐶 Mascotas (`/pets`)

| Método | Endpoint    | Descripción                     |
| ------ | ----------- | ------------------------------- |
| POST   | `/pets`     | Registrar una nueva mascota     |
| GET    | `/pets`     | Listar todas las mascotas       |
| GET    | `/pets/:id` | Ver expediente de una mascota   |
| PUT    | `/pets/:id` | Actualizar datos de un paciente |
| DELETE | `/pets/:id` | Borrar paciente del registro    |

### 📅 Citas Médicas (`/appointments`)

| Método | Endpoint            | Descripción                             |
| ------ | ------------------- | --------------------------------------- |
| POST   | `/appointments`     | Generar y validar una nueva cita médica |
| GET    | `/appointments`     | Listar citas programadas                |
| GET    | `/appointments/:id` | Recuperar detalle de la cita            |
| PUT    | `/appointments/:id` | Reasignar u actualizar una cita         |
| DELETE | `/appointments/:id` | Cancelar cita                           |

### 🩺 Veterinarios y Limpiadores (`/veterinarians`, `/cleaners`)

| Método | Endpoint                               | Descripción                                         |
| ------ | -------------------------------------- | --------------------------------------------------- |
| POST   | `/veterinarians` ó `/cleaners`         | Altas para nuevo personal veterinario o de limpieza |
| GET    | `/veterinarians` ó `/cleaners`         | Consulta del staff activo                           |
| PUT    | `/veterinarians/:id` ó `/cleaners/:id` | Actualizar información del trabajador               |
| DELETE | `/veterinarians/:id` ó `/cleaners/:id` | Dar de baja a un empleado                           |

### 🏥 Clínico (Salas, Patologías y Registros)

| Endpoint Base     | Módulo Controlado                                    |
| ----------------- | ---------------------------------------------------- |
| `/rooms`          | Salas físicas y disponibilidad de quirófanos         |
| `/pathologies`    | Listado y CRUD de las enfermedades tratadas          |
| `/services`       | Lista general de servicios que ofrece la veterinaria |
| `/clean_services` | Registro detallado de la limpieza de salas           |
| `/registers`      | Registro base de las fichas clínicas e historiales   |

---

## 🏗️ Uso Rápido y Scripts Disponibles

El proyecto incluye los siguientes scripts en `package.json`:

| Comando       | Descripción                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `npm run dev` | Levanta el docker compose en subproceso e inicia el modo desarrollo usando Nodemon con auto-recarga. |
| `npm start`   | Inicia el servidor bajo flujo corriente en entorno manual.                                           |
| `npm test`    | Ejecuta la suite de pruebas unitarias implementadas bajo Jest/Chai.                                  |

---

## 📁 Estructura del Proyecto

```text
Vettion-Backend/
├── db/                      # Scripts de Base de Datos y Stored Procedures
│   ├── init.sql
│   ├── procedures.sql
│   └── seeds.sql
├── src/
│   ├── app.js               # Punto de entrada de toda la app (Express, configuraciones globales)
│   ├── configuration/       # Interpretadores de ficheros YAML y Conectores de DB
│   ├── controller/          # Controladores que manejan la Entrada/Salida de HTTP requests
│   ├── middlewares/         # Middlewares de validación para Express
│   ├── router/              # Definición en bloque de los Endpoints expuestos por módulo
│   ├── service/             # Lógica de negocio (Business Layer) y transacciones puros a DB orientadas por Knex
│   ├── utils/               # Funciones utilitarias genéricas (Manejador de fechas, weekend checker...)
│   ├── validators/          # Esquemas parametrizados con Express-Validator
│   └── test/                # Capa de automatizaciones de test con Jest/Chai
├── docker-compose.dev.yaml  # Orquestador de contenedores para DB y API
├── Vettion.postman_collection.json # Colección de endpoints para probar con Postman
└── package.json             # Instalaciones y scripts clave
```

---

## 🏗️ Arquitectura Multicapa

El backend de Vettion está modelado en una arquitectura de capas bien definidas:

1. **Ruta (`router/`)**: Define la URI, aplica la serialización de validadores (`validators/`) o middlewares custom.
2. **Controlador (`controller/`)**: Recibe datos HTTP y variables saneadas, dialoga con un service determinado y entrega o formatea la respuesta en JSON.
3. **Servicio (`service/`)**: Almacena el _core business_ y el acceso final a la base de datos, comunicando resultados puros al controlador ascendente.

---

## 👥 Autores

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/7adrii">
        <img src="https://github.com/7adrii.png" width="100px;" style="border-radius: 50%" alt="Avatar Adrian"/><br />
        <sub><b>Adrian</b></sub>
      </a><br />
    </td>
    <td align="center">
      <a href="https://github.com/LauraLG2000">
        <img src="https://github.com/LauraLG2000.png" width="100px;" style="border-radius: 50%" alt="Avatar Laura"/><br />
        <sub><b>Laura</b></sub>
      </a><br />
    </td>
  </tr>
</table>

🏆 **Créditos**

Este proyecto fue ideado y desarrollado como parte de la entrega para el Trabajo Final de **3ª Evaluación (1º DAW)**

