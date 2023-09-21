import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { loadQAStuffChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { z, TypeOf } from 'zod'
import { JournalEntry } from '@prisma/client'

const schema = z.object({
  mood: z
    .string()
    .describe('the mood of the person who wrote the journal entry.'),
  subject: z.string().describe('the subject of the journal entry'),
  summary: z
    .string()
    .describe('quick summary of the journal entry, it must be short!.'),
  moodScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe(
      'Mood score of the person who wrote the journal entry on a scale of 1 to 100, where:\n' +
        '- 0-20 indicates a challenging or negative day (e.g., "I had a tough day at work.")\n' +
        '- 21-40 represents a less-than-ideal day (e.g., "It was a bit of a struggle.")\n' +
        '- 41-60 signifies a neutral or ordinary day (e.g., "I had a regular day at work.")\n' +
        '- 61-80 indicates a good day (e.g., "Things went smoothly at the office.")\n' +
        '- 81-100 suggests an excellent or positive day (e.g., "I had a fantastic time with friends.")'
    ),
  color: z
    .string()
    .describe(
      'a hexidecimal color code that represents the mood of the person who wrote the journal entry (make sure it is valid!). Example #0101fe for blue representing happiness.'
    ),
  sentimentScore: z
    .number()
    .describe(
      'sentiment score of the text and rated on a scale from -10 to 10, where -10 is extremely negativem 0 is neutral, and 10 is extremely positive.'
    ),
})

const parser = StructuredOutputParser.fromZodSchema(schema)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })
  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyze = async (content: string): Promise<AiOutput | void> => {
  const input = await getPrompt(content)
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })
  const result = await model.call(input)
  try {
    return parser.parse(result)
  } catch (e) {
    console.log(e)
  }
}

export const qa = async (
  question: string,
  entries: Pick<JournalEntry, 'content' | 'id' | 'createdAt'>[]
) => {
  const questionPromptTemplateString = `Context information is below.
  ---------------------
  {context}
  ---------------------
  Given the context information and no prior knowledge, answer the question: {question} \nmake sure the answer is in second person!`

  const questionPrompt = new PromptTemplate({
    inputVariables: ['context', 'question'],
    template: questionPromptTemplateString,
  })

  const docs = entries.map((entry) => {
    let content = entry.content
    if (!content) {
      content = 'no journal entry found'
    }
    return new Document({
      pageContent: content,
      metadata: { source: entry.id, date: entry.createdAt },
    })
  })

  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    maxConcurrency: 10,
  })

  const chain = loadQAStuffChain(model, {
    prompt: questionPrompt,
  })
  const embedings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embedings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: [relevantDocs[0]],
    question,
  })
  if (res.text) {
    return res.text
  } else {
    return res.current_text
  }
}

type AiOutput = TypeOf<typeof schema>

// const refinePromptTemplateString = `The original question is as follows: {question}
// We have provided an existing answer: {existing_answer}
// We have the opportunity to update the existing answer
// (only if needed and only if it satisfies the question!) with some more context below.
// ------------
// {context}
// ------------
// Given the new context, update the original answer to better answer the question.
// You must provide a response, either original answer or updated answer.`

// const refinePrompt = new PromptTemplate({
//   inputVariables: ['question', 'existing_answer', 'context'],
//   template: refinePromptTemplateString,
// })
