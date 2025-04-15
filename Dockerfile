FROM node:18-slim

WORKDIR /app

# Instalar herramientas básicas
RUN apt-get update && apt-get install -y git

# Copiar los archivos del proyecto
COPY . .

# Simular el proceso de build de Cloudflare
CMD npm clean-install --progress=false && npm run build