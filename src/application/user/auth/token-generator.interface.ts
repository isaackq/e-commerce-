import { User } from '@domain/entities/User/User';
import { Token } from '../Dtos/response/token.response.dto';

export interface TokenGeneratorInterface {
  generateTokens(user: User): Promise<Token>;
  refreshToken(refreshToken: string): Promise<Pick<Token, 'accessToken'>>;
}
