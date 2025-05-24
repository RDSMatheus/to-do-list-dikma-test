
FROM node:20.16.0-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN mkdir -p /app/.next && chown node:node /app/.next

EXPOSE 3001

USER node

CMD ["npm", "run", "dev"]