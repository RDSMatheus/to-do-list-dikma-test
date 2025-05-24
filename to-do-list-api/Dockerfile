FROM node:20.16.0-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN mkdir -p /app && chown node:node /app

EXPOSE 3000

USER node

CMD ["npm", "run", "start:dev"]

