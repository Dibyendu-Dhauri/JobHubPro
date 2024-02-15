FROM node:20-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 8001

CMD node index.js

