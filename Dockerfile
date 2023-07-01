<<<<<<< HEAD
FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV development

COPY . . 

#RUN yarn install 
RUN npm install --legacy-peer-deps
#RUN npm install react-scripts
#RUN npm run build

EXPOSE 3000

#CMD ["yarn" , "run", "start"]
#CMD ["npx" , "start", "build"]
CMD ["npm" , "start"]
#CMD npm start
=======
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install react-scripts

COPY . .
EXPOSE 3000
CMD ["npm" ,"start"]
>>>>>>> fb6a58063c9a1b1054a78a5a99f2f055f1ee9eb2
