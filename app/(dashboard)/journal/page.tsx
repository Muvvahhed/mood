import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'
import { analyze } from '@/utils/ai'
import Question from '@/components/Question'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Journal from '@/components/Journal'

const JournalPage = async () => {
  // const entries = await getEntries()
  return (
    <div className="p-5 lg:p-10 h-full overflow-y-scroll">
      <div className="py-4 mb-2 flex lg:block">
        <h2 className="text-3xl">Journal</h2>
      </div>
      <div className="w-full lg:w-[45%] mb-5">
        <Question />
      </div>
      <Journal />
    </div>
  )
}

export default JournalPage
