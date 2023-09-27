import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PUT = async (
  request: Request,
  { params }: { params: { entryId: string } }
) => {
  const user = await getUserByClerkId()
  if (!user) {
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 })
  }
  const { content } = await request.json()
  if (!content) {
    return NextResponse.json({ error: 'No content' }, { status: 400 })
  }
  const analysis = await analyze(content)
  if (!analysis) {
    return NextResponse.json({ error: 'No analysis' }, { status: 404 })
  }

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: params.entryId,
    },
    create: {
      userId: user.id,
      entryId: params.entryId,
      ...analysis,
    },
    update: {
      ...analysis,
    },
  })

  return NextResponse.json({
    data: { ...updatedAnalysis },
  })
}
