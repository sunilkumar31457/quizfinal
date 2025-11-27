### Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies based on the lockfile if present
COPY package*.json ./
RUN npm ci --silent

# Copy all sources and build
COPY . .
RUN npm run build

### Production stage
FROM nginx:alpine

# Copy build artifacts from the builder
COPY --from=build /app/dist /usr/share/nginx/html

# Use custom nginx config that supports SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

