FROM node:20 as build
WORKDIR /app

# Frontend build
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm ci && npm run build

# Backend + dist
WORKDIR /app
COPY backend ./backend
COPY frontend/dist ./frontend/dist

WORKDIR /app/backend
RUN npm ci

EXPOSE 3000
CMD ["node", "server.js"]