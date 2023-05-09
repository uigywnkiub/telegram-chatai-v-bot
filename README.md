# Telegram chatai-v bot

The chatai-v bot uses Telegraf API to configure the Telegram bot and Whisper-1 transcription model together with the gpt-3.5-turbo model and express.js to start running your Telegram bot.

## Screenshots

![App Screenshot](https://github.com/kas1qqqq/react-chatgpt-clone/assets/29861553/95ae8f4c-3123-4bef-b982-84b2fd38dd88)

## Installation

Clone the repository to your local machine, then create the `.env` file in the root directory of the project and create the `OPENAI_TOKEN` variable in it, and pass your private OpenAI token from your account at https://platform.openai.com, and create the `TELEGRAF_TOKEN` variable in it, and pass your private token from your created bot using official create bots https://t.me/BotFather.

Install dependencies.

```bash
  npm i
```

Start dev mode with nodemon.

```bash
  npm run dev
```

Start running your bot.

```bash
  npm run start
```
