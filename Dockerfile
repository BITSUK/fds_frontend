FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV development

COPY . . 

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm" , "start"]


#docker run command
#docker run -p 3000:3000 -it fdsfrontend