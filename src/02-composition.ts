import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  admin: z.boolean().optional().default(false),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
export type UserList = z.infer<typeof userListSchema>

// GraphQL-like pick & match

export const userName = userSchema.pick({
  name: true,
})
export type UserName = z.infer<typeof userName>
