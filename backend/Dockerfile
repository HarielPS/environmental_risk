FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3001

# Para dev hot-reload (requiere que tengas "start:dev")
CMD ["npm", "run", "start:dev"]
