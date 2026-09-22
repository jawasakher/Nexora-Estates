export type AppRole = 'USER' | 'OWNER' | 'AGENT' | 'ADMIN'

export interface AuthenticatedUser {
  id: string
  clerkUserId: string
  email: string
  role: AppRole
}
