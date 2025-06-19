# 🐍 Code Sandbox - Documentación Técnica

## 📋 Descripción
Entorno seguro para ejecutar código Python en tiempo real con soporte completo para entrada interactiva. Integrado con la plataforma Py-Educa.

## 🏗️ Arquitectura
```
Frontend → Backend (/api/code/execute) → Code Sandbox (/execute) → Resultado
```

## 🔧 Configuración Técnica

### **Sandbox:**
- **Puerto**: 5001
- **Contenedor**: `code-sandbox`
- **Usuario**: `codeuser` (no-root)
- **Python**: 3.9-slim
- **Framework**: Flask

### **Límites de Seguridad:**
- **CPU**: 10 segundos máximo
- **Memoria**: 100MB máximo  
- **Archivo**: 2MB máximo
- **Capacidades Docker**: `cap_drop: ALL`, `no-new-privileges:true`

## 🆕 Nuevas Funcionalidades

### **✅ Soporte Completo para Input**
- Simulación de `input()` function
- Múltiples entradas en secuencia
- Manejo de errores de input
- Contador de inputs utilizados

### **✅ Librerías Científicas**
- `numpy`: Cálculos numéricos
- `matplotlib`: Creación de gráficos
- `pandas`: Análisis de datos
- `scipy`: Funciones científicas

### **✅ Acceso a Archivos**
- Directorio `data/` disponible
- Archivos de ejemplo incluidos
- Lectura de archivos CSV, TXT

## 📡 Endpoints

### **Directo al Sandbox:**
```
POST http://localhost:5001/execute
GET  http://localhost:5001/health
GET  http://localhost:5001/test
```

### **A través del Backend:**
```
POST http://localhost:5000/api/code/execute
```

## 📊 Formatos de Request/Response

### **Request (con Input):**
```json
{
  "code": "nombre = input('Ingresa tu nombre: ')\nprint(f'¡Hola {nombre}!')",
  "input": ["Juan"]
}
```

### **Response (Éxito):**
```json
{
  "status": {"id": 3, "description": "Accepted"},
  "stdout": "¡Hola Juan!\n",
  "stderr": "",
  "memory": "0",
  "time": "0",
  "input_used": 1
}
```

### **Response (Error):**
```json
{
  "status": {"id": 4, "description": "Error"},
  "stdout": "",
  "stderr": "NameError: name 'x' is not defined",
  "memory": "0",
  "time": "0",
  "input_used": 0
}
```

## 🔍 Códigos de Estado
| ID | Descripción | Significado |
|----|-------------|-------------|
| 3 | Accepted | Código ejecutado exitosamente |
| 4 | Error | Error en la ejecución del código |

## 📁 Archivos del Sandbox

### **execute_code.py**
- Lógica principal de ejecución
- Simulador de input interactivo
- Configuración de límites de recursos
- Manejo de errores y excepciones
- Captura de stdout/stderr

### **Dockerfile**
- Configuración del contenedor Docker
- Instalación de dependencias
- Configuración de usuario no-root
- Configuración de seguridad

### **requirements.txt**
- Flask==2.0.1
- Werkzeug==2.0.1
- Gunicorn==20.1.0
- numpy==1.21.0
- matplotlib==3.5.0
- pandas==1.3.0
- scipy==1.7.0

### **data/**
- `ejemplo_datos.txt`: Datos numéricos para ejercicios
- `nombres.txt`: Lista de nombres para ejercicios de strings

## 🔗 Integración con Backend

### **Archivos del Backend:**
- `backend/app/routes/codeExecution.py` - Blueprint de rutas
- `backend/app/services/code_execution_service.py` - Servicio de conexión
- `backend/app/routes/__init__.py` - Registro de blueprints

### **CodeExecutionService:**
```python
class CodeExecutionService:
    def __init__(self):
        self.sandbox_url = current_app.config.get('CODE_SANDBOX_URL', 'http://code-sandbox:5001')
    
    def execute_code(self, code: str, input_data: List[str] = None) -> Dict[str, Any]:
        # Hace request HTTP al sandbox con input
        payload = {"code": code}
        if input_data:
            payload["input"] = input_data
        response = requests.post(f"{self.sandbox_url}/execute", json=payload)
        return response.json()
```

### **Blueprint Registration:**
```python
# En backend/app/routes/__init__.py
app.register_blueprint(code_execution_bp, url_prefix='/api/code')
```

### **Variables de Entorno Backend:**
```yaml
# En docker-compose.yml
environment:
  - CODE_SANDBOX_URL=http://code-sandbox:5001
```

## 🚀 Comandos de Desarrollo

### **Iniciar Servicios:**
```bash
# Todo el sistema
docker-compose up -d

# Solo sandbox
docker-compose up -d code-sandbox

# Sin Pgadmin
docker-compose up -d backend frontend db code-sandbox
```

### **Gestión de Contenedores:**
```bash
# Reconstruir sandbox
docker-compose build code-sandbox

# Ver logs
docker-compose logs -f code-sandbox

# Reiniciar sandbox
docker-compose restart code-sandbox

# Estado de servicios
docker-compose ps
```

### **Testing:**
```bash
# Test directo al sandbox
curl -X POST http://localhost:5001/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "print(input(\"Test: \"))", "input": ["Hello"]}'

# Test a través del backend
curl -X POST http://localhost:5000/api/code/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "print(input(\"Test: \"))", "input": ["Hello"]}'

# Health check
curl http://localhost:5001/health
```

## 🔧 Personalización

### **Agregar Librerías:**
1. Editar `requirements.txt`:
```
flask==2.0.1
werkzeug==2.0.1
gunicorn==20.1.0
numpy==1.21.0
matplotlib==3.5.0
pandas==1.3.0
scipy==1.7.0
# Nueva librería aquí
```

2. Reconstruir:
```bash
docker-compose build code-sandbox
docker-compose restart code-sandbox
```

### **Cambiar Límites de Recursos:**
Editar `execute_code.py` función `set_limits()`:
```python
def set_limits():
    # CPU time limit (cambiar 10 por el valor deseado)
    resource.setrlimit(resource.RLIMIT_CPU, (10, 10))
    # Memory limit (cambiar 100 por el valor en MB)
    resource.setrlimit(resource.RLIMIT_AS, (100 * 1024 * 1024, 100 * 1024 * 1024))
```

### **Agregar Archivos de Datos:**
1. Colocar archivos en `data/`
2. Acceder desde el código con `__data_dir__/archivo.txt`

## 🎯 Ejemplos de Uso

### **Ejemplo Básico con Input:**
```python
nombre = input("Ingresa tu nombre: ")
edad = int(input("Ingresa tu edad: "))
print(f"¡Hola {nombre}! Tienes {edad} años")
```

**Input:** `["Juan", "25"]`

### **Ejemplo con Librerías:**
```python
import numpy as np
import matplotlib.pyplot as plt

datos = [1, 2, 3, 4, 5]
promedio = np.mean(datos)
print(f"Promedio: {promedio}")

plt.plot(datos)
plt.title("Gráfico de ejemplo")
plt.show()
```

### **Ejemplo con Archivos:**
```python
with open('__data_dir__/nombres.txt', 'r') as f:
    nombres = f.read().splitlines()

print("Nombres en el archivo:")
for nombre in nombres:
    print(f"- {nombre}")
```

## 🐛 Troubleshooting

### **Problemas Comunes:**

**"Failed to resolve 'code-sandbox'"**
- Verificar que el contenedor se llame `code-sandbox`
- Revisar `docker-compose.yml`

**"EOFError: No more input data available"**
- Proporcionar más entradas en el array `input`
- Verificar que el código no pida más inputs de los proporcionados

**"ModuleNotFoundError"**
- Verificar que la librería esté en `requirements.txt`
- Reconstruir el contenedor: `docker-compose build code-sandbox`

**"Resource limit exceeded"**
- Reducir la complejidad del código
- Aumentar límites en `set_limits()` si es necesario

## 📚 Documentación Adicional

- `ejercicios_ejemplo.md`: Ejercicios con librerías científicas
- `ejemplos_con_input.md`: Ejemplos detallados de uso con input
- `data/`: Archivos de ejemplo para ejercicios

¡Tu sandbox está completo y listo para cualquier tipo de ejercicio! 🎉
 