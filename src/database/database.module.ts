import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'mysql',
                    host: configService.get('DATABASE_HOST'),
                    port: +configService.get<number>('DATABASE_PORT'),
                    username: configService.get('DATABASE_USER'),
                    password: configService.get('DATABASE_PASS'),
                    database: configService.get('DATABASE_NAME'),
                    entities: ['dist/**/*.entity.js'],
                    synchronize: true,
                    options: { trustServerCertificate: true },
                    logging: true
                };

            }


            ,
        }),
    ],
})
export class DatabaseModule {}
