FROM node:18-alpine

WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    gcc \
    libc-dev

COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]