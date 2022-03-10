FROM  node

WORKDIR /usr/app

COPY package.json  ./

RUN npm install --include=dev

COPY . .

ENV PORT=5050

EXPOSE 5050

CMD ["npm", "run", "start"]