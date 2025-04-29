"use client"

import { useState, useEffect } from "react"
import { Trash2, RefreshCw, FileText, Folder, ImageIcon, Play, Music, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSystem, type FileItem, type FileType } from "@/components/system-context"

export default function TrashApp() {
  const { trashItems, restoreFile, emptyTrash, openFile } = useSystem()
  const [items, setItems] = useState<FileItem[]>([])

  useEffect(() => {
    setItems(trashItems)
  }, [trashItems])

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        return `hace ${diffMinutes} minutos`
      }
      return `hace ${diffHours} horas`
    } else if (diffDays === 1) {
      return "ayer"
    } else {
      return `hace ${diffDays} días`
    }
  }

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case "folder":
        return <Folder className="h-4 w-4 text-blue-400" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-green-400" />
      case "video":
        return <Play className="h-4 w-4 text-red-400" />
      case "note":
        return <FileText className="h-4 w-4 text-yellow-400" />
      case "document":
        return <File className="h-4 w-4 text-gray-300" />
      case "audio":
        return <Music className="h-4 w-4 text-purple-400" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  const handleRestore = (id: string) => {
    restoreFile(id)
  }

  const handleEmptyTrash = () => {
    emptyTrash()
  }

  const handleOpenFile = (id: string) => {
    openFile(id)
  }

  return (
    <div className="flex h-full flex-col text-gray-200">
      <div className="mb-4 flex items-center justify-between border-b border-gray-700 pb-2">
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-medium">Papelera</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={handleEmptyTrash}
            disabled={items.length === 0}
          >
            Vaciar papelera
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-gray-400">
          <Trash2 className="mb-2 h-12 w-12" />
          <p>La papelera está vacía</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-left text-xs font-medium text-gray-400">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Eliminado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      {getFileIcon(item.type)}
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-400">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-400">{formatDate(item.modifiedAt)}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleRestore(item.id)}>
                        <RefreshCw className="h-4 w-4" />
                        <span className="sr-only">Restaurar</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleOpenFile(item.id)}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Abrir</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
