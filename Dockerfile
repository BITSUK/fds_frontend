FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install react-scripts

COPY . .
EXPOSE 3000
CMD ["npm" ,"start"]
