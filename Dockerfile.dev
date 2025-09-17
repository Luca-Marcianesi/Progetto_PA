# Base Node
FROM node:20-alpine

WORKDIR /usr/app

# Copia package.json e installa dipendenze
COPY package*.json ./
RUN npm install -D ts-node-dev
RUN npm install

# Copia tutto il codice
COPY . .

# Compila TypeScript
RUN npx tsc

# Copia wait-for script
COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh

# Comando di avvio
CMD ["sh", "-c", "npx wait-port db:5432 && node dist/index.js"]

