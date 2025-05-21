FROM node:22

WORKDIR /rosettanet

COPY package*.json ./

RUN npm install

COPY . .

# Port
EXPOSE 3000 

CMD ["npm", "run", "start"]