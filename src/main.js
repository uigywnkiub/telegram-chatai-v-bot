import { Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import dotenv from 'dotenv'

import { processingVoiceMessage, processingTextMessage } from './logic.js'
import { initCommand, normalize } from './utils.js'
dotenv.config()

const bot = new Telegraf(process.env.TELEGRAF_TOKEN)

bot.use(session())
bot.use(normalize())

bot.command(
  'start',
  initCommand('Send any text or voice message, I will try to respond to you.')
)

bot.on(message('text'), processingTextMessage)
bot.on(message('voice'), processingVoiceMessage)
;(async () => {
  try {
    bot.launch()

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
})()
