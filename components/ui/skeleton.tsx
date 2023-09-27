import { cn } from '@/lib/utils'

function Skeleton() {
  return (
    <div className="bg-white shadow dark:text-white dark:bg-[#27272a] dark:border-[#27272a] border border-zinc-200 rounded-lg flex flex-col h-44 lg:h-52 p-4 justify-around">
      <div className="w-full bg-black/10 dark:bg-black/25 animate-pulse h-[18%] rounded-lg"></div>
      <div className="flex justify-between h-[18%] px-2">
        <div className="w-[48%] animate-pulse rounded-lg bg-black/10 dark:bg-black/25"></div>
        <div className="w-[45%] animate-pulse rounded-lg bg-black/10  dark:bg-black/25"></div>
      </div>
      <div className="flex justify-between h-[18%] px-2">
        <div className="w-[35%] animate-pulse rounded-lg bg-black/10 dark:bg-black/25"></div>
        <div className="w-[55%] animate-pulse rounded-lg bg-black/10 dark:bg-black/25"></div>
      </div>
      {/* <div className="w-full bg-black/25 animate-pulse h-[18%] rounded-lg"></div> */}
      {/* <div className="w-full bg-black/25 animate-pulse h-[18%] rounded-lg"></div> */}
    </div>
  )
}

export { Skeleton }
