"use client"

import { useState, useEffect } from "react"
import { AppleIcon } from "lucide-react"

export default function ShutdownScreen({ onShutdownComplete }: { onShutdownComplete: () => void }) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(0)
      setTimeout(() => {
        onShutdownComplete()
      }, 1000)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [onShutdownComplete])

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center bg-black transition-opacity duration-1000"
      style={{ opacity }}
    >
      <div className="mb-8 text-white">
        <AppleIcon size={64} />
      </div>
      <p className="text-sm text-white/70">Apagando...</p>
    </div>
  )
}
