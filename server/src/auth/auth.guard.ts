import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { AuthenticatedUser } from './auth.types'

type AuthenticatedRequest = Request & { user?: AuthenticatedUser }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    const authorization = request.headers.authorization || ''
    const [scheme, token] = authorization.split(' ')

    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      throw new UnauthorizedException('Bearer token is required')
    }

    request.user = await this.authService.authenticateToken(token)
    return true
  }
}
