FROM node:16-alpine
LABEL maintainer="https://github.com/benidevo"

WORKDIR /app

RUN apk add --no-cache bash
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

COPY --chown=node:node package**.json ./

RUN npm install

EXPOSE 8000

COPY --chown=node:node . .

COPY ./docker/dev/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

USER node

ENTRYPOINT /bin/wait-for-it.sh rabbitmq:5672 --timeout=30 -- npm run start:dev
