"use client"

import { useState, useEffect } from "react"
import BootScreen from "@/components/boot-screen"
import Desktop from "@/components/desktop"
import ShutdownScreen from "@/components/shutdown-screen"
import { SystemProvider } from "@/components/system-context"

export default function Home() {
  const [systemState, setSystemState] = useState<"off" | "booting" | "on" | "shutting-down">("off")

  useEffect(() => {
    // Auto-boot when page loads
    setSystemState("booting")

    // Cleanup on unmount
    return () => {
      setSystemState("off")
    }
  }, [])

  return (
    <SystemProvider>
      <main className="h-screen w-screen overflow-hidden bg-black text-white">
        {systemState === "off" && (
          <div className="flex h-full w-full items-center justify-center">
            <button
              onClick={() => setSystemState("booting")}
              className="rounded-full bg-white/10 px-6 py-2 text-white hover:bg-white/20"
            >
              Encender
            </button>
          </div>
        )}

        {systemState === "booting" && <BootScreen onBootComplete={() => setSystemState("on")} />}

        {systemState === "on" && <Desktop onShutdown={() => setSystemState("shutting-down")} />}

        {systemState === "shutting-down" && <ShutdownScreen onShutdownComplete={() => setSystemState("off")} />}
      </main>
    </SystemProvider>
  )
}
