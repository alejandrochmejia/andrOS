"use client"

import {
  Calculator,
  File,
  Folder,
  Globe,
  FileText,
  Music,
  Palette,
  Play,
  Terminal,
  Settings,
  Trash2,
  Hash,
} from "lucide-react"
import { useSystem } from "@/components/system-context"

export default function Dock() {
  const { applications, openApp, openApplications } = useSystem()

  const getIconForApp = (iconName: string) => {
    switch (iconName) {
      case "folder":
        return <Folder size={24} />
      case "globe":
        return <Globe size={24} />
      case "file-text":
        return <FileText size={24} />
      case "terminal":
        return <Terminal size={24} />
      case "settings":
        return <Settings size={24} />
      case "trash":
        return <Trash2 size={24} />
      case "file":
        return <File size={24} />
      case "play":
        return <Play size={24} />
      case "palette":
        return <Palette size={24} />
      case "calculator":
        return <Calculator size={24} />
      case "music":
        return <Music size={24} />
      case "hash":
        return <Hash size={24} />
      default:
        return <Folder size={24} />
    }
  }

  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-black/20 p-2 backdrop-blur-md">
      {applications.map((app) => (
        <button
          key={app.id}
          onClick={() => openApp(app.id)}
          className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-all hover:bg-white/10 ${
            openApplications.includes(app.id) ? "bg-white/10" : ""
          }`}
        >
          {getIconForApp(app.icon)}
          {openApplications.includes(app.id) && <div className="absolute bottom-0.5 h-1 w-1 rounded-full bg-white" />}
        </button>
      ))}
    </div>
  )
}
