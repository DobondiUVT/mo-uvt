import { IconUxCircle, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'

type BannerProps = {
  title: string
  type: 'error' | 'warning' | 'info' | 'success'
}

const Banner = ({ title, type }: BannerProps) => {
  function getColor(type: BannerProps['type']) {
    switch (type) {
      case 'error':
        return 'red'
      case 'warning':
        return 'yellow'
      case 'info':
        return 'blue'
      case 'success':
        return 'green'
    }
  }
  const color = getColor(type)

  const [show, setShow] = useState(true)

  if (!show) return null

  return (
    <div
      className={`mb-6 rounded-md border-${color}-400 bg-${color}-200 px-6 py-4 text-${color}-800 flex items-center justify-between gap-4 shadow`}
    >
      <div>{title}</div>
      <button type="button" onClick={() => setShow(false)} className="text-xl">
        <IconX />
      </button>
    </div>
  )
}

export default Banner
