// utils/telegram.js
import { TELEGRAM } from '../data/courseData'

export async function sendTelegramText(text) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM.chatId, text, parse_mode: 'HTML' }),
    })
  } catch (e) {
    console.warn('Telegram text error', e)
  }
}

export async function sendTelegramDocument(pdfUint8, fileName, caption) {
  const blob = new Blob([pdfUint8.buffer], { type: 'application/pdf' })

  // Try fetch first, fallback to XHR (Safari/iPad)
  const send = (fd) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `https://api.telegram.org/bot${TELEGRAM.botToken}/sendDocument`)
      xhr.timeout = 30000
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        res.ok ? resolve(res) : reject(new Error(res.description))
      }
      xhr.onerror = reject
      xhr.ontimeout = reject
      xhr.send(fd)
    })

  const fd = new FormData()
  fd.append('chat_id', TELEGRAM.chatId)
  fd.append('document', blob, fileName)
  fd.append('caption', caption)

  try {
    await send(fd)
    return true
  } catch (e) {
    console.warn('PDF send failed:', e)
    await sendTelegramText(
      `⚠️ <b>Note:</b> PDF could not be attached (device limitation). Full answers are in the message above.`
    )
    return false
  }
}
