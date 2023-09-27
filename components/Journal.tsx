'use client'
import { deleteEntry, getAllEntries } from '@/utils/api'
import { JournalEntry, Analysis } from '@prisma/client'
import { useEffect, useState } from 'react'
import EntryCard from './EntryCard'
import Spinner from './ui/spinner'
import NewEntryCard from './NewEntryCard'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

const Journal = () => {
  const [entries, setEntries] = useState<
    (JournalEntry & { analysis: Analysis | null })[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    const data = getAllEntries()
    data.then((res) => {
      setEntries(res)
      setIsLoading(false)
    })
  }, [])

  const handleDelete = (id: string) => {
    deleteEntry(id)
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <>
          <NewEntryCard />
          {entries.map((entry) => (
            <Link href={`/journal/${entry.id}`} key={entry.id}>
              <EntryCard
                key={entry.id}
                entry={entry}
                onDelete={() => handleDelete(entry.id)}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  )
}

export default Journal
