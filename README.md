## justshowit-gateway

```
docker-compose exec gateway sh
```

```yaml
version: "3.6"

services:

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
      # - ./justshowit-gateway/frontend/dist:/app/frontend
    depends_on:
      - dataservice
```
