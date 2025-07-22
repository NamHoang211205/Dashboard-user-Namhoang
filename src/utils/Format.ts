export function formatNow (): string {
    const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')

  const year = now.getFullYear()
  const month = pad(now.getMonth() + 1)
  const day = pad(now.getDate())
  const hour = pad(now.getHours())
  const minute = pad(now.getMinutes())
  const second = pad(now.getSeconds())

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

export function formatDateToMMDDYYYY (dateStr: string): string {
  const date = new Date(dateStr)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${mm}/${dd}/${yyyy}`
}

