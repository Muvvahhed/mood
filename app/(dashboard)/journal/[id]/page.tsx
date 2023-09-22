import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { use } from 'react'

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  if (!user) {
    throw new Error('User not found')
  }
  const entry = await prisma.journalEntry.findUniqueOrThrow({
    where: {
      userId_id: {
        id: id,
        userId: user.id,
      },
    },
    include: {
      analysis: true,
    },
  })
  return entry
}

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)

  return <Editor entry={entry} />
}

export default EntryPage
