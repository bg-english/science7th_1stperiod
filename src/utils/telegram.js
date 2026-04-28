// utils/telegram.js
import { TELEGRAM } from '../data/courseData'

export async function sendTelegramText(text) {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM.botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM.chatId, text, parse_mode: 'HTML' }),
      }
    )
    const json = await res.json()
    if (!json.ok) console.warn('Telegram text failed:', json)
    return json.ok
  } catch (e) {
    console.warn('Telegram text error:', e)
    return false
  }
}

export async function sendTelegramDocument(pdfBlob, fileName, caption) {
  try {
    const fd = new FormData()
    fd.append('chat_id', TELEGRAM.chatId)
    fd.append('document', pdfBlob, fileName)
    fd.append('caption', caption)

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM.botToken}/sendDocument`,
      { method: 'POST', body: fd }
    )
    const json = await res.json()
    console.log('Telegram doc response:', json)
    return json.ok
  } catch (e) {
    console.warn('Telegram doc error:', e)
    return false
  }
}
