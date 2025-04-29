"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipos para el sistema de archivos
export type FileType = "folder" | "image" | "video" | "note" | "document" | "text" | "audio"

export type FileItem = {
  id: string
  name: string
  type: FileType
  path: string
  size: number // en KB
  createdAt: Date
  modifiedAt: Date
  content?: string // Para notas y documentos
  metadata?: {
    duration?: string // Para videos y audio
    dimensions?: string // Para imágenes
    thumbnail?: string // URL de miniatura
  }
}

type Application = {
  id: string
  name: string
  icon: string
  ramUsage: number
  storageUsage: number
  isOpen: boolean
}

type SystemContextType = {
  totalRam: number
  usedRam: number
  totalStorage: number
  usedStorage: number
  applications: Application[]
  openApplications: string[]
  openApp: (appId: string) => void
  closeApp: (appId: string) => void
  minimizeApp: (appId: string) => void
  activeApp: string | null
  setActiveApp: (appId: string | null) => void
  minimizedApps: string[]
  // Sistema de archivos
  files: FileItem[]
  trashItems: FileItem[]
  currentPath: string
  navigateTo: (path: string) => void
  createFolder: (name: string) => void
  createFile: (file: Omit<FileItem, "id" | "createdAt" | "modifiedAt">) => void
  deleteFile: (fileId: string) => void
  restoreFile: (fileId: string) => void
  emptyTrash: () => void
  renameFile: (fileId: string, newName: string) => void
  updateFileContent: (fileId: string, content: string) => void
  getFileById: (fileId: string) => FileItem | undefined
  getFilesByPath: (path: string) => FileItem[]
  openFile: (fileId: string) => void
}

const SystemContext = createContext<SystemContextType | undefined>(undefined)

export function SystemProvider({ children }: { children: ReactNode }) {
  const [totalRam] = useState(8192) // 8GB en MB
  const [usedRam, setUsedRam] = useState(1024) // 1GB uso del sistema
  const [totalStorage] = useState(256000) // 256GB en MB
  const [usedStorage, setUsedStorage] = useState(64000) // 64GB uso del sistema
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [minimizedApps, setMinimizedApps] = useState<string[]>([])

  const [applications] = useState<Application[]>([
    {
      id: "finder",
      name: "Finder",
      icon: "folder",
      ramUsage: 128,
      storageUsage: 0,
      isOpen: false,
    },
    {
      id: "browser",
      name: "Navegador",
      icon: "globe",
      ramUsage: 512,
      storageUsage: 0,
      isOpen: false,
    },
    {
      id: "notes",
      name: "Notas",
      icon: "file-text",
      ramUsage: 64,
      storageUsage: 10,
      isOpen: false,
    },
    {
      id: "terminal",
      name: "Terminal",
      icon: "terminal",
      ramUsage: 32,
      storageUsage: 0,
      isOpen: false,
    },
    {
      id: "settings",
      name: "Ajustes",
      icon: "settings",
      ramUsage: 96,
      storageUsage: 0,
      isOpen: false,
    },
    {
      id: "trash",
      name: "Papelera",
      icon: "trash",
      ramUsage: 48,
      storageUsage: 0,
      isOpen: false,
    },
    {
      id: "word",
      name: "Documento",
      icon: "file",
      ramUsage: 256,
      storageUsage: 15,
      isOpen: false,
    },
    {
      id: "media",
      name: "Multimedia",
      icon: "play",
      ramUsage: 384,
      storageUsage: 0,
      isOpen: false,
    },
    {
      id: "paint",
      name: "Paint",
      icon: "palette",
      ramUsage: 192,
      storageUsage: 5,
      isOpen: false,
    },
    {
      id: "calculator",
      name: "Calculadora",
      icon: "calculator",
      ramUsage: 32,
      storageUsage: 0,
      isOpen: false,
    },
    {
      id: "spotify",
      name: "Spotify",
      icon: "music",
      ramUsage: 320,
      storageUsage: 0,
      isOpen: false,
    },
    {
      id: "tictactoe",
      name: "Tres en Raya",
      icon: "hash",
      ramUsage: 64,
      storageUsage: 0,
      isOpen: false,
    },
  ])

  const [openApplications, setOpenApplications] = useState<string[]>([])

  // Sistema de archivos
  const [files, setFiles] = useState<FileItem[]>([
    // Carpetas principales
    {
      id: "folder-documents",
      name: "Documentos",
      type: "folder",
      path: "/",
      size: 0,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "folder-downloads",
      name: "Descargas",
      type: "folder",
      path: "/",
      size: 0,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "folder-pictures",
      name: "Imágenes",
      type: "folder",
      path: "/",
      size: 0,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "folder-videos",
      name: "Videos",
      type: "folder",
      path: "/",
      size: 0,
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: "folder-music",
      name: "Música",
      type: "folder",
      path: "/",
      size: 0,
      createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },

    // Archivos en la raíz
    {
      id: "file-readme",
      name: "readme.txt",
      type: "text",
      path: "/",
      size: 2,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      content: "Bienvenido a AndrOS, un simulador de sistema operativo con interfaz minimalista.",
    },
    {
      id: "file-wallpaper",
      name: "wallpaper.jpg",
      type: "image",
      path: "/",
      size: 1024,
      createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      metadata: {
        dimensions: "1920x1080",
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
    },

    // Archivos en Documentos
    {
      id: "file-doc1",
      name: "Proyecto.docx",
      type: "document",
      path: "/Documentos",
      size: 256,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "file-doc2",
      name: "Presupuesto.xlsx",
      type: "document",
      path: "/Documentos",
      size: 128,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },

    // Notas
    {
      id: "note-1",
      name: "Bienvenido a AndrOS",
      type: "note",
      path: "/Documentos",
      size: 1,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      content: "Este es un simulador de sistema operativo con estética minimalista.",
    },
    {
      id: "note-2",
      name: "Características",
      type: "note",
      path: "/Documentos",
      size: 1,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      content: "- Gestión de RAM y almacenamiento\n- Múltiples aplicaciones\n- Interfaz de usuario intuitiva",
    },

    // Imágenes
    {
      id: "image-1",
      name: "vacaciones.jpg",
      type: "image",
      path: "/Imágenes",
      size: 2048,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      metadata: {
        dimensions: "1920x1080",
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "image-2",
      name: "familia.jpg",
      type: "image",
      path: "/Imágenes",
      size: 1536,
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      metadata: {
        dimensions: "1280x720",
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
    },

    // Videos
    {
      id: "video-1",
      name: "naturaleza.mp4",
      type: "video",
      path: "/Videos",
      size: 15360,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      metadata: {
        duration: "2:30",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
    },
    {
      id: "video-2",
      name: "océano.mp4",
      type: "video",
      path: "/Videos",
      size: 20480,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      metadata: {
        duration: "3:45",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
    },
    {
      id: "video-3",
      name: "montañas.mp4",
      type: "video",
      path: "/Videos",
      size: 18432,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      metadata: {
        duration: "4:20",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
    },

    // Música
    {
      id: "audio-1",
      name: "canción1.mp3",
      type: "audio",
      path: "/Música",
      size: 8192,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      metadata: {
        duration: "3:45",
      },
    },
    {
      id: "audio-2",
      name: "canción2.mp3",
      type: "audio",
      path: "/Música",
      size: 7168,
      createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      metadata: {
        duration: "4:12",
      },
    },
  ])

  const [trashItems, setTrashItems] = useState<FileItem[]>([
    {
      id: "trash-1",
      name: "Proyecto antiguo",
      type: "folder",
      path: "/Papelera",
      size: 0,
      createdAt: new Date(Date.now() - 3600000 * 24 * 5),
      modifiedAt: new Date(Date.now() - 3600000 * 24 * 5),
    },
    {
      id: "trash-2",
      name: "foto_vacaciones.jpg",
      type: "image",
      path: "/Papelera",
      size: 1024,
      createdAt: new Date(Date.now() - 3600000 * 5),
      modifiedAt: new Date(Date.now() - 3600000 * 5),
      metadata: {
        dimensions: "1920x1080",
        thumbnail: "/placeholder.svg?height=100&width=100",
      },
    },
  ])

  const [currentPath, setCurrentPath] = useState("/")

  useEffect(() => {
    // Calcular uso de recursos basado en aplicaciones abiertas
    let ramUsage = 1024 // Uso base del sistema
    let storageUsage = 64000 // Almacenamiento base del sistema

    applications.forEach((app) => {
      if (openApplications.includes(app.id)) {
        ramUsage += app.ramUsage
        storageUsage += app.storageUsage
      }
    })

    setUsedRam(ramUsage)
    setUsedStorage(storageUsage)
  }, [applications, openApplications])

  const openApp = (appId: string) => {
    if (!openApplications.includes(appId)) {
      setOpenApplications((prev) => [...prev, appId])
    }

    // Quitar de minimizados si estaba minimizado
    if (minimizedApps.includes(appId)) {
      setMinimizedApps((prev) => prev.filter((id) => id !== appId))
    }

    setActiveApp(appId)
  }

  const closeApp = (appId: string) => {
    setOpenApplications((prev) => prev.filter((id) => id !== appId))

    // Quitar de minimizados si estaba minimizado
    if (minimizedApps.includes(appId)) {
      setMinimizedApps((prev) => prev.filter((id) => id !== appId))
    }

    // Establecer app activa a null si la app cerrada era la activa
    if (activeApp === appId) {
      const remainingApps = openApplications.filter((id) => id !== appId)
      setActiveApp(remainingApps.length > 0 ? remainingApps[remainingApps.length - 1] : null)
    }
  }

  const minimizeApp = (appId: string) => {
    if (!minimizedApps.includes(appId)) {
      setMinimizedApps((prev) => [...prev, appId])
    }

    // Establecer app activa a null si la app minimizada era la activa
    if (activeApp === appId) {
      const visibleApps = openApplications.filter((id) => !minimizedApps.includes(id) && id !== appId)
      setActiveApp(visibleApps.length > 0 ? visibleApps[visibleApps.length - 1] : null)
    }
  }

  // Funciones del sistema de archivos
  const navigateTo = (path: string) => {
    setCurrentPath(path)
  }

  const getFilesByPath = (path: string) => {
    return files.filter((file) => file.path === path)
  }

  const getFileById = (fileId: string) => {
    return files.find((file) => file.id === fileId) || trashItems.find((file) => file.id === fileId)
  }

  const createFolder = (name: string) => {
    const newFolder: FileItem = {
      id: `folder-${Date.now()}`,
      name,
      type: "folder",
      path: currentPath,
      size: 0,
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    setFiles([...files, newFolder])
  }

  const createFile = (file: Omit<FileItem, "id" | "createdAt" | "modifiedAt">) => {
    const newFile: FileItem = {
      ...file,
      id: `file-${Date.now()}`,
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    setFiles([...files, newFile])
  }

  const deleteFile = (fileId: string) => {
    const fileToDelete = files.find((file) => file.id === fileId)

    if (fileToDelete) {
      // Mover a la papelera
      setTrashItems([...trashItems, { ...fileToDelete, path: "/Papelera" }])
      // Eliminar del sistema de archivos
      setFiles(files.filter((file) => file.id !== fileId))
    }
  }

  const restoreFile = (fileId: string) => {
    const fileToRestore = trashItems.find((file) => file.id === fileId)

    if (fileToRestore) {
      // Restaurar al sistema de archivos (a la raíz por simplicidad)
      setFiles([...files, { ...fileToRestore, path: "/" }])
      // Eliminar de la papelera
      setTrashItems(trashItems.filter((file) => file.id !== fileId))
    }
  }

  const emptyTrash = () => {
    setTrashItems([])
  }

  const renameFile = (fileId: string, newName: string) => {
    setFiles(files.map((file) => (file.id === fileId ? { ...file, name: newName, modifiedAt: new Date() } : file)))
  }

  const updateFileContent = (fileId: string, content: string) => {
    setFiles(files.map((file) => (file.id === fileId ? { ...file, content, modifiedAt: new Date() } : file)))
  }

  const openFile = (fileId: string) => {
    const file = getFileById(fileId)

    if (!file) return

    // Abrir la aplicación correspondiente según el tipo de archivo
    switch (file.type) {
      case "video":
        openApp("media")
        break
      case "image":
        openApp("media")
        break
      case "note":
        openApp("notes")
        break
      case "document":
        openApp("word")
        break
      case "audio":
        openApp("spotify")
        break
      case "folder":
        openApp("finder")
        navigateTo(`${file.path === "/" ? "" : file.path}/${file.name}`)
        break
      default:
        openApp("finder")
    }
  }

  return (
    <SystemContext.Provider
      value={{
        totalRam,
        usedRam,
        totalStorage,
        usedStorage,
        applications,
        openApplications,
        openApp,
        closeApp,
        minimizeApp,
        activeApp,
        setActiveApp,
        minimizedApps,
        // Sistema de archivos
        files,
        trashItems,
        currentPath,
        navigateTo,
        createFolder,
        createFile,
        deleteFile,
        restoreFile,
        emptyTrash,
        renameFile,
        updateFileContent,
        getFileById,
        getFilesByPath,
        openFile,
      }}
    >
      {children}
    </SystemContext.Provider>
  )
}

export function useSystem() {
  const context = useContext(SystemContext)
  if (context === undefined) {
    throw new Error("useSystem must be used within a SystemProvider")
  }
  return context
}
