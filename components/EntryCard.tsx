import { Analysis, JournalEntry } from '@prisma/client'

const EntryCard = ({
  entry,
}: {
  entry: { analysis: Analysis | null } & JournalEntry
}) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 dark:divide-white/30 overflow-hidden rounded-lg bg-white dark:text-white dark:bg-[#27272a] shadow border border-zinc-200 dark:border-[#27272a]">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6 flex gap-x-4">
        <span className="capitalize ">subject:</span>
        <span className="w-[70%] flex-wrap text-black/60  dark:text-white/70">
          {entry.analysis?.subject}
        </span>
      </div>
      <div className="px-4 py-5 sm:p-6 flex gap-x-4">
        <span className="capitalize ">percentage:</span>
        <span className="w-[70%] flex-wrap text-black/60  dark:text-white/70">{`${entry.analysis?.moodScore}%`}</span>
      </div>
    </div>
  )
}
export default EntryCard
