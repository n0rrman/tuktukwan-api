FROM node:18-alpine AS base

WORKDIR /app
COPY package.json .
RUN npm install --prod

COPY . .
CMD ["yarn", "start"]

