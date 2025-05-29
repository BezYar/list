FROM node:18-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
