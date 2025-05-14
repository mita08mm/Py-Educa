# Py-Educa - Plataforma de Enseñanza Python

Plataforma educativa para aprender Python, construida con React (Frontend) y Flask (Backend).

## 🚀 Características

- Frontend moderno con React y TypeScript
- Backend robusto con Flask
- Base de datos PostgreSQL
- Dockerizado para fácil despliegue
- CI/CD con GitHub Actions

## 🛠️ Tecnologías

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS (opcional)

### Backend
- Flask
- PostgreSQL
- SQLAlchemy
- Flask-CORS

### DevOps
- Docker
- Docker Compose
- GitHub Actions

## 📋 Requisitos Previos

- Docker
- Docker Compose
- Git

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/mita08mm/Py-Educa.git
cd Py-Educa
```

2. Configura las variables de entorno:
```bash
# Backend
cp backend/.env.example backend/.env
# Frontend
cp frontend/.env.example frontend/.env
```

3. Inicia los contenedores:
```bash
docker-compose up -d
```

4. Accede a la aplicación:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py            # Crea la app y registra blueprints/extensiones
│   ├── config.py              # Configuración según entorno (dev, prod)
│   ├── extensions.py          # Inicialización de extensiones (SQLAlchemy, etc.)
│   ├── controllers/           # Lógica de negocio desacoplada de la capa de ruta
│   ├── middlewares/           # Procedimientos que se realizan antes de un controller
│   ├── models/                # Modelos separados por entidad
│   ├── schemas/               # Esquemas para validación/serialización (opcional, con Marshmallow o Pydantic)
│   ├── routes/                # Blueprints (rutas organizadas por recurso)
│   ├── services/              # Lógica del negocio que tiene interacción con la bd
│   └── utils/                 # Funciones comunes: JWT, helpers, etc.
├── .env
├── .env.example
├── run.py                    # Punto de entrada, usa app factory
├── Dockerfile
├── requirements.txt
└── README.md
├── frontend/         # Aplicación React
│   ├── src/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── docker-compose.yml
```

## 🔧 Desarrollo

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔄 Flujo de Trabajo con GitHub Actions

El proyecto utiliza GitHub Actions para la integración continua (CI) con un flujo simplificado.

### Configuración del Workflow

El workflow de CI está configurado en `.github/workflows/docker-image.yml` y se ejecuta automáticamente en las siguientes situaciones:

- **Push a la rama develop**:
  - Se activa cuando se hace push directo a la rama develop

- **Pull Request hacia develop**:
  - Se activa cuando se crea un pull request desde ramas sprint-* hacia develop

### Estructura de Ramas

Este proyecto sigue un modelo de flujo de trabajo simplificado:

1. **main**: Contiene el código de producción estable.

2. **develop**: Contiene el código más reciente para la próxima versión.
   - Recibe cambios desde las ramas sprint completadas.

3. **sprint-X**: Ramas para características específicas de cada sprint.
   - Se crean a partir de `develop`.
   - Cuando se completa un sprint, se fusiona de vuelta a `develop` mediante pull request o push directo.

### Flujo de Trabajo para Desarrollo

1. Para iniciar un nuevo sprint:
   - Se crea una rama `sprint-X` desde `develop`
   
2. Para implementar nuevas funcionalidades:
   - Se desarrollan directamente en la rama `sprint-X` actual

3. Al finalizar el sprint:
   - Se crea un pull request desde `sprint-X` hacia `develop`
   - O se realiza push directo desde `sprint-X` hacia `develop`

4. Para lanzar a producción:
   - Se realiza push desde `develop` hacia `main`

### Pasos del Workflow

Cuando se ejecuta el workflow, realiza las siguientes acciones:

1. Configura un entorno con PostgreSQL.
2. Verifica la versión de Docker.
3. Instala Docker Compose.
4. Construye y ejecuta la aplicación usando Docker Compose.
5. Verifica que el backend responda correctamente.
6. Verifica que el frontend esté disponible.
7. Detiene los contenedores después de las pruebas.
