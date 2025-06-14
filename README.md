# PenCom

PenCom es una plataforma en línea para la compra de componentes y equipos informáticos. Su objetivo es ofrecer a los usuarios una experiencia intuitiva para explorar, comparar y adquirir productos como procesadores, tarjetas gráficas, placas base, portátiles y ordenadores de escritorio. A través de una interfaz amigable y moderna, buscamos facilitar la compra de hardware y ofrecer un valor diferencial al proporcionar herramientas de compatibilidad y asesoramiento inteligente a los usuarios.

## Instalación y Configuración

Esta aplicación se despliega fácilmente utilizando Docker para el backend y un servidor de desarrollo para el frontend. A continuación, se detallan los pasos para la instalación:

### Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop): Para la gestión de contenedores. Incluye:
  - Docker Engine (versión 20.0 o superior recomendada)
  - Docker Compose (versión 2.0 o superior recomendada)
- [Node.js](https://nodejs.org/en/download) (>= 18.3.0 || >= 20.9.0): Necesario para el frontend. Se recomienda utilizar [NVM (Node Version Manager)](https://github.com/coreybutler/nvm-windows#readme) para gestionar las versiones de Node.js y npm.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/xiexi3/PenCom.git
cd PenCom
```

### 2. Configuración del Backend (Docker)

1. Configurar el entorno:

   - Navega al directorio `back`:

     ```bash
     cd back
     ```

   - Copia el archivo `.env.example` a `.env` (o renómbralo si estás en Windows).  
     No es necesario modificar las variables en `.env` ya que están configuradas para Docker.

2. Construir y levantar los contenedores:

   Desde la raíz del proyecto (donde se encuentra `docker-compose.yml`), ejecuta:

   ```bash
   docker-compose build 
   docker-compose up -d
   ```

   Esto construye las imágenes y ejecuta los contenedores en segundo plano.

3. Ejecutar comandos dentro del contenedor `laravel_backend`:

   Accede a la línea de comandos del contenedor:

   ```bash
   docker exec -it laravel_backend bash
   ```

   Una vez dentro, ejecuta los siguientes comandos:

   ```bash
   composer update
   php artisan migrate
   php artisan db:seed
   php artisan storage:link
   ```

   Estos comandos actualizan las dependencias, ejecutan las migraciones, insertan datos de prueba y crean el enlace simbólico para el almacenamiento.

### 3. Configuración del Frontend (Angular)

- Instalar dependencias:

  Navega al directorio `front`:

  ```bash
  cd front
  ```

  Podemos comprobar que la versión de node cumpla con los requisitos anteriores:

  ```
  node --version
  ```

  Luego ejecuta:

  ```bash
  npm install
  npm install -g @angular/cli
  ```

- Verificar la versión de Angular:

  Asegúrate de que estás utilizando Angular 19.

  ```bash
  ng version
  ```

- Desplegar el frontend:

  ```bash
  ng serve
  ```

  Esto inicia el servidor de desarrollo de Angular.

> ⚠️ Si tienes problemas al instalar dependencias con NPM desde la consola de Visual Studio Code, abre PowerShell como administrador y ejecuta:

```powershell
Set-ExecutionPolicy Unrestricted
```

### 4. Acceder a la Aplicación

Una vez configurado tanto el frontend como el backend, podrás acceder a la aplicación en tu navegador desde:

[http://localhost:4200/](http://localhost:4200/)

Si el despliegue de los contenedores Docker se realiza correctamente, podrás ver los productos y utilizar todos los servicios de la aplicación.