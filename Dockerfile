# Stage 1: Build the Vite project
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:latest

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chmod 666 /etc/nginx/conf.d/default.conf
RUN chmod 666 /etc/nginx/nginx.conf

RUN mkdir -p /var/cache/nginx/client_temp
RUN chmod 777 /var/cache/nginx/client_temp
RUN mkdir -p /var/cache/nginx/proxy_temp
RUN mkdir -p /var/cache/nginx/fastcgi_temp
RUN mkdir -p /var/cache/nginx/uwsgi_temp
RUN mkdir -p /var/cache/nginx/scgi_temp
RUN mkdir -p /var/cache/nginx/ngx_http_proxy_module

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]