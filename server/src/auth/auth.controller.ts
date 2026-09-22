import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { CurrentUser } from './current-user.decorator'
import { AuthenticatedUser } from './auth.types'

@Controller()
export class AuthController {
  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() user: AuthenticatedUser) {
    return { data: user }
  }
}
