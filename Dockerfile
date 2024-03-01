FROM node:14 as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
ENTRYPOINT npm start

