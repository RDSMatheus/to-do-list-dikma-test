FROM node:20.16.0-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

USER node

CMD ["npm", "run", "start:prod"]
