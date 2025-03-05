FROM node:latest

WORKDIR /nodeapp

copy package*.json ./

Run npm install

copy . .

expose 3000

cmd ["npm","start"]
