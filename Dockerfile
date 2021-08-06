FROM node:14.17.4-alpine AS development
ENV NODE_ENV development

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
CMD ["yarn", "start"]