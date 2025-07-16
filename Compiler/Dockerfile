FROM node:22-alpine
WORKDIR /server
RUN apk update && apk add --no-cache g++
COPY . .
RUN npm install
EXPOSE 6060
CMD ["node", "index.js"]