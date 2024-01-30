FROM node:18-slim

RUN apt-get update -y \
    && apt-get install -y openssl \
    && apt-get clean

WORKDIR /home/app/server

COPY . .

RUN npm install && npx prisma generate