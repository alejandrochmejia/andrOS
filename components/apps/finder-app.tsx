"use client"

import { useState, useEffect } from "react"
import {
  Folder,
  FileText,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Home,
  FolderPlus,
  File,
  Play,
  Music,
  Trash2,
  MoreHorizontal,
  ArrowUp,
} from "lucide-react"
import { useSystem, type FileItem, type FileType } from "@/components/system-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function FinderApp() {
  const { currentPath, navigateTo, getFilesByPath, openFile, deleteFile, createFolder } = useSystem()

  const [files, setFiles] = useState<FileItem[]>([])
  const [history, setHistory] = useState<string[]>(["/"])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [newFolderName, setNewFolderName] = useState("")
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  // Actualizar archivos cuando cambia la ruta
  useEffect(() => {
    setFiles(getFilesByPath(currentPath))
  }, [currentPath, getFilesByPath])

  // Actualizar historial cuando cambia la ruta
  useEffect(() => {
    if (history[historyIndex] !== currentPath) {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(currentPath)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }, [currentPath, history, historyIndex])

  const handleNavigate = (path: string) => {
    navigateTo(path)
  }

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      navigateTo(history[newIndex])
    }
  }

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      navigateTo(history[newIndex])
    }
  }

  const handleGoUp = () => {
    if (currentPath === "/") return

    const pathParts = currentPath.split("/")
    pathParts.pop() // Eliminar la última parte
    const parentPath = pathParts.join("/") || "/"
    navigateTo(parentPath)
  }

  const handleGoHome = () => {
    navigateTo("/")
  }

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim())
      setNewFolderName("")
      setIsCreatingFolder(false)
    }
  }

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file.id)

    // Doble clic para abrir
    if (selectedFile === file.id) {
      openFile(file.id)
      setSelectedFile(null)
    }
  }

  const handleDeleteFile = (fileId: string) => {
    deleteFile(fileId)
  }

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case "folder":
        return <Folder className="h-12 w-12 text-blue-400" />
      case "image":
        return <ImageIcon className="h-12 w-12 text-green-400" />
      case "video":
        return <Play className="h-12 w-12 text-red-400" />
      case "note":
        return <FileText className="h-12 w-12 text-yellow-400" />
      case "document":
        return <File className="h-12 w-12 text-gray-300" />
      case "audio":
        return <Music className="h-12 w-12 text-purple-400" />
      default:
        return <FileText className="h-12 w-12 text-gray-300" />
    }
  }

  const formatPath = (path: string) => {
    if (path === "/") return "Inicio"
    return path.split("/").filter(Boolean).join(" > ")
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const formatSize = (size: number) => {
    if (size === 0) return "-"
    if (size < 1024) return `${size} KB`
    return `${(size / 1024).toFixed(2)} MB`
  }

  return (
    <div className="flex h-full flex-col text-gray-200">
      {/* Barra de herramientas */}
      <div className="flex items-center gap-2 border-b border-gray-700 p-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleGoBack} disabled={historyIndex <= 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleGoForward}
          disabled={historyIndex >= history.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleGoUp} disabled={currentPath === "/"}>
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleGoHome}>
          <Home className="h-4 w-4" />
        </Button>

        <div className="mx-2 h-6 w-px bg-gray-700" />

        <div className="rounded bg-gray-800 px-3 py-1 text-sm">{formatPath(currentPath)}</div>

        <div className="flex-1" />

        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setIsCreatingFolder(true)}>
          <FolderPlus className="mr-1 h-4 w-4" />
          Nueva carpeta
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${viewMode === "grid" ? "bg-gray-700" : ""}`}
          onClick={() => setViewMode("grid")}
        >
          Iconos
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${viewMode === "list" ? "bg-gray-700" : ""}`}
          onClick={() => setViewMode("list")}
        >
          Lista
        </Button>
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-auto p-4">
        {isCreatingFolder ? (
          <div className="mb-4 flex items-center gap-2">
            <Folder className="h-6 w-6 text-blue-400" />
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-white focus:border-blue-500 focus:outline-none"
              placeholder="Nombre de la carpeta"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateFolder()
                if (e.key === "Escape") setIsCreatingFolder(false)
              }}
            />
            <Button size="sm" onClick={handleCreateFolder}>
              Crear
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsCreatingFolder(false)}>
              Cancelar
            </Button>
          </div>
        ) : null}

        {files.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <Folder className="mb-2 h-16 w-16" />
            <p>Esta carpeta está vacía</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
            {files.map((file) => (
              <div
                key={file.id}
                className={`group flex flex-col items-center justify-center rounded p-2 hover:bg-gray-800 ${
                  selectedFile === file.id ? "bg-gray-700" : ""
                }`}
                onClick={() => handleFileClick(file)}
              >
                {getFileIcon(file.type)}
                <div className="mt-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs">
                  {file.name}
                </div>

                <div className="invisible absolute right-1 top-1 group-hover:visible">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          openFile(file.id)
                        }}
                      >
                        Abrir
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteFile(file.id)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4 text-red-400" />
                        Mover a papelera
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full table-auto">
            <thead className="border-b border-gray-700 text-left text-xs text-gray-400">
              <tr>
                <th className="pb-2 pl-2">Nombre</th>
                <th className="pb-2">Tamaño</th>
                <th className="pb-2">Tipo</th>
                <th className="pb-2">Modificado</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.id}
                  className={`hover:bg-gray-800 ${selectedFile === file.id ? "bg-gray-700" : ""}`}
                  onClick={() => handleFileClick(file)}
                >
                  <td className="py-2 pl-2">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <span>{file.name}</span>
                    </div>
                  </td>
                  <td>{formatSize(file.size)}</td>
                  <td>{file.type.charAt(0).toUpperCase() + file.type.slice(1)}</td>
                  <td>{formatDate(file.modifiedAt)}</td>
                  <td>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              openFile(file.id)
                            }}
                          >
                            Abrir
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteFile(file.id)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4 text-red-400" />
                            Mover a papelera
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
