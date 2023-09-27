'use client'
import { Analysis, JournalEntry } from '@prisma/client'
import { TrashIcon } from '@radix-ui/react-icons'

const EntryCard = ({
  entry,
  onDelete,
}: {
  entry: { analysis: Analysis | null } & JournalEntry
  onDelete: () => void
}) => {
  const date = new Date(entry.createdAt).toDateString()
  // const [deleteEntry, setDeleteEntry] = useState(false)
  return (
    <div className="relative">
      <div className="divide-y divide-gray-200 dark:divide-white/30 overflow-hidden rounded-lg bg-white dark:text-white dark:bg-[#27272a] shadow border border-zinc-200 dark:border-[#27272a]">
        <div className="px-4 py-5 sm:px-6 relative text-primary-green">
          <button
            role="button"
            className="absolute right-4 top-4"
            data-id={entry.id}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete()
            }}
          >
            <TrashIcon className="w-6 h-6 cursor-pointer stroke-red-500" />
          </button>
          {date}
        </div>
        <div className="px-4 py-5 sm:p-6 flex gap-x-4">
          <span className="capitalize ">subject:</span>
          <span className="w-[75%] flex-wrap text-black/60  dark:text-white/70">
            {entry.analysis?.subject}
          </span>
        </div>
        <div className="px-4 py-5 sm:p-6 flex gap-x-4">
          <span className="capitalize ">percentage:</span>
          {entry.analysis?.moodScore && (
            <span className="w-[75%] flex-wrap text-black/60  dark:text-white/70">{`${entry.analysis?.moodScore}%`}</span>
          )}
        </div>
      </div>
    </div>
  )
}
export default EntryCard
