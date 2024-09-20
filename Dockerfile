# Stage 1: Build the Vite project
FROM node:16-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.27.0-alpine

# Create a non-root user
RUN adduser -D -u 1000 appuser

# Copy your Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built application files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Change ownership of the nginx directories
RUN chown -R appuser:appuser /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R appuser:appuser /var/run/nginx.pid

# Expose port 80
EXPOSE 80

# Switch to non-root user
USER appuser

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]