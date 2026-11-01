# Steg 1: Byggmiljö
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Steg 2: Körningsmiljö
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

ENV PORT=5000
EXPOSE 5000

CMD ["node", "dist/app.js"]