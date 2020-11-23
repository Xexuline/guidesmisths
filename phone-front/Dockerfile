FROM node:fermium

WORKDIR /usr/src/app/phone-front

COPY package.json .
RUN npm install

COPY . .

CMD [ "npm", "run", "rebuildAndLaunch"]

