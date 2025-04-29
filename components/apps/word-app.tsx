"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WordApp() {
  const [content, setContent] = useState<string>(
    `<h1 style="text-align: center; color: white;">Documento de AndrOS</h1><p style="color: #e2e8f0;">Este es un procesador de texto simple inspirado en Microsoft Word. Puedes editar este texto y aplicar formato básico utilizando la barra de herramientas superior.</p><p style="color: #e2e8f0;">Características:</p><ul style="color: #e2e8f0;"><li>Texto en <strong>negrita</strong>, <em>cursiva</em> y <u>subrayado</u></li><li>Alineación de texto</li><li>Listas ordenadas y no ordenadas</li></ul><p style="color: #e2e8f0;">¡Prueba a editar este documento!</p>`,
  )
  const [fileName, setFileName] = useState<string>("Documento sin título")
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const editorRef = useRef<HTMLDivElement>(null)

  // Asegurarse de que el editor mantenga el color del texto
  useEffect(() => {
    if (editorRef.current) {
      // Observar cambios en el contenido para mantener el color del texto
      const observer = new MutationObserver(() => {
        const paragraphs = editorRef.current?.querySelectorAll('p:not([style*="color"])')
        if (paragraphs) {
          paragraphs.forEach((p) => {
            p.setAttribute("style", "color: #e2e8f0;")
          })
        }
      })

      observer.observe(editorRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      })

      return () => observer.disconnect()
    }
  }, [])

  const handleFormatAction = (action: string) => {
    document.execCommand(action, false)
  }

  const handleAlignAction = (alignment: string) => {
    document.execCommand("justifyLeft", false)
    document.execCommand("justifyCenter", false)
    document.execCommand("justifyRight", false)
    document.execCommand(alignment, false)
  }

  const handleListAction = (listType: string) => {
    document.execCommand(listType, false)
  }

  const handleFileNameClick = () => {
    setIsEditing(true)
  }

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value)
  }

  const handleFileNameBlur = () => {
    setIsEditing(false)
  }

  const handleFileNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false)
    }
  }

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML)
  }

  return (
    <div className="flex h-full flex-col bg-gray-900 text-gray-200">
      <div className="flex items-center justify-between border-b border-gray-700 px-2 py-1">
        {isEditing ? (
          <input
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            onBlur={handleFileNameBlur}
            onKeyDown={handleFileNameKeyDown}
            className="rounded border border-blue-500 bg-gray-800 px-2 py-1 text-sm text-white focus:outline-none"
            autoFocus
          />
        ) : (
          <div
            onClick={handleFileNameClick}
            className="cursor-text rounded px-2 py-1 text-sm font-medium hover:bg-gray-800"
          >
            {fileName}
          </div>
        )}
        <div className="text-xs text-gray-400">Guardado automáticamente</div>
      </div>

      <div className="border-b border-gray-700 p-1">
        <div className="flex flex-wrap gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleFormatAction("bold")}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleFormatAction("italic")}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleFormatAction("underline")}>
            <Underline className="h-4 w-4" />
          </Button>

          <div className="mx-1 h-8 w-px bg-gray-700" />

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleAlignAction("justifyLeft")}>
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleAlignAction("justifyCenter")}>
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleAlignAction("justifyRight")}>
            <AlignRight className="h-4 w-4" />
          </Button>

          <div className="mx-1 h-8 w-px bg-gray-700" />

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleListAction("insertUnorderedList")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleListAction("insertOrderedList")}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={editorRef}
        className="flex-1 overflow-auto bg-gray-900 p-4"
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleEditorInput}
        style={{ minHeight: "100px", direction: "ltr" }}
      />
    </div>
  )
}
