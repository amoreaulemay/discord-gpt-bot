import Eris from "eris"
import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"

dotenv.config()

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANISATION_ID as string,
  apiKey: process.env.OPENAI_API_KEY as string,
})
const openai = new OpenAIApi(configuration)

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

const systemMsg: Omit<Message, "id"> = {
  role: "system",
  content:
    "You are a helpful assistant. When you answer code markdown, it is important that you identify the language. If the code you answer is either JavaScript or TypeScript, make sure to include TSDoc.",
}
let msg: Message[] = []

function resetMsgs(channel_id: string): void {
  if (msg.filter((m) => m.id === channel_id).length > 100) {
    msg = msg.filter((m) => m.id !== channel_id)
  }
}

const bot: Eris.Client = new Eris.Client(process.env.DISCORD_BOT_TOKEN as string, {
  intents: ["guildMessages"],
})

async function runCompletion(message: Eris.Message): Promise<string> {
  resetMsgs(message.channel.id)
  msg.push({ id: message.channel.id, content: message.content, role: "user" })

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      systemMsg,
      ...msg.filter((m) => m.id === message.channel.id).map((m) => ({ role: m.role, content: m.content })),
    ],
  })

  msg.push({ id: message.channel.id, role: "assistant", content: completion.data.choices[0].message?.content ?? "" })

  return completion.data.choices[0].message?.content ?? "No answer..."
}

bot.on("ready", () => {
  console.log("Bot is connected and ready!")
})

bot.on("error", console.error)

bot.on("messageCreate", (msg: Eris.Message) => {
  if (msg.author.bot) return

  runCompletion(msg).then((result) => {
    const maxLength = 2000
    let startIndex = 0

    while (startIndex < result.length) {
      const chunk = result.slice(startIndex, startIndex + maxLength)
      bot.createMessage(msg.channel.id, chunk)
      startIndex += maxLength
    }
  })
})

bot.connect()

process.on("SIGINT", () => {
  bot.disconnect({})
  process.exit(0)
})
