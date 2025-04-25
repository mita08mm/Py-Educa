# Py-Educa - Plataforma de Enseñanza Python

Plataforma educativa para aprender Python, construida con React (Frontend) y Flask (Backend).

## 🚀 Características

- Frontend moderno con React y TypeScript
- Backend robusto con Flask
- Base de datos PostgreSQL
- Dockerizado para fácil despliegue

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
Py-Educa/
├── backend/           # Aplicación Flask
│   ├── app.py        # Punto de entrada de la aplicación
│   ├── models.py     # Modelos de la base de datos
│   └── requirements.txt
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
