import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '1d',
  },
};
