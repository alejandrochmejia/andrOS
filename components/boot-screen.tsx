"use client"

import { useState, useEffect } from "react"
import { AppleIcon } from "lucide-react"

export default function BootScreen({ onBootComplete }: { onBootComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onBootComplete()
          }, 500)
          return 100
        }
        return prev + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onBootComplete])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black">
      <div className="mb-8 text-white">
        <AppleIcon size={64} />
      </div>
      <div className="w-64 rounded-full bg-white/20">
        <div
          className="h-1 rounded-full bg-white transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h1 className="mt-8 text-2xl font-light text-white">AndrOS</h1>
    </div>
  )
}
