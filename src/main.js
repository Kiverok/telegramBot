import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import config from "config"
import { chatGPT } from "./chatgpt.js";
 
const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
    handlerTimeout: Infinity,
})

bot.command('start', (ctx) => {
    ctx.reply(
        'Ласкаво просимо до бота. Відправте тестове повідомлення з тезисами про історію.'
    )
})

bot.on(message('text'), async (ctx) => {
    await chatGPT(ctx.message.text)
    ctx.reply('test') 
})
bot.launch()