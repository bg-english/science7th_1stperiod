// utils/telegram.js
import { TELEGRAM } from '../data/courseData'

const fetchWithTimeout = (url, options, ms = 15000) => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer))
}

export async function sendTelegramText(text) {
  try {
    await fetchWithTimeout(
      `https://api.telegram.org/bot${TELEGRAM.botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM.chatId, text, parse_mode: 'HTML' }),
      },
      12000
    )
  } catch (e) {
    console.warn('Telegram text error:', e)
  }
}

export async function sendTelegramDocument(pdfUint8, fileName, caption) {
  const blob = new Blob([pdfUint8.buffer], { type: 'application/pdf' })
  const fd = new FormData()
  fd.append('chat_id', TELEGRAM.chatId)
  fd.append('document', blob, fileName)
  fd.append('caption', caption)

  // XHR with timeout — best Safari/iPad compatibility
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.telegram.org/bot${TELEGRAM.botToken}/sendDocument`)
    xhr.timeout = 25000
    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText)
        resolve(res.ok)
      } catch { resolve(false) }
    }
    xhr.onerror   = () => resolve(false)
    xhr.ontimeout = () => resolve(false)
    xhr.send(fd)
  })
}
