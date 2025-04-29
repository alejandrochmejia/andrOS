"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSystem } from "@/components/system-context"

type Note = {
  id: string
  title: string
  content: string
  createdAt: Date
}

export default function NotesApp() {
  const { files, updateFileContent, createFile, deleteFile, activeApp } = useSystem()
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [editedTitle, setEditedTitle] = useState("")
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  // Cargar notas del sistema de archivos
  useEffect(() => {
    const systemNotes = files
      .filter((file) => file.type === "note")
      .map((file) => ({
        id: file.id,
        title: file.name,
        content: file.content || "",
        createdAt: file.createdAt,
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    setNotes(systemNotes)
  }, [files])

  // Seleccionar la primera nota si no hay ninguna seleccionada y hay notas disponibles
  useEffect(() => {
    if (notes.length > 0 && !selectedNote) {
      setSelectedNote(notes[0])
      setEditedContent(notes[0].content)
      setEditedTitle(notes[0].title)
    }
  }, [notes, selectedNote])

  // Reiniciar selección cuando se abre la app
  useEffect(() => {
    if (
      activeApp === "notes" &&
      notes.length > 0 &&
      (!selectedNote || !notes.find((note) => note.id === selectedNote.id))
    ) {
      setSelectedNote(notes[0])
      setEditedContent(notes[0].content)
      setEditedTitle(notes[0].title)
    }
  }, [activeApp, notes, selectedNote])

  const handleNoteSelect = (note: Note) => {
    // Guardar la nota actual antes de cambiar
    saveCurrentNote()

    // Seleccionar la nueva nota
    setSelectedNote(note)
    setEditedContent(note.content)
    setEditedTitle(note.title)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value)
  }

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    saveCurrentNote()
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false)
      saveCurrentNote()
    }
  }

  const saveCurrentNote = () => {
    if (selectedNote) {
      updateFileContent(selectedNote.id, editedContent)
      // En un sistema real, también actualizaríamos el título
    }
  }

  const createNewNote = () => {
    // Guardar la nota actual antes de crear una nueva
    saveCurrentNote()

    // Crear nueva nota en el sistema de archivos
    createFile({
      name: "Nueva nota",
      type: "note",
      path: "/Documentos",
      size: 1,
      content: "",
    })
  }

  const deleteNote = (noteId: string) => {
    deleteFile(noteId)

    // Si borramos la nota seleccionada, seleccionar otra
    if (selectedNote && selectedNote.id === noteId) {
      const remainingNotes = notes.filter((note) => note.id !== noteId)
      if (remainingNotes.length > 0) {
        setSelectedNote(remainingNotes[0])
        setEditedContent(remainingNotes[0].content)
        setEditedTitle(remainingNotes[0].title)
      } else {
        setSelectedNote(null)
        setEditedContent("")
        setEditedTitle("")
      }
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex h-full text-gray-200">
      <div className="w-1/3 border-r border-gray-700 pr-2">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-medium">Notas</div>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={createNewNote}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Nueva nota</span>
          </Button>
        </div>

        {notes.length === 0 ? (
          <div className="mt-4 text-center text-sm text-gray-400">No hay notas. Crea una nueva.</div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`group mb-1 cursor-pointer rounded p-2 text-sm ${
                selectedNote?.id === note.id ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => handleNoteSelect(note)}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{note.title}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNote(note.id)
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-400" />
                </Button>
              </div>
              <div className="mt-1 line-clamp-2 text-xs text-gray-400">{note.content || "Sin contenido"}</div>
              <div className="mt-1 text-xs text-gray-500">{formatDate(note.createdAt)}</div>
            </div>
          ))
        )}
      </div>

      <div className="flex-1 pl-2">
        {selectedNote ? (
          <div className="flex h-full flex-col">
            <div className="mb-2">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-sm font-medium text-white focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
              ) : (
                <div
                  className="cursor-text rounded px-2 py-1 text-sm font-medium hover:bg-gray-800"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {editedTitle}
                </div>
              )}
            </div>
            <textarea
              value={editedContent}
              onChange={handleContentChange}
              onBlur={saveCurrentNote}
              className="h-full w-full flex-1 resize-none rounded border border-gray-700 bg-gray-800 p-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
              placeholder="Escribe aquí..."
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <div className="text-center">
              <p>No hay notas seleccionadas</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={createNewNote}>
                <Plus className="mr-1 h-4 w-4" />
                Crear nota
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
