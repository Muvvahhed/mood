'use client'

import { updateEntry } from '@/utils/api'
import { Analysis, JournalEntry } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Spinner from './ui/spinner'

const Editor = ({
  entry,
}: {
  entry: { analysis: Analysis | null } & JournalEntry
}) => {
  const [value, setValue] = useState(entry.content)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [isLoading, setIsLoading] = useState(false)
  const analysisData = [
    { name: 'Summary', value: analysis?.summary },
    { name: 'Subject', value: analysis?.subject },
    { name: 'Mood', value: analysis?.mood },
    { name: 'Percentage', value: analysis?.moodScore },
  ]
  // useAutosave({
  //   data: value,
  //   onSave: async (_value) => {
  //     setIsLoading(true)
  //     const updated = await updateEntry(entry.id, _value)
  //     setAnalysis(updated.analysis)
  //     setIsLoading(false)
  //   },
  // })
  return (
    <div className="p-10 h-full bg-white/60 dark:bg-[#09090b] w-full md:grid md:grid-cols-3 md:gap-x-10 flex flex-col relative">
      {isLoading && (
        <p className="absolute left-[3%] top-[1%]">
          <Spinner text="Updating..." />
        </p>
      )}
      <div className="col-span-2">
        <div className="w-full h-full">
          <textarea
            className="w-full h-full p-8 text-xl outline-none rounded-md shadow border dark:bg-[#27272a] dark:border-[#27272a]"
            placeholder="Write about your day!"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <div className="h-[50%] md:h-full w-full bg-white dark:bg-white/20 rounded-md shadow overflow-y-scroll">
        <div
          className="bg-blue-400 px-6 py-6 text-white dark:bg-opacity-75"
          style={{
            backgroundColor: analysis?.color,
          }}
        >
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul className="pt-3">
            {analysisData.map((item) => {
              return (
                <li
                  className="flex items-center justify-between px-3 py-4 border-b border-zinc-200"
                  key={item.name}
                >
                  <span className="text-lg font-medium">{item.name}</span>
                  <span className="flex-wrap text-black/60 w-[70%] dark:text-white/70">
                    {item.value}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
