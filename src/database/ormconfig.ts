import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSourceOptions, DataSource } from 'typeorm';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
const envPath = path.resolve(__dirname, `../../${envFile}`);

let d = dotenv.config({
  path: envPath,
});

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_NAME,
} = d.parsed;

export const dataSourceOptionsRemote: DataSourceOptions = {
  type: 'mysql',
  host: DATABASE_HOST,
  port: +DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASS,
  database: DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  //   options: { trustServerCertificate: true },
  logging: true,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptionsRemote);

export default dataSource;
