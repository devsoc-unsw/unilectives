# Grab the latest Node base image
FROM node:20.2.0-alpine as builder

# Set the current working directory inside the container
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM caddy:2.6.2-alpine
COPY ./.caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /srv 
