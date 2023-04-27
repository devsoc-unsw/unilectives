FROM node:16.18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY prisma ./prisma
RUN npm install

CMD npx prisma migrate deploy