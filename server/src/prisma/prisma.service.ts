import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect()
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.warn(`[prisma] Database is unavailable during startup: ${message}`)
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
