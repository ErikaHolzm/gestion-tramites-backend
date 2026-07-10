import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RemindersModule } from './reminders/reminders.module';
import { Connection } from 'mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGODB_URI;
        return {
          uri,
          // usamos (connection: Connection) para que nos devuelva la conexion y podamos escuchar los eventos de conexion y error, porque sino seria de tipo any
          connectionFactory: (connection: Connection) => {
            connection.on('connected', () => {
              console.log('Mongo conectado');
            });
            connection.on('error', (error) => {
              console.log('Mongo error', error);
            });
            return connection;
          },
        };
      },
    }),
    UsersModule,
    AuthModule,
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
