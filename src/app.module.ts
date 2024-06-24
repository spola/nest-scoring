import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsToDoFollowUpModule } from './clients-to-do-follow-up/clients-to-do-follow-up.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DatabaseModule, 
    ClientsModule, ClientsToDoFollowUpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
