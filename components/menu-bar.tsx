"use client"

import { useState, useEffect } from "react"
import { AppleIcon, Battery, Wifi, Volume2 } from "lucide-react"
import { useSystem } from "@/components/system-context"

export default function MenuBar({
  onPowerClick,
  showPowerMenu,
  onPowerAction,
}: {
  onPowerClick: () => void
  showPowerMenu: boolean
  onPowerAction: (action: string) => void
}) {
  const { usedRam, totalRam, usedStorage, totalStorage } = useSystem()
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const ramPercentage = Math.round((usedRam / totalRam) * 100)
  const storagePercentage = Math.round((usedStorage / totalStorage) * 100)

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex h-8 items-center justify-between bg-black/80 px-4 backdrop-blur-md">
      <div className="flex items-center">
        <button onClick={onPowerClick} className="mr-4 flex items-center text-white hover:text-white/80">
          <AppleIcon size={18} />
        </button>

        <span className="text-sm font-medium text-white">AndrOS</span>

        {showPowerMenu && (
          <div className="absolute top-8 left-0 w-48 rounded-md bg-black/90 p-2 shadow-lg backdrop-blur-md">
            <button
              onClick={() => onPowerAction("restart")}
              className="w-full rounded px-3 py-1.5 text-left text-sm text-white hover:bg-white/10"
            >
              Reiniciar
            </button>
            <button
              onClick={() => onPowerAction("shutdown")}
              className="w-full rounded px-3 py-1.5 text-left text-sm text-white hover:bg-white/10"
            >
              Apagar
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-white">
        <div className="flex items-center gap-1">
          <span>RAM: {ramPercentage}%</span>
          <div className="h-2 w-16 rounded-full bg-white/20">
            <div className="h-2 rounded-full bg-white" style={{ width: `${ramPercentage}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span>Disco: {storagePercentage}%</span>
          <div className="h-2 w-16 rounded-full bg-white/20">
            <div className="h-2 rounded-full bg-white" style={{ width: `${storagePercentage}%` }} />
          </div>
        </div>

        <Wifi size={16} />
        <Battery size={16} />
        <Volume2 size={16} />
        <span>{currentTime}</span>
      </div>
    </div>
  )
}
