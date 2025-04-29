"use client"

import { useState } from "react"
import MenuBar from "@/components/menu-bar"
import Dock from "@/components/dock"
import WindowManager from "@/components/window-manager"
import Wallpaper from "@/components/wallpaper"
import { useSystem } from "@/components/system-context"

export default function Desktop({ onShutdown }: { onShutdown: () => void }) {
  const { openApp } = useSystem()
  const [showPowerMenu, setShowPowerMenu] = useState(false)

  const handlePowerAction = (action: string) => {
    setShowPowerMenu(false)
    if (action === "shutdown") {
      onShutdown()
    } else if (action === "restart") {
      onShutdown()
      // In a real implementation, we would restart the system after shutdown
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Wallpaper />

      <MenuBar
        onPowerClick={() => setShowPowerMenu(!showPowerMenu)}
        showPowerMenu={showPowerMenu}
        onPowerAction={handlePowerAction}
      />

      <WindowManager />

      <Dock />
    </div>
  )
}
