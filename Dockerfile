FROM node:18-alpine AS base

WORKDIR /app
COPY package.json .
RUN npm install --prod

ENV PORT 2567
EXPOSE 2567

COPY . .
CMD ["yarn", "start"]

