FROM node:18-alpine AS base 


# Build image
FROM base AS builder
WORKDIR /app
COPY . .
RUN yarn --frozen-lockfile && yarn run build


# Prod image
FROM base AS runner
WORKDIR /app

COPY package.json ./
ENV NODE_ENV production
RUN yarn --frozen-lockfile
COPY --from=builder /app/build ./
COPY package.json ./migrations ./
COPY ./migrations ./migrations

RUN adduser --system --uid 1001 server
RUN chown server /app

USER server
WORKDIR /app

ENV PORT 80
EXPOSE 80

CMD ["yarn", "start"]


