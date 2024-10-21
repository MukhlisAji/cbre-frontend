# Stage 1: Build the Vite project
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:latest

# Switch to root to modify the configuration and permissions
USER root

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Set the necessary permissions (as root)
RUN chown -R 101:101 /etc/nginx/conf.d/default.conf
RUN chown -R 101:101 /etc/nginx/nginx.conf

RUN mkdir -p /var/cache/nginx/client_temp
RUN chown -R 101:101 /var/cache/nginx/client_temp
RUN mkdir -p /var/cache/nginx/proxy_temp
RUN chown -R 101:101 /var/cache/nginx/proxy_temp
RUN mkdir -p /var/cache/nginx/fastcgi_temp
RUN chown -R 101:101 /var/cache/nginx/fastcgi_temp
RUN mkdir -p /var/cache/nginx/uwsgi_temp
RUN chown -R 101:101 /var/cache/nginx/uwsgi_temp
RUN mkdir -p /var/cache/nginx/scgi_temp
RUN chown -R 101:101 /var/cache/nginx/scgi_temp
RUN mkdir -p /var/cache/nginx/ngx_http_proxy_module
RUN chown -R 101:101 /var/cache/nginx/ngx_http_proxy_module


# Switch back to the unprivileged user for running NGINX
USER 101

COPY --from=builder app/dist /usr/share/nginx/html
EXPOSE 8080


CMD ["nginx", "-g", "daemon off;"]