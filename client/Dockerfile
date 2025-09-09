# # Stage 1: Build Vue app
# FROM node:20.16.0-alpine3.20 AS build
# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# # Pass build-time environment variables
# ARG VITE_BASE_URL
# ENV VITE_BASE_URL=$VITE_BASE_URL

# RUN npm run build

# # No Nginx in this image; dist will be extracted
# Stage 1: Build Vue app
FROM node:20.16.0-alpine3.20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the production files
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built Vue files from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
