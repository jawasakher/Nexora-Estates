import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'
import { PrismaModule } from './prisma/prisma.module'
import { PropertiesModule } from './properties/properties.module'
import { MediaModule } from './media/media.module'
import { BookingsModule } from './bookings/bookings.module'
import { AdminModule } from './admin/admin.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    PropertiesModule,
    MediaModule,
    BookingsModule,
    AdminModule,
  ],
})
export class AppModule {}
