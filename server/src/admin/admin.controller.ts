import { Controller, Get, Param, Patch, Post, Body, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { AuthenticatedUser } from '../auth/auth.types'
import { CurrentUser } from '../auth/current-user.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { AdminListQueryDto } from './dto/admin-list-query.dto'
import { ModeratePropertyDto } from './dto/moderate-property.dto'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'
import { AdminService } from './admin.service'

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  overview() {
    return this.adminService.overview()
  }

  @Get('users')
  listUsers(@Query() query: AdminListQueryDto) {
    return this.adminService.listUsers(query)
  }

  @Patch('users/:id/role')
  updateUserRole(
    @CurrentUser() actor: AuthenticatedUser,
    @Param('id') userId: string,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.adminService.updateUserRole(actor, userId, dto)
  }

  @Get('properties')
  listProperties(@Query() query: AdminListQueryDto) {
    return this.adminService.listProperties(query)
  }

  @Post('properties/:id/publish')
  publishProperty(@CurrentUser() actor: AuthenticatedUser, @Param('id') propertyId: string) {
    return this.adminService.publishProperty(actor, propertyId)
  }

  @Post('properties/:id/reject')
  rejectProperty(
    @CurrentUser() actor: AuthenticatedUser,
    @Param('id') propertyId: string,
    @Body() dto: ModeratePropertyDto,
  ) {
    return this.adminService.rejectProperty(actor, propertyId, dto)
  }

  @Get('bookings')
  listBookings(@Query() query: AdminListQueryDto) {
    return this.adminService.listBookings(query)
  }

  @Get('leads')
  listLeads(@Query() query: AdminListQueryDto) {
    return this.adminService.listLeads(query)
  }

  @Get('audit-logs')
  listAuditLogs(@Query() query: AdminListQueryDto) {
    return this.adminService.listAuditLogs(query)
  }
}
