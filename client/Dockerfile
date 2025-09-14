
FROM node:20.16.0-alpine3.20 AS build

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Accept backend URL from build arguments
ARG VITE_BASE_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_RAZORPAY_KEY=${VITE_RAZORPAY_KEY}

# Build the production files
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
