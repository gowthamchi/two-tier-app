FROM node:latest

WORKDIR /nodeapp

copy package*.json ./

Run npm install

copy . .

expose 8000

cmd ["npm","start"]
