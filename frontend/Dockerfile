FROM node:16.13.2

WORKDIR /frontend
COPY . .
RUN yarn cache clean
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]