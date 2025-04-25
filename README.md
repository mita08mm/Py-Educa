# Plataforma de Enseñanza de Python

Plataforma en línea inclusiva para la enseñanza de Python, basada en Recursos Educativos Abiertos (OER) y acompañada de un agente de apoyo basado en IA.

## Descripción

Este proyecto busca desarrollar una plataforma en línea inclusiva para la enseñanza de Python, basada en Recursos Educativos Abiertos (OER) y acompañada de un agente de apoyo basado en IA que guíe a los estudiantes en su aprendizaje. La plataforma permitirá la movilidad estudiantil entre unidades educativas sin perder el progreso.

## Tecnologías

- Backend: Python Flask
- Frontend: React
- Base de datos: PostgreSQL
- Contenedores: Docker

## Estructura del Proyecto

```
/my-app
│
├── backend/
│   ├── app.py              # API Flask
│   ├── requirements.txt    # Dependencias de Python
│   ├── Dockerfile          # Configuración Docker para el backend
│   └── .env.example        # Variables de entorno
│
├── frontend/
│   ├── src/                # Código React
│   ├── Dockerfile          # Configuración Docker para el frontend
│   ├── .env.example        # Variables de entorno
│   └── ...                 # Otros archivos de React
│
├── docker-compose.yml      # Orquestación de contenedores
├── .dockerignore           # Archivos que Docker ignorará
├── .gitignore              
└── README.md               # Este archivo
```

## Requisitos Previos

- Docker
- Docker Compose
- Node.js (para desarrollo frontend)
- Python 3.8+ (para desarrollo backend)

## Instalación

1. Clonar el repositorio
2. Copiar los archivos .env.example a .env y configurar las variables
3. Ejecutar `docker-compose up -d`

## Desarrollo

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Licencia

Este proyecto está bajo la licencia MIT. 