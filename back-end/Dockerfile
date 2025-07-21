FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 6002
CMD ["node", "./bin/www"]
