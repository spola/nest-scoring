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

Se utilizó como definición de la API el estándar OpenAPI 3.0 implementado por <https://swagger.io/specification/> a través de la librería "@nestjs/swagger".

En cada endpoint se indican los parámetros, cuerpo que consume y/o posibles respuestas HTTP.

## Cálculo de scoring

El puntaje de scoring intenta mostrar cuál es la probabilidad de compra de cliente, para este modelo se utiliza normalmente muchas variables del clientes y otros parámetros que van ajustando los resultados para acercarse a lo que las ventas históricas entregan como información.

Para el cálculo de este scoring se utilizaron indicadores de **interés de compra**, de **capacidad de pago del pie**, **capacidad de pago mensual**, **nivel de endeudamiento** y **ahorros reales**. Cada uno de estos indicadores tiene un rango de factores asociado con el que se le asignará un puntaje. El puntaje total del cliente es la suma de todos estos puntajes individuales.

### Indicadores

- **Indicador de interés de compra**: La relación entre la cantidad de mensajes en los últimos 30 días y el total de mensajes registrados.
- **Capacidad de pago del pie**: La relación entre los ahorros y el costo del pie.
- **Capacidad de pago mensual**: La relación entre el estimado de la hipoteca mensual y el sueldo del cliente.
- **Nivel de endeudamiento**: La cantidad de meses que el cliente tendría que destinar el total de su salario a amortizar su deuda para saldarla.
- **Ahorros reales**: La relación entre lo que tiene ahorrado menos la deuda y el pago del pie. Se considera que el cliente podría usar los ahorros que tiene en el pago de las deudas por sobre la adquisición de un bien inmueble.

### Tabla de factores

La tabla de factores va a depender del perfil de comprador del cliente. Podría ser un inversionista, familia, persona soltera, etc. Para el caso de este ejercicio se considera que todos los clientes son de un mismo perfil, por tanto se utiliza la misma tabla de factores. Sin embargo, se construyó el cálculo considerando que podrían agregarse más perfiles a futuro.

#### **Indicador de interés de compra**

Se considera que el 30% del puntaje del cliente corresponde a su interés de compra.

El indicador de interés de compra es un número decimal que va entre 0 y 1 `[0,1]` indicando el porcentaje de mensajes en los últimos 30 días.

Posibles valores:

- Sobre el 80% de los mensajes en los últimos 30 días. Indicador entre `[0.8, 1]` se le asigna el puntaje completo.
- En cualquier otro caso se asigna el puntaje ponderado por el porcentaje de mensajes en los últimos 30 días.

#### **Indicador de capacidad de pago del pie**

Se considera que el 10% del puntaje del cliente corresponde a su capacidad de pago.

La capacidad de pago es un número decimal que indica la relación entre los ahorros y el costo del pie. Mientras más grande el indicador, es más alto el puntaje.

Posibles valores:

- Indicador mayor que 1, tiene ahorrado más que el pie. En este caso asignamos el total del puntaje.
- Si el indicador es 0, asignamos puntaje 0.
- En cualquier otro caso se asigna el valor de `indicador * puntaje`.

#### **Indicador de capacidad de pago mensual**

Se considera que el 20% del puntaje del cliente corresponde a su capacidad mensual.

La capacidad de pago mensual se considera como la relación entre la cuota del hipotecario mensual y los ingresos de la persona. Mientras más pequeño el indicador, mayor el puntaje.

Posibles valores:

- Indicador mayor o igual a 80%, significa que tendría que utilizar el 80% del sueldo para pagar la hipoteca. En este caso se le asigna 0 puntos.
- Indicador menor o igual a 30%. En este caso se asigna el puntaje completo.
- Indicador entre 30% y 80% `indicador * puntaje`

#### **Indicador de nivel de endeudamiento**

Se considera que el 20% del puntaje del cliente corresponde a su nivel de endeudamiento.

El nivel de endeudamiento es un número decimal que indica la relación entre el total de la deuda y el salario de la persona. Indica la cantidad de meses que debería dedicar la persona para saldar su deuda si usase todo su sueldo en esto. A mayor valor del indicador, menor el puntaje.

Posibles valores:

- Indicador mayor o igual a 2, tiene que destinar 2 o más meses para saldar sus deudas. En este caso se le asigna 0 puntos.
- Indicador menor o igual a 1, tiene que destinar menos de un mes de su salario para saldar sus deudas. En este caso se le asigna el puntaje completo del indicador.
- Indicador entre 1 y 2, se calcula el puntaje `(1 - indicador) * puntaje`

#### **Indicador de nivel de ahorros reales**

Se considera que el 30% del puntaje del cliente corresponde a sus ahorros reales.

Es equivalente a la capacidad de pago de pie. La principal diferencia radica en que al monto ahorrado se le resta el monto adeudado.

Posibles valores:

- Indicador mayor o igual que 80%, tiene ahorrado gran parte del pie. En este caso asignamos el total del puntaje.
- Si el indicador es 0, asignamos puntaje 0.
- En cualquier otro caso se asigna el valor de `indicador * puntaje`.

### Consideraciones

Consideraciones para realizar el cálculo del scoring:

- Se utilizó como valor fijo de UF 38000. El cálculo de conversión de moneda quedó encapsulado en un método para ser reemplazado por un parámetro dinámico.

- Se considera que los ahorros y los salarios de los clientes están en pesos.

### Mejoras al cálculo del scoring

Considerar que las deudas de una persona tienen tasa de interés y que el monto va creciendo en el tiempo.

Estudiar el comportamiento de los compradores en función del monto ahorrado. Podría ser que prefieran comprar inmuebles más caros, esto debería bajar el puntaje de clientes con ahorros demasiado grandes comparados con el monto del pie.

Dependiendo del perfil del cliente se pueden utilizar tablas de factores o tablas de puntajes distintos. Por ejemplo, un inversionista podría tomar la decisión de compra con menos mensajes que una persona que compra un inmueble para vivir.

El modelo utilizado es una combinación lineal entre los indicadores y las tablas de factores, un modelo avanzado contempla variables interdependientes.

# Acceso al sistema publicado

Ruta de acceso al servicio conectado a base de datos que emula ambiente productivo.

<https://lidz-scoring-ai7l5wdfta-tl.a.run.app>

# Para desarrollar en ambiente local

## Instalación

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

El sistema fue implementado utilizando MySql 8, junto con el package de node mysql2

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

## Decisiones arquitectónicas

Se separó la aplicación en 3 módulos de negocio de acuerdo al dominio que atendían.

Módulos:

- clients: Módulo de cliente, contiene toda la lógica para atender los endpoints CRUD de un cliente.
- client-to-do-follow-up: Módulo de los clientes a los que se les debe hacer seguimiento. Comparte las entidades del módulo de clientes.
- scoring: Módulo de cálculo de scoring. No posee endpoints, exporta un servicio para que el módulo de cliente exponga el endpoint de cálculo de score.

La decisión de esta división pasa principalmente por como se agrupa la lógica del negocio y estableciendo los puntos donde podrá tener mayor crecimiento. Es más probable que se modifique y actualice el motor de cálculo a que se creen endpoints para clientes.

Se podría haber creado el servicio de scoring en el mismo módulo de cliente. Por experiencia, un componente tan exhaustivo en cálculo tiende a tener muchos subcomponentes, lo que hace más complejo el mantener una arquitectura limpia.

Otro factor *mucho más relevante* para un emprendimiento como esto, es que el cálculo del puntaje es crucial y la fórmula de este cálculo además es activo importantísimo que debe mantenerse a resguardo. Teniendo el módulo de score por separado podría permitir separar la API en dos y de este modo otorgar acceso restringido a la fórmula.

### Decisiones técnicas

#### Copiado de datos entre DTO y Entities

Se decidió no utilizar herramientas automáticas de copiado de entidades a dto y viceversa. Dado que estamos en un ambiente javascript, al ejecutar en la aplicación el chequeo de clases y tipos de typescript se elimina y muchas veces esto produce que se copien propiedades que no queremos.

Por ejemplo, en la clase [transform.ts](https://github.com/spola/lidz-scoring/blob/main/src/clients/dto/transform.ts) están transformaciones explícitas entre los dto y las entidades del módulo de clientes.

#### Utilización de vistas

Se decidió utilizar vistas para el cálculo de indicadores y la obtención de los clientes que necesitan contacto. Estos son cálculos masivos que podrían ser intensos, para esto, podemos precalcular algunos valores y dejarlos en vistas materializadas para acelerar el cálculo.

De todos modos, para mostrar el uso de querybuilder para queries complejas en el orm, también se generó un endpoint que la utiliza (findAllQueryBuilder).

#### No utilizar enum

Como la api está en una etapa temprana se decidió no limitar por completo algunos ingresos de información con el fin de tener mayor flexibilidad para adaptarse a las necesidades de los clientes.

Por ejemplo, los mensajes podrían tener el role como enum.
