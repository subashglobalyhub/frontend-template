# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.18.0

FROM node:${NODE_VERSION}

WORKDIR /website/frontend

RUN apt-get update && apt-get install -y nginx \
        wget \
        nano \
        dnsutils \
        net-tools \
        git \
        curl \
        cmake \
        unzip \
        build-essential \
        software-properties-common \
        zip \
        cron \
        gpg

ARG NEXT_PUBLIC_MOCK_DATA
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_MOCK_DATA=$NEXT_PUBLIC_MOCK_DATA
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

ENV NODE_ENV=production
EXPOSE 80

RUN rm -f /etc/nginx/sites-enabled/default
COPY devops/nginx/nginx.conf /etc/nginx/nginx.conf
COPY devops/nginx/frontend.conf /etc/nginx/conf.d/frontend.conf

CMD ["bash", "-c", "service nginx start && yarn start"]
