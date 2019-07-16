## justshowit-gateway


```yaml
version: "3.6"

services:

  dataservice:
    build: justshowit-data-service-example
    image: jsi/dataservice
    ports:
      - 9001:9001

  muh:
    build: justshowit-data-service-example
    image: jsi/dataservice

  gateway:
    build: justshowit-gateway
    image: jsi/gateway
    ports:
      - 9000:9000
    depends_on:
      - dataservice
```
