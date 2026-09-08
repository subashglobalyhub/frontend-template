# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.18.0

FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /website/frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /website/frontend
COPY --from=deps /website/frontend/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /website/frontend
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /website/frontend/public ./public
COPY --from=builder /website/frontend/.next ./.next
COPY --from=builder /website/frontend/node_modules ./node_modules
COPY --from=builder /website/frontend/package.json ./package.json
COPY --from=builder /website/frontend/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["yarn", "start"]
