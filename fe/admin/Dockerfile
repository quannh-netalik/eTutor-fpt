FROM node:12

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install core-js
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
