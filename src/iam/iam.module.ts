import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './authentication/auth.service';
import jwtConfig from './authentication/config/jwt.config';
import { JwtStrategy } from './authentication/strategy/jwt.strategy';
import { LocalStrategy } from './authentication/strategy/local.strategy';
import { User } from './authentication/entities/user.entity';
import { BcryptService } from './authentication/hashing/bcrypt.service';
import { HashingService } from './authentication/hashing/hashing.service';
import { IamController } from './iam.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/guard/jwt/jwt-auth.guard';
import { RolesGuard } from './authorization/guard/roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory: (jwt: ConfigType<typeof jwtConfig>) => ({
        secret: jwt.secret,
        signOptions: {
          expiresIn: jwt.ttl,
          audience: jwt.audience,
          issuer: jwt.issuer,
        },
      }),
    }),
    PassportModule,
  ],
  controllers: [IamController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class IamModule {}
