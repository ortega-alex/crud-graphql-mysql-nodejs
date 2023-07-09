# inicializa el package.json

```sh
npm init -y
```

# instalacion de dependencias

```sh
npm i express express-graphql graphql mysql typeorm cors bcryptjs
```

# instalacion de dependencias de desarrollo

```sh
npm i -D typescript ts-node-dev @types/bcryptjs @types/cors @types/express @types/node dotenv
```

# inicializacion de archivo de configuracion de typescritp

```sh
npx tsc --init
```

# generar compilado

```sh
npx tsc
```

# comando previamente configurado en el package.json

```sh
npm run dev
```

```sh
npm run build
```

# Levantar una imagen de mysql 8 con Docker

```sh
docker run --name mysql-8 -e MYSQL_ROOT_PASSWORD={PASSWORD} -p 3306:3306 -v {PAHT_DIR} -d mysql:8.0
```

# si existe error que no se pouede conectar por usuario y contrasenia a la db

```sh
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '{PASSWORD}';
```

# ENTRAR AL BASH DEL DOCKER

```sh
docker exec -it mysql-8 bash
```

# CONEXION A LA DB

```sh
mysql -u root -p
```
