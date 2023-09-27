'use client'

import { updateEntry, upsertAnalysis } from '@/utils/api'
import { Analysis, JournalEntry } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import fontColorContrast from 'font-color-contrast'

import Spinner from './ui/spinner'

const Editor = ({
  entry,
}: {
  entry: { analysis: Analysis | null } & JournalEntry
}) => {
  const [value, setValue] = useState(entry.content)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false)
  const analysisData = [
    { name: 'Summary', value: analysis?.summary },
    { name: 'Subject', value: analysis?.subject },
    { name: 'Mood', value: analysis?.mood },
    { name: 'Percentage', value: analysis?.moodScore },
  ]
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      await updateEntry(entry.id, _value)
      // setAnalysis(updated.analysis)
      setIsLoading(false)
    },
  })
  const handleAnalyze = async () => {
    setIsAnalysisLoading(true)
    const response = await upsertAnalysis(entry.id, value)
    setAnalysis(response)
    setIsAnalysisLoading(false)
  }

  const fontColor = fontColorContrast(analysis?.color || 'skyblue')
  return (
    <div className="h-full w-full">
      <div className="p-4 pt-16 lg:p-10 lg:pt-16 h-full bg-white/60 dark:bg-[#09090b] w-full lg:grid lg:grid-cols-3 lg:gap-x-10 flex flex-col relative gap-5 ">
        {isLoading && (
          <p className="absolute left-[3%] top-[2.5%] lg:top-[3%]">
            <Spinner text="updating" />
          </p>
        )}
        <button
          onClick={handleAnalyze}
          disabled={isAnalysisLoading || isLoading}
          className="px-4 py-2 rounded-lg border-primary-green border-2 text-primary-green hover:bg-primary-green hover:text-white mb-2 absolute left-[66%] lg:left-[57%] top-[1.5%] disabled:hover:bg-inherit"
        >
          {isAnalysisLoading ? (
            <div className="h-6 w-6 rounded-full border-t-2 border-l-2 border-primary-green animate-spin mx-4 border-dotted" />
          ) : (
            'Analyze'
          )}
        </button>
        <div className="lg:col-span-2 h-[55%] lg:h-full relative">
          <div className="w-full h-full">
            <textarea
              className="w-full h-full p-8 text-xl outline-none rounded-md shadow border dark:bg-[#27272a] dark:border-[#27272a]"
              placeholder="Write about your day!"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <div className="h-[45%] lg:h-full w-full bg-white dark:bg-white/20 rounded-md shadow overflow-y-scroll">
          <div
            className="bg-blue-400 px-6 py-6 text-white dark:bg-opacity-75"
            style={{
              backgroundColor: analysis?.color,
              color: fontColor,
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
                    <span className="flex-wrap text-black/60 w-[60%] lg:w-[70%] dark:text-white/70">
                      {item.value}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
