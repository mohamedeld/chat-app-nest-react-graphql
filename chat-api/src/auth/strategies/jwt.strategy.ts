import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IEnvironment } from 'src/common/configration/enviroment.interface';
import { TokenPayload } from 'src/common/types/req.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  validate(payload: TokenPayload) {
    return payload;
  }
  constructor(private readonly configService: ConfigService<IEnvironment>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies.authentication,
      ]),
      secretOrKey: configService.getOrThrow('jwtSecret'),
    });
  }
}
