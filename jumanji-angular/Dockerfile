# Etapa de compilación
# Seleccionamos el node que utilizamos en nuestro computador y en el cual fue creado el proyecto.
# Docker crea un linux con la versión de node que utilizamos en nuestro proyecto.
# Después de cada FROM se crea un linux nuevo.
FROM node:24.16.0 AS dev-deps

# Creaamos una carpeta app que es donde se alojará el proyecto
WORKDIR /app

# Copiamos solamente package.json y package-lock.json.
# Docker utiliza esto para aprovechar la caché.
# Si estos archivos no cambian entre builds, reutiliza la instalación
# anterior de node_modules y no vuelve a ejecutar npm install.
COPY package*.json ./
# Instalamos en el contenedor las dependencias necesarias para correr nuestro proyecto.
RUN npm install

# Etapa 2
# Se inicia una nueva etapa completamente independiente.
# Docker crea otro sistema Linux con Node.
# Esta etapa no comparte archivos automáticamente con la anterior.
FROM node:24.16.0 AS builder

# Creamos directorio /app
WORKDIR /app

# Copiamos node_modules desde la etapa dev-deps.
# Como las dependencias ya fueron instaladas anteriormente,
# evitamos volver a ejecutar npm install.
# Si package.json cambia, Docker reconstruirá la etapa anterior
# y esta copia traerá las nuevas dependencias.
COPY --from=dev-deps /app/node_modules ./node_modules

# Copiamos todo el proyecto 
COPY . . 

# Compila automáticamente la aplicación Angular.
# Como resultado se genera la carpeta dist con los archivos listos para producción.
RUN npm run build

# Etapa de producción
# Nueva etapa.
# Ahora utilizamos Nginx como servidor web para servir la aplicación.
# Ya no necesitamos Node porque Angular ya fue compilado.
FROM nginx:1.23.3 AS prod

EXPOSE 80

# Copiamos únicamente el resultado de la compilación
# (la carpeta browser dentro de dist)
# hacia la carpeta pública de Nginx.
# Esa carpeta es donde Nginx busca los archivos que debe entregar
# cuando un usuario entra al sitio web.
COPY --from=builder /app/dist/jumanji-angular/browser/ /usr/share/nginx/html

# Angular SSR generó index.csr.html.
# Nginx, por defecto, busca un archivo llamado index.html.
# Eliminamos el index.html que trae Nginx
# y renombramos index.csr.html para que Nginx cargue
# nuestra aplicación correctamente.
RUN rm /usr/share/nginx/html/index.html


RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html


CMD [ "nginx", "-g", "daemon off;" ]

