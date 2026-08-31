import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envSchema } from './common/configration/enviroment.validation';
import configMapping from './common/configration/config-mapping';
import { MongooseModule } from '@nestjs/mongoose';
import { IEnvironment } from './common/configration/enviroment.interface';
import { UsersModule } from './users/users.module';
import { DbMigrationService } from './common/configration/db-migration.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<IEnvironment>) => ({
        uri: configService.getOrThrow<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbMigrationService],
})
export class AppModule {}
