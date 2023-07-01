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