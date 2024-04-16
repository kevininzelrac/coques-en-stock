# Coques en Stock

## 🚀 Setup Database

### dev database with docker compose

```yml
version: "3.9"

services:
  postgres:
    container_name: postgres
    image: postgres:16.2
    ports:
      - 5432:5432
    volumes:
      - postgres:/var/lib/postgresql/data
    env_file:
      - .env
    #environment:
    #  - POSTGRES_PASSWORD=password
    #  - POSTGRES_USER=user
    #  - POSTGRES_DB=database

volumes:
  postgres:
```

### Prisma ORM

```sh
npm i prisma tsx -D
npx prisma init
npx prisma migrate dev --name 'init'
```
