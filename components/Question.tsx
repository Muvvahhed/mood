'use client'
import { askQuestion } from '@/utils/api'
import { useState } from 'react'
import Spinner from './ui/spinner'

function Question() {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<string>()
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setIsLoading(false)
  }
  return (
    <>
      <form action="" className="flex gap-4 mb-4" onSubmit={handleSubmit}>
        <input
          disabled={isLoading}
          type="text"
          name=""
          id=""
          placeholder="ask a question"
          value={value}
          onChange={handleFormChange}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg outline-none focus:border focus:border-primary-green dark:bg-[#27272a]"
        />
        <button
          disabled={isLoading}
          className="bg-primary-green hover:bg-green-400 px-4 py-2 rounded-lg text-lg text-white disabled:bg-green-400"
          type="submit"
        >
          Ask
        </button>
      </form>
      <div className="mb-4">
        {isLoading && (
          <div>
            <Spinner text="searching..." />
          </div>
        )}
        {response && <div>{response}</div>}
      </div>
    </>
  )
}

export default Question
