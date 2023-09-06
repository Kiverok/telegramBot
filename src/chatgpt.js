import OpenAI from "openai";
import config from 'config'

const CHATGPT_MODEL = 'gpt-3.5-turbo'

const ROLES = {
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    USER: 'user',
}

const openai = new OpenAI({
    apiKey: config.get('OPENAI_KEY'),
})

const getMessage = (m) => `
Напиши на основі цих тезисів послідовну емоційну історію: ${m}

Ці тезиси з описом ключових моментів дня.
Необхідно в результаті отримати таку історію, щоб я б міг запам’ятати цей день і
зміг розповісти про цей день друзям. Багато тексту не потрібно, головне, щоб
були емоції, правильна послідовність + контекст.
`

export async function chatGPT(message = '') {
    const messages = [
        {
role: ROLES.SYSTEM,
content:
'Ти копірайтер, який пише короткі емоційні статті для соціальних мереж'
    },
    {role: ROLES.USER, content: getMessage(message)}
]
    try {
        const completion = await openai.chat.completions.create({
            messages,
            model: CHATGPT_MODEL,
        })
    } catch (e) {
        console.error('Error while chat completion', e.message)
    }
}