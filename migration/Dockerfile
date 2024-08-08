FROM node:20.16-alpine

# Set the current working directory inside the container
WORKDIR /app

COPY . .
RUN npm install

CMD ["npm", "run", "dev"]
