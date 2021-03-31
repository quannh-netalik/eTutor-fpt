FROM node:12-alpine

# RUN apt update && apt install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
# RUN apt update && apt install -y nodejs

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install core-js
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]
