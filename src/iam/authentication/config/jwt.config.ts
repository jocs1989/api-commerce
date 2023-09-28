import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
  ttl: parseInt(process.env.JWT_TOKEN_TTL ?? '300', 10), // 5min
  refresh: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10),
}));
