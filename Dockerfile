## Arquivo para docker não é necessário se não for utilizar-lo

# docker kill $(docker ps -q); docker build . -t habdig7oficial/reddito; docker run -p 7777:7777 -d habdig7oficial/reddito; docker ps --size

# docker compose up 

# Dependencias:
FROM node:16


# Copia o package.json
COPY package*.json ./

# Copia o resto do diretório
COPY . . 

# Instala dependencias
RUN npm install

# Transpila o Typescript
RUN npm run transpile

# copia o bootstrap
RUN cp ./node_modules/bootstrap/scss ./src/assets/SCSS/bootstrap -r

# RUN ls /src/assets/SCSS/bootstrap

# Trasnpila arquivos sass em css
RUN npm run sass

# Remove arquivos desnecessários para produção

RUN find . -name "*.ts" -delete
RUN find . -name "*.scss" -delete
RUN rmdir ./src/* --ignore-fail-on-non-empty


EXPOSE 7777
CMD [ "npm", "start" ]