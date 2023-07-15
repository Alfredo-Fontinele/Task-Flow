FROM node:18-alpine

WORKDIR /usr/home/app

COPY package*.json .

RUN npm install pnpm && pnpm install

COPY . .

RUN pnpm build
