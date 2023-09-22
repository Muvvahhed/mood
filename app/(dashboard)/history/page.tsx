import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import React from 'react'

const getData = async () => {
  const user = await getUserByClerkId()
  if (!user) return { analyses: [], avgSentimentScore: 0 }
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
  })
  const sum = analyses.reduce((a, b) => a + b.sentimentScore, 0)
  const avgSentimentScore = Math.round(sum / analyses.length)
  return { analyses, avgSentimentScore }
}

const HistoryPage = async () => {
  const { analyses, avgSentimentScore } = await getData()

  return (
    <div className="w-full h-full relative pt-2 overflow-hidden">
      <div className="absolute right-5">{`Avg. Sentiment Score: ${avgSentimentScore}`}</div>
      <div className="w-full h-full p-4">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default HistoryPage
