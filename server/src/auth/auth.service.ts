import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClerkClient, verifyToken } from '@clerk/backend'
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticatedUser } from './auth.types'

@Injectable()
export class AuthService {
  private readonly secretKey: string
  private readonly clerkClient

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const secretKey = this.config.get<string>('CLERK_SECRET_KEY')

    if (!secretKey) {
      throw new Error('CLERK_SECRET_KEY is required')
    }

    this.secretKey = secretKey
    this.clerkClient = createClerkClient({ secretKey })
  }

  async authenticateToken(token: string): Promise<AuthenticatedUser> {
    let claims

    try {
      claims = await verifyToken(token, { secretKey: this.secretKey })
    } catch {
      throw new UnauthorizedException('Invalid or expired Clerk token')
    }

    if (!claims.sub) {
      throw new UnauthorizedException('Token does not contain a user id')
    }

    const clerkUser = await this.clerkClient.users.getUser(claims.sub)
    const email = clerkUser.primaryEmailAddress?.emailAddress?.toLowerCase()

    if (!email) {
      throw new UnauthorizedException('Authenticated user has no primary email')
    }

    const user = await this.prisma.user.upsert({
      where: { clerkUserId: clerkUser.id },
      create: {
        clerkUserId: clerkUser.id,
        email,
        name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || null,
        avatarUrl: clerkUser.imageUrl || null,
      },
      update: {
        email,
        name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || null,
        avatarUrl: clerkUser.imageUrl || null,
      },
      select: {
        id: true,
        clerkUserId: true,
        email: true,
        role: true,
      },
    })

    return user
  }
}
