'use client'

import { useState } from 'react'
import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import Loader from './ui/loader'
import { PlusCircleIcon } from 'lucide-react'

const NewEntryCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  async function handleOnClick() {
    setIsLoading(true)
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }
  return (
    <button
      className="overflow-hidden rounded-lg bg-white shadow dark:text-white dark:bg-[#27272a] dark:border-[#27272a] border border-zinc-200"
      onClick={handleOnClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <div className="px-4 py-5 sm:p-6 flex items-center gap-x-2 justify-center">
          <PlusCircleIcon className="w-10 h-10 stroke-primary-green" />
          <span className="text-3xl">New Entry</span>
        </div>
      )}
    </button>
  )
}

export default NewEntryCard
