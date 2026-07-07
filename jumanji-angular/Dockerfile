# Etapa de compilación
FROM node:24.16.0 AS dev-deps

WORKDIR /app

COPY package*.json ./
RUN npm install

# Etapa 2
FROM node:24.16.0 AS builder

WORKDIR /app

COPY --from=dev-deps /app/node_modules ./node_modules
COPY . . 

RUN npm run build

# Etapa de producción
FROM nginx:1.23.3 AS prod
EXPOSE 80

COPY --from=builder /app/dist/jumanji-angular/browser/ /usr/share/nginx/html

RUN rm /usr/share/nginx/html/index.html

RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html

CMD [ "nginx", "-g", "daemon off;" ]
