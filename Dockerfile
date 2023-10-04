FROM node:17
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]