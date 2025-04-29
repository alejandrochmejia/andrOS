"use client"

import { useSystem } from "@/components/system-context"
import Window from "@/components/window"
import FinderApp from "@/components/apps/finder-app"
import BrowserApp from "@/components/apps/browser-app"
import NotesApp from "@/components/apps/notes-app"
import TerminalApp from "@/components/apps/terminal-app"
import SettingsApp from "@/components/apps/settings-app"
import TrashApp from "@/components/apps/trash-app"
import WordApp from "@/components/apps/word-app"
import MediaApp from "@/components/apps/media-app"
import PaintApp from "@/components/apps/paint-app"
import CalculatorApp from "@/components/apps/calculator-app"
import SpotifyApp from "@/components/apps/spotify-app"
import TicTacToeApp from "@/components/apps/tictactoe-app"

export default function WindowManager() {
  const { applications, openApplications, closeApp, minimizeApp, activeApp, setActiveApp, minimizedApps } = useSystem()

  const getAppComponent = (appId: string) => {
    switch (appId) {
      case "finder":
        return <FinderApp />
      case "browser":
        return <BrowserApp />
      case "notes":
        return <NotesApp />
      case "terminal":
        return <TerminalApp />
      case "settings":
        return <SettingsApp />
      case "trash":
        return <TrashApp />
      case "word":
        return <WordApp />
      case "media":
        return <MediaApp />
      case "paint":
        return <PaintApp />
      case "calculator":
        return <CalculatorApp />
      case "spotify":
        return <SpotifyApp />
      case "tictactoe":
        return <TicTacToeApp />
      default:
        return null
    }
  }

  return (
    <div className="absolute inset-0 pt-8">
      {openApplications.map((appId, index) => {
        const app = applications.find((a) => a.id === appId)
        if (!app) return null

        const isMinimized = minimizedApps.includes(appId)
        const isActive = activeApp === appId

        if (isMinimized) return null

        return (
          <Window
            key={appId}
            title={app.name}
            isActive={isActive}
            onClose={() => closeApp(appId)}
            onMinimize={() => minimizeApp(appId)}
            onClick={() => setActiveApp(appId)}
            zIndex={isActive ? 10 : 1}
          >
            {getAppComponent(appId)}
          </Window>
        )
      })}
    </div>
  )
}
