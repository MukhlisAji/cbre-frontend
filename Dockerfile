# Stage 1: Build the Vite project
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:latest

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]