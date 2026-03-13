# --- Estágio de build ---
FROM node:22-alpine AS build
WORKDIR /app

# Copiar manifests e instalar dependências
COPY package*.json ./
RUN npm ci

# Copiar o código-fonte e construir
COPY . .
RUN npm run build

# --- Estágio de servir ---
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remover configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos gerados pelo build
COPY --from=build /app/dist .

EXPOSE 80
