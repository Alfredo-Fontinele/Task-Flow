FROM node:18-alpine

WORKDIR /usr/home/app

COPY . .

RUN npm install 

COPY . .

RUN npm run build
