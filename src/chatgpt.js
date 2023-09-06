import OpenAI from "openai";
import config from 'config'

const CHATGPT_MODEL = 'gpt-3.5-turbo'

const openai = new OpenAI({
    apiKey: config.get('OPENAI_KEY'),
})

export async function chatGPT(message = '') {
    const messages = []
    try {
        const completion = await openai.chat.completions.create({
            messages,
            model: CHATGPT_MODEL,
        })
    } catch (e) {
        console.error('Error while chat completion', e.message)
    }
}