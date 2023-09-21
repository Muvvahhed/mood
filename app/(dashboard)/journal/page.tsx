import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'
import { analyze } from '@/utils/ai'
import Question from '@/components/Question'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  return (
    <div className="p-10 h-full overflow-y-scroll">
      <div className="py-4 mb-2">
        <h2 className="text-3xl">Journal</h2>
      </div>
      <div>
        <Question />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
