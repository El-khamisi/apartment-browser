FROM node:18

WORKDIR /app

COPY . . 

RUN npm ci

RUN npm run build

EXPOSE 5050
ENV PORT=5050

CMD [ "npm", "start"]
