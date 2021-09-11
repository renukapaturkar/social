import React from 'react'

export const DateFormat = ({ timestamp }) => {
  let date, time
  if (timestamp) {
    date = new Date(timestamp)
    const [month, day, year] = [
      date.toLocaleString('default', { month: 'short' }),
      date.getDate(),
      date.getFullYear(),
    ]
    time = `${day}-${month}-${year}`
  }

  return <span className="text-xs">{time}</span>
}
