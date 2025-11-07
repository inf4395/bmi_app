FROM node:20

WORKDIR /app

COPY package*.json ./

# Installe sqlite3 proprement pour Linux
RUN npm install sqlite3 --build-from-source
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
