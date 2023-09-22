import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const user = await getUserByClerkId()
  if (!user) {
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 })
  }
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: '',
    },
  })

  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}
