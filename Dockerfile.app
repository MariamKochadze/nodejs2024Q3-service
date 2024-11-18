FROM node:22-alpine

WORKDIR /home/node

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "start:dev" ]
