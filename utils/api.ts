const createUrl = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createUrl('/api/journal'), {
      method: 'POST',
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const getAllEntries = async () => {
  const res = await fetch(
    new Request(createUrl('/api/journal'), {
      cache: 'no-store',
      next: {
        tags: ['allEntries'],
      },
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
export const deleteEntry = async (id: string) => {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: 'DELETE',
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const upsertAnalysis = async (entryId: string, content: string) => {
  const res = await fetch(
    new Request(createUrl(`/api/analysis/${entryId}`), {
      method: 'PUT',
      body: JSON.stringify({ content }),
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const askQuestion = async (question: string) => {
  const res = await fetch(
    new Request(createUrl(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
