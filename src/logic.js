import { italic } from 'telegraf/format'

import { openai } from './openai.js'
import { ogg } from './ogg.js'
import { gptMessage, removeFile } from './utils.js'

export async function processingVoiceMessage(ctx) {
  try {
    await ctx.reply(italic('Processing voice...'))
    const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)

    const userId = String(ctx.message.from.id)

    const oggPath = await ogg.create(link.href, userId)
    const mp3Path = await ogg.toMp3(oggPath, userId)
    removeFile(oggPath)

    const text = await openai.transcription(mp3Path)
    removeFile(mp3Path)

    await ctx.reply(italic(`- ${text}`))
    await processingGptResponse(ctx, text)
  } catch (e) {
    await ctx.reply(e.message)
    console.error(`Error while processing voice message`, e.message)
  }
}

export async function processingTextMessage(ctx) {
  try {
    await ctx.reply(italic('Processing text...'))
    await processingGptResponse(ctx, ctx.message.text)
  } catch (e) {
    await ctx.reply(e.message)
    console.error(`Error while processing text message`, e.message)
  }
}

async function processingGptResponse(ctx, text) {
  try {
    console.log('DEBUG', ctx.session.messages)

    ctx.session.messages.push(gptMessage(text))
    const response = await openai.chat(ctx.session.messages)

    if (!response) return await ctx.reply(response)

    ctx.session.messages.push(
      gptMessage(response.content, openai.roles.ASSISTANT)
    )

    await ctx.reply(response.content)
  } catch (e) {
    console.log(`Error while processing gpt response`, e.message)
  }
}
