FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

EXPOSE 5000

CMD ["npm", "run", "deploy"]
