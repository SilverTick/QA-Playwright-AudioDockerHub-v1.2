FROM node:14-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /home/audiohub

COPY . /home/audiohub

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/audiohub

# will execute npm install in /home/app because of WORKDIR
RUN npm install --force

# no need for /home/app/server.js because of WORKDIR
CMD ["node", "server.js"]