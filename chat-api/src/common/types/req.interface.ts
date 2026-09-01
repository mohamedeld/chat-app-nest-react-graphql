import { User } from 'src/users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}

export interface TokenPayload {
  _id: string;
  email: string;
}
