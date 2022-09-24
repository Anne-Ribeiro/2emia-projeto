FROM node:debian

RUN mkdir -p /home/reddito/node_modules && chown -R node:node/home/reddito/node_modules

WORKDIR /home/reddito

COPY package*.json ./

RUN npm install 

COPY --chown=node:node . .


EXPOSE 7777

CMD ["npm", "start"]