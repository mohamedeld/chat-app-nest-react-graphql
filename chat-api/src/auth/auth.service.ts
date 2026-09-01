import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  login(user: User, response: Response) {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 604800);
    const tokenPayload = {
      _id: user?._id?.toHexString(),
      email: user?.email,
    };
    const token = this.jwtService.sign(tokenPayload);
    response.cookie('authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
