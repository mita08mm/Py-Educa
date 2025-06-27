# 🐍 Code Sandbox - Documentación Técnica

## 📋 Descripción
Entorno seguro para ejecutar código Python en tiempo real. Integrado con la plataforma Py-Educa.

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
- **CPU**: 5 segundos máximo
- **Memoria**: 50MB máximo  
- **Archivo**: 1MB máximo
- **Capacidades Docker**: `cap_drop: ALL`, `no-new-privileges:true`

## 📡 Endpoints

### **Directo al Sandbox:**
```
POST http://localhost:5001/execute
```

### **A través del Backend:**
```
POST http://localhost:5000/api/code/execute
```

## 📊 Formatos de Request/Response

### **Request:**
```json
{
  "code": "print('Hello World')"
}
```

### **Response (Éxito):**
```json
{
  "status": {"id": 3, "description": "Accepted"},
  "stdout": "Hello World\n",
  "stderr": "",
  "memory": "0",
  "time": "0"
}
```

### **Response (Error):**
```json
{
  "status": {"id": 4, "description": "Error"},
  "stdout": "",
  "stderr": "NameError: name 'x' is not defined",
  "memory": "0",
  "time": "0"
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
    
    def execute_code(self, code: str) -> Dict[str, Any]:
        # Hace request HTTP al sandbox
        response = requests.post(f"{self.sandbox_url}/execute", json={"code": code})
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
  -d '{"code": "print(\"test\")"}'

# Test a través del backend
curl -X POST http://localhost:5000/api/code/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "print(\"test\")"}'
```

## 🔧 Personalización

### **Agregar Librerías:**
1. Editar `requirements.txt`:
```
flask==2.0.1
werkzeug==2.0.1
gunicorn==20.1.0
numpy==1.21.0  # Nueva librería
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
    # CPU time limit (cambiar 5 por el valor deseado)
    resource.setrlimit(resource.RLIMIT_CPU, (5, 5))
    # Memory limit (cambiar 50 por el valor en MB)
    resource.setrlimit(resource.RLIMIT_AS, (50 * 1024 * 1024, 50 * 1024 * 1024))
```

## 🐛 Troubleshooting

### **Problemas Comunes:**

**"Failed to resolve 'code-sandbox'"**
- Verificar que el contenedor se llame `code-sandbox`
- Verificar red Docker: `docker network ls`

**"Connection refused"**
- Verificar que el sandbox esté corriendo: `docker ps | grep sandbox`
- Verificar puerto 5001: `netstat -an | grep 5001`

**"Timeout"**
- El código tarda más de 5 segundos
- Optimizar código o aumentar límite en `set_limits()`

**"vite: not found"**
- Reconstruir frontend: `docker-compose build frontend`

### **Logs de Debug:**
```bash
# Ver logs del sandbox
docker-compose logs -f code-sandbox

# Ver logs del backend
docker-compose logs -f backend

# Ver logs de todos los servicios
docker-compose logs -f
```

## 🛡️ Seguridad

### **Medidas Implementadas:**
- Usuario no-root (`codeuser`)
- Límites estrictos de recursos
- Capacidades Docker limitadas
- Archivos temporales que se eliminan
- Entorno aislado en contenedor
- Validación de entrada JSON

### **Configuración Docker:**
```yaml
cap_drop:
  - ALL
cap_add:
  - NET_BIND_SERVICE
security_opt:
  - no-new-privileges:true
```

## 📈 Monitoreo

### **Estado de Servicios:**
```bash
docker-compose ps
```

### **Uso de Recursos:**
```bash
docker stats
```

### **Verificar Conectividad:**
```bash
# Desde host
curl http://localhost:5001

# Desde contenedor backend
docker exec py-educa-backend-1 curl http://code-sandbox:5001
```
