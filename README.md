## justshowit-gateway

```
docker-compose exec gateway sh
```

```yaml
version: "3.3"

services:

  db:
    image: postgres:10-alpine
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "postgres"
      POSTGRES_DB: "justshowit"

  dataservice:
    build: justshowit-data-service-example
    image: jsi/dataservice
    ports:
      - 9001:9001
    volumes:
      - ./justshowit-data-service-example/src:/app/src

  gateway:
    build: justshowit-gateway
    image: jsi/gateway
    ports:
      - 9000:9000
    volumes:
      - ./justshowit-gateway/service/src:/app/src
      - ./justshowit-gateway/service/src:/app/src
    depends_on:
      - dataservice
      - db
```
