# 📦 Guía de Instalación del Proyecto

Este proyecto utiliza **Docker** para crear un entorno de desarrollo completo que incluye:

- 🔵 **Frontend** – Interfaz de usuario desarrollado con React
- 🟢 **Backend** – API desarrollado con Flask
- 🟡 **Sandbox** – Entorno de ejecución aislado con Judge0
- 🟣 **Base de datos** – Motor de base de datos PostgreSQL

---

## ✅ Requisitos previos

Asegúrate de tener instalado en tu máquina:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/) (ya viene incluido en Docker Desktop)

### Instalación de Docker

- [Guía para Linux](https://docs.docker.com/desktop/setup/install/linux/)
- [Guía para macOS](https://docs.docker.com/desktop/setup/install/mac-install/)
- [Guía para Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
---

## 📥 1. Clonar el repositorio

```bash
git clone https://github.com/mita08mm/Py-Educa.git
cd Py-Educa
```

---

## ⚙️ 2. Crear archivos de entorno

El proyecto utiliza archivos `.env`, copia los archivos de ejemplo:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

---

## 🐳 3. Construir y levantar los contenedores

Ejecuta el siguiente comando para iniciar todos los servicios:

```bash
docker compose up -d
```

Esto construirá y levantará:

- `frontend`
- `backend`
- `code-sandbox`
- `db`

---

## 🔍 4. Verificar servicios

Revisa que todos los servicios estén corriendo:

```bash
docker compose ps
```

Puedes acceder a las aplicaciones en los siguientes puertos:

- 🌐 **Frontend**: [http://localhost:5173](http://localhost:5173)
- 🔗 **Backend**: [http://localhost:5000/api/](http://localhost:5000/api/)
- 🛠️ **Sandbox**
- 🗄️ **Base de datos**

---

## 🛠️ Comandos útiles

| Acción                        | Comando                                  |
|------------------------------|------------------------------------------|
| Ver logs                     | `docker compose logs -f`                 |
| Apagar todos los servicios   | `docker compose down`                   |
| Reconstruir y levantar       | `docker compose up -d --build`          |
| Ver contenedores activos     | `docker ps`                              |
| Ingresar a un contenedor     | `docker exec -it nombre_contenedor sh`  |

---

## ❓ Soporte

Si tienes problemas para ejecutar el proyecto, asegúrate de:

- Tener Docker y Docker Compose correctamente instalados
- Verificar que los puertos no estén en uso
- Revisar los logs con `docker compose logs`

---
