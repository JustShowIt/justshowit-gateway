FROM alpine:3.9 as frontend

WORKDIR /app

RUN apk add --update nodejs nodejs-npm && \
    npm install -g @vue/cli

COPY frontend .

RUN npm install && \
    npm run build

RUN ls -lash dist



FROM alpine:3.9

WORKDIR /app

RUN apk add --update nodejs nodejs-npm && \
    npm install -g nodemon

COPY service .
COPY --from=frontend /app/dist /app/frontend

RUN npm install

EXPOSE 9000

CMD [ "nodemon", "/app/src/service.js"]