# Grab the latest Node base image
FROM node:20.2-alpine as builder

# Set the current working directory inside the container
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY prisma ./prisma
RUN npm install
# RUN npx prisma generate

COPY . .
RUN npx prisma generate

RUN npm run build:container


# Grab the latest Node base image
FROM node:20.2-alpine as runner

# Set the current working directory inside the container
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/prisma ./prisma

EXPOSE 3030

CMD ["npm", "start"]
