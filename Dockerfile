FROM node:18-alpine AS base

WORKDIR /app
COPY package.json .
RUN npm install --prod

ENV PORT 80
EXPOSE 80

COPY . .
RUN yarn migrate 
CMD ["yarn", "start"]

