FROM node:alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
EXPOSE 4000
COPY . .
CMD ["npm", "run", "dev"]
