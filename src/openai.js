import { Configuration, OpenAIApi } from 'openai'
import { createReadStream } from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const CHAT_GPT_MODEL = 'gpt-3.5-turbo'

class OpenAI {
  roles = {
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    USER: 'user',
  }

  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    })
    this.openai = new OpenAIApi(configuration)
  }

  async chat(messages = []) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: CHAT_GPT_MODEL,
        messages,
      })

      console.log('Usage', completion.data.usage)

      return completion.data.choices[0].message
    } catch (e) {
      console.error(`Error while chat completion: ${e.message}`)
    }
  }

  async transcription(filepath) {
    try {
      const response = await this.openai.createTranscription(
        createReadStream(filepath),
        'whisper-1'
      )
      return response.data.text
    } catch (e) {
      console.error(`Error while transcription: ${e.message}`)
    }
  }
}

export const openai = new OpenAI(process.env.OPENAI_TOKEN)
