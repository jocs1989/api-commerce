import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from './config/bd.config';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [dbConfig.KEY],
      useFactory: (configService: ConfigType<typeof dbConfig>) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,
        database: configService.db,
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    IamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
