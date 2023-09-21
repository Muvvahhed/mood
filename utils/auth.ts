import { auth, currentUser } from '@clerk/nextjs'
import { prisma } from './db'
import { User } from '@prisma/client'

export const getUserByClerkId = async () => {
  const user = await currentUser()
  return prisma.user.findUniqueOrThrow({
    where: {
      clerkId: user?.id,
    },
  })
}
