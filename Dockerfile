## Arquivo para docker não é necessário se não for utilizar-lo

# Dependencias:
FROM node:16


# Copia o package.json
COPY package*.json ./

# Copia o resto do diretório

## de copiar boootsrap Lembrar 
COPY . .

# Instala dependencias
RUN npm install


# RUN npm ci --only=production


EXPOSE 7777
CMD [ "npm", "start" ]