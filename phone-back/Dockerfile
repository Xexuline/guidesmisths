FROM node:fermium

WORKDIR /usr/src/app/phone-back

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]

