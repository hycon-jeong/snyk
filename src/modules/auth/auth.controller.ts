import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserMapping } from 'modules/entities';
import { User } from 'modules/entities/user.entity';
import { AuthService, LoginPayload, RegisterPayload } from './';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { UsersService } from './../user';
import { MoRegisterPayload } from './moRegister.payload';

@Controller('api/auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    if (payload.email) {
      const checkEmailUser = await this.userService.findOne({
        email: payload.email,
      });
      if (checkEmailUser && checkEmailUser.id) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            messageCode: 'auth.emailDuplicated',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const user = await this.userService.create(payload);
    return await this.authService.createToken(user);
  }

  @Post('register/mo')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async moRegister(@Body() payload: MoRegisterPayload): Promise<any> {
    const { userId, role, password, verificationCode, ...rest } = payload;
    let user = await this.userService.findOne({
      where: { userId: userId, status: 'ACTIVE' },
    });
    if (!user) {
      user = await this.userService.moCreate({
        userId,
        role,
        password,
        verificationCode,
      });
    }
    try {
      await this.userService.createUserMapping({
        user_id: user.id,
        mappingStatus: 'ACTIVE',
        ...rest,
      });
    } catch (err) {
      console.log(err);
    }

    return await this.authService.createToken(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
