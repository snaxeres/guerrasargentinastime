# Guerras-Argentinas — MVP

Proyecto demo para visualizar, en una línea del tiempo interactiva, los conflictos, guerras civiles y rebeliones en los que participó Argentina desde 1816 hasta la actualidad.

Este proyecto está construido con Next.js, Tailwind CSS y Shadcn/UI, y utiliza Firebase Firestore como base de datos.

## Cómo usar

1.  **Clonar este repositorio.**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd Guerras-Argentinas
    ```

2.  **Instalar dependencias.**
    ```bash
    npm install
    ```

3.  **Configurar Firebase.**
    - Crear un proyecto en [Firebase](https://firebase.google.com/).
    - En la configuración del proyecto, crea una nueva aplicación web.
    - Copia las credenciales de Firebase.
    - Renombra el archivo `.env.example` a `.env.local`.
    - Pega tus credenciales en `.env.local`.

4.  **Poblar la base de datos (Opcional, pero recomendado).**
    Este paso subirá los datos de ejemplo a tu base de datos de Firestore.

    - **Configura las reglas de Firestore:** Para que el script funcione, tus reglas de seguridad en Firestore deben permitir la escritura. Puedes usar temporalmente las siguientes reglas para el seeding:
      ```
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /{document=**} {
            allow read, write: if true;
          }
        }
      }
      ```
    - **Ejecuta el script de seeding:**
      ```bash
      npm run seed
      ```
    - **¡Importante!** Después de poblar la base de datos, revierte tus reglas a una configuración más segura para producción.

5.  **Iniciar la aplicación.**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:9002`.

## Modo Administrador

Para ver los controles de administrador (como el botón para poblar la base de datos desde la UI), agrega la siguiente línea a tu archivo `.env.local`:

```
NEXT_PUBLIC_ADMIN_MODE=true
```

## Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Compila la aplicación para producción.
-   `npm run start`: Inicia el servidor de producción.
-   `npm run seed`: Ejecuta el script para poblar la base de datos de Firestore con datos de `src/data/wars.sample.json`.
-   `npm run lint`: Ejecuta el linter de Next.js.

## Despliegue Automático (CI/CD)

Para hacer deploy automático a Firebase Hosting:

1.  Asegúrate de tener `firebase-tools` instalado y haber iniciado sesión (`firebase login`).
2.  Configura Firebase Hosting para tu proyecto (`firebase init hosting`).
3.  En tu repositorio de GitHub, ve a `Settings` > `Secrets and variables` > `Actions`.
4.  Crea un nuevo secreto llamado `FIREBASE_SERVICE_ACCOUNT` con el contenido de tu clave de cuenta de servicio de Firebase (en formato JSON).
5.  Crea un archivo `.github/workflows/deploy.yml` con la configuración para ejecutar tests y hacer deploy en cada push a la rama `main`.
