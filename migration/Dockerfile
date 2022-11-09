FROM node:16.15-alpine

# Set the current working directory inside the container
WORKDIR /app

COPY . .
RUN npm install

CMD ["npm", "run", "start:dev"]
