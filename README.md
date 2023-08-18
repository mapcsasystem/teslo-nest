<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Desarrollo dev

# Ejecutar en desarrollo

1. Tener instalado NodeJS, npm, yarn, docker, docker compose, docker-desktop

2. Tener Nest CLI instalado windows cmd como administrador

```
npm i -g @nestjs/cli
```

3. Tener Nest CLI instalado linux, mac

```
sudo npm i -g @nestjs/cli
```

4. Clonar el repositorio

5. Crear un archivo en la raíz **.env** en base a **.env.example**

6. Levantar la base de datos

```
docker compose up -d
```

8. Levantar app en la raíz del proyecto

```
npm run start:dev
```

- ó

```
yarn start:dev
```

## Stack usado

- Postgres
- NestJS
- Docker
- Docker compose
- Docker Desktop
