FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    gcc \
    libc-dev

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]