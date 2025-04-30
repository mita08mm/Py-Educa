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
│
├── app/               # Código principal del backend (rutas, modelos, controladores)
├── migrations/        # Archivos de migración de la base de datos
├── .env.example       # Ejemplo de variables de entorno
├── config.py          # Configuración de Flask y SQLAlchemy
├── requirements.txt   # Dependencias del proyecto
└── run.py             # Punto de entrada para iniciar el servidor


