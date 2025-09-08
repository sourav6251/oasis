# Stage 1: Build Vue app
FROM node:20.16.0-alpine3.20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass build-time environment variables
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

RUN npm run build

# No Nginx in this image; dist will be extracted
