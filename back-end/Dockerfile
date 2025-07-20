FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 6001
CMD ["node", "./bin/www"]
