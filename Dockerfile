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

# Copy your Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built application files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
