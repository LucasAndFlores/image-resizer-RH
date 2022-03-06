FROM  node

WORKDIR /usr/app

COPY package.json  ./

RUN npm install

COPY . .

ENV PORT=5050

EXPOSE 5050

CMD ["npm", "run", "dev"]