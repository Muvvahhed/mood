import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await getUserByClerkId()
  if (!user) {
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 })
  }
  const { content } = await request.json()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })
  let updatedAnalysis = null
  // const analysis = await analyze(updatedEntry.content)
  // if (analysis && updatedEntry.content) {
  //   updatedAnalysis = await prisma.analysis.upsert({
  //     where: {
  //       entryId: updatedEntry.id,
  //     },
  //     create: {
  //       userId: user.id,
  //       entryId: updatedEntry.id,
  //       ...analysis,
  //     },
  //     update: {
  //       ...analysis,
  //     },
  //   })
  // }
  revalidatePath(`/journal/${updatedEntry.id}`)
  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await getUserByClerkId()
  if (!user) {
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 })
  }
  const deletedEntry = await prisma.journalEntry.delete({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
  })
  // revalidatePath(`/journal`)
  revalidateTag('allEntries')
  return NextResponse.json({
    data: { deletedEntry },
  })
}
