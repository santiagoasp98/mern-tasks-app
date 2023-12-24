# Task Manager App

Esta aplicación de gestión de tareas fue desarrollada para practicar con en el stack MERN (MongoDB, Express, React, Node.js). La aplicación permite a los usuarios registrar, editar, eliminar y visualizar tareas pendientes. Además, incluye funcionalidades de registro de usuarios y manejo de sesiones mediante cookies y tokens. Queda pendiente poder marcar como acompletada una tarea y editar el perfil de un usuario.

## Tecnologías Utilizadas

### Backend

- **Node.js:** Entorno de ejecución para JavaScript en el lado del servidor.
- **Express:** Marco de aplicación web para Node.js para la creación de la API REST.
- **MongoDB:** Base de datos NoSQL utilizada para almacenar y recuperar datos de tareas y usuarios.
- **Zod:** Biblioteca para validación de esquemas en TypeScript.
- **Bcryptjs:** Biblioteca para el cifrado de contraseñas.
- **Jsonwebtoken:** Implementación de JSON Web Tokens (JWT) para la autenticación.

### Frontend

- **React + Vite:** Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **Ant Design:** Biblioteca de componentes de interfaz de usuario para React.
- **React Router Dom:** Enrutador para manejar la navegación dentro de la aplicación React.
- **Axios:** Cliente HTTP para realizar solicitudes al backend.

## Comandos

### Antes de comenzar:

1. **Crea un archivo .env basado en el .env.example. Agrega valores reales.**
   ```bash
   cp .env.example .env
   ```
   
### Backend

1. **Instalar dependencias:**
   ```bash
   cd backend
   npm install
   ```

2. **Levantar el servidor en modo de desarrollo:**
   ```bash
   npm run dev
   ```

### Frontend

1. **Instalar dependencias:**
   ```bash
   cd client
   npm install
   ```

2. **Levantar la aplicación en modo de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Acceder a la aplicación:**
   Dirígete a http://localhost:5173 en tu navegador.
