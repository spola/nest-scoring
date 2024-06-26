<p align="center">
  <a href="https://lidz.cl/" target="blank"><img src="https://lidz.cl/assets/logo-long.webp" width="200" alt="Logo" /></a>
</p>

# Lidz definición de Api de prueba

En esta prueba técnica deberás crear un sencillo backend o API que permita almacenar datos y hacer algunos análisis sobre la información que tenemos.

Debe ser un servicio que tenga una base de datos relacional, en este caso será una base de datos MySQL.

Modelos contemplados:

- Client: El cliente
- Message: Mensajes de interacción con el cliente
- Debt: Deudas del cliente con alguna institución

Rutas a ser evaluadas:

- GET /clients
- GET /clients/:id
- GET /clients-to-do-follow-up
- POST /client
- GET clients/:id/score

# Acceso público

Ruta de acceso al servicio conectado a base de datos que emular ambiente productivo.

<https://lidz-scoring-ai7l5wdfta-tl.a.run.app>

# Ambiente de desarrollo

## Installación

### Instalar paquetes necesarios de node

```bash
npm install
```

### Crear archivo .env con las configuraciones de acceso a la base de datos

``` bash
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASS=root
DATABASE_NAME=lidz_scoring
DATABASE_LOGGING=false # Default false
```

### Opcional. Ejecutar migrations para creación de base de datos

La configuración de la conexión a la base de datos se realiza consumiendo las variables de entorno configuradas en el archivo ".env". En caso de requerir ejecutar una migración contra una base de datos en otro ambiente bastaría con configurar la variable NODE_ENV al ejecutar el comando y tener configurado el archivo ".env.{NODE_ENV}" correspondiente.

```Bash
npm run migration:run
```

## Ejecutar la app

Por defecto se utiliza el puerto 5000 para acceder a la aplicación <http://localhost:5000/>

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Nota: Antes de ejecutar en modo producción se recomienda construir aplicación con npm run build.

## Test

```bash
# unit tests
$ npm run test
```

### Detalle de la aplicación

## Configuración de la base de datos

El sistema fue implementado utilizando MySql 8, junto con el packaje de node mysql2

Crea archivo .env con las configuraciones

``` bash
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASS=root
DATABASE_NAME=lidz_scoring
DATABASE_LOGGING=false # Default false
```

## Docker

Build

``` Console
docker build -t lidz-scoring .
```

Run docker

La configuración de la base de datos se debe entregar como variables de entorno

``` Console
docker run -p80:5000 -e DATABASE_NAME=lidz_scoring -e DATABASE_PASS=root -e DATABASE_USER=root -e DATABASE_HOST=localhost
```

## Despliegue en Google Run

Para configurar el despliegue se puede seguir <https://www.tomray.dev/deploy-nestjs-cloud-run>.

Una vez configurado el ambiente, el despliegue manual se realiza con el comando de gcloud.

``` Console
gcloud run deploy --source .
```

## Links importantes

Algunos links que resultaron importantes durante la implementación del sistema

Configuración de las migraciones <https://stackoverflow.com/questions/76663792/how-to-configure-typeorm-and-migrations-in-nestjs>

Mock de promesas para pruebas <https://webtips.dev/webtips/jest/mock-promises-in-jest>

Validación de los dto para las pruebas <https://dev.to/avantar/validating-nested-objects-with-class-validator-in-nestjs-1gn8>

Validación de los nested objects
<https://stackoverflow.com/questions/72009995/typeerror-reflect-getmetadata-is-not-a-function>

Creación de Views con typeorm
<https://daily-dev-tips.com/posts/typeorm-viewentity/>

Deploy gcloud
<https://www.tomray.dev/deploy-nestjs-cloud-run>
<https://www.tomray.dev/deploy-nestjs-cloud-run#manually-deploying-to-cloud-run>

Corregir que typeorm ignora el .env en los migrations
<https://github.com/typeorm/typeorm/issues/3894>

Publicado : <https://lidz-scoring-ai7l5wdfta-tl.a.run.app/>

## Migrations

Recordar el tener la propiedad syncronize en false para que se genere la migración en un archivo y no se ejecute inmediatamente.

Ejecutar migraciones

```Bash
npm run migration:run
```

Crear migración

``` Bash
npm run migration:generate -- .\src\database\migrations\AddClientToScoreView
```
