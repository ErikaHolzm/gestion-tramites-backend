import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';
import { StatusModule } from './status/status.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [StatusModule],
=======
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RemindersModule } from './reminders/reminders.module';

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
          connectionFactory: (connection) => {
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
>>>>>>> a4d85ab1cdaff4624083aebd4fc9ffd7f23078dc
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
