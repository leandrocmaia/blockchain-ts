FROM node:12-alpine AS build-env
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

CMD ["node", "./build/main.js"]
