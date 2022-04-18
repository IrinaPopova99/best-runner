FROM node:16.13.2

WORKDIR /backend
COPY . .
RUN yarn cache clean
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]