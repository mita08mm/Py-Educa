## Requisitos

Asegúrate de tener instalado:

- Python **3.9** o superior
- PostgreSQL **15** o superior
- `pip` para instalar dependencias
- (Opcional) `virtualenv` para crear entornos virtuales

## Configuración del entorno

1. Clona el repositorio si aún no lo hiciste:

   ```bash
   git clone https://github.com/tu-usuario/py-educa.git
   cd py-educa/backend

2. Crea y activa un entorno virtual (opcional pero recomendado):

    python -m venv venv
    source venv/bin/activate  # En Windows: venv\Scripts\activate 

3. Instala las dependencias:

    pip install -r requirements.txt

4. Crea un archivo .env en la raíz del backend basado en .env.example:

    DATABASE_URL=postgresql://admin:secret@localhost:5432/app_db
    FLASK_ENV=development
    # Asegúrate de que tu base de datos PostgreSQL esté corriendo y tenga una base de datos llamada app_db.


## Ejecución del servidor

Una vez configurado todo, puedes iniciar el servidor de desarrollo con:
    
    flask run

Esto levantará la API en http://localhost:5000.

## Estructura del proyecto

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


