import { SignInDto } from '@application/user/Dtos/request/sign-in.dto';
import { Token } from '@application/user/Dtos/response/token.response.dto';
import { LoginUseCase } from '@application/user/usecase/login.usecase';
import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly loginUsecase: LoginUseCase) {}

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Loged in successfuly', type: Token })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to store refresh token' })
  // @UseGuards(LoginRateLimitGuard)
  @Post('/login')
  async login(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<Token> {
    return await this.loginUsecase.execute(signInDto);
  }
}
