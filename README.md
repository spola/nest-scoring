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
```

### Opcional. Ejecutar migrations para creación de base de datos.

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
```

## Docker

Build

``` Console
docker build -t lidz-scoring .
```

Run docker

La configuración de la base de datos se debe generar como variables de entorno


``` Console
docker run -p80:5000 -e DATABASE_NAME=c4u82703_lidz -e DATABASE_PASS=lidz_scoring -e DATABASE_USER=c4u82703_lidz -e DATABASE_HOST=srv7.cpanelhost.cl lidz-scoring
```




## Links importantes

<https://stackoverflow.com/questions/76663792/how-to-configure-typeorm-and-migrations-in-nestjs>

<https://webtips.dev/webtips/jest/mock-promises-in-jest>

<https://dev.to/avantar/validating-nested-objects-with-class-validator-in-nestjs-1gn8>

Validación de los nested objects
<https://stackoverflow.com/questions/72009995/typeerror-reflect-getmetadata-is-not-a-function>

Views
<https://daily-dev-tips.com/posts/typeorm-viewentity/>

Deploy gcloud
<https://www.tomray.dev/deploy-nestjs-cloud-run>

Publicado : <https://lidz-scoring-ai7l5wdfta-tl.a.run.app/>

## Pendiente

Preguntar a Luis:

- Incluir el score en el client/:id

¿Debería conver el agent del mssage en un enum?
export enum GenderType {
    Male = 'Male',
    Female = 'Female',
}

Home : <https://lidz.cl/>
Link a la api

Configuración de la base de datos para migration está por separado



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
