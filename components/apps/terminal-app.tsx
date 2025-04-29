"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function TerminalApp() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState([
    { type: "system", content: "AndrOS Terminal v1.0" },
    { type: "system", content: "Escribe 'help' para ver los comandos disponibles." },
  ])

  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (input.trim() === "") return

    // Add user input to history
    setHistory((prev) => [...prev, { type: "user", content: input }])

    // Process command
    processCommand(input)

    // Clear input
    setInput("")
  }

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()

    if (command === "help") {
      setHistory((prev) => [
        ...prev,
        {
          type: "system",
          content:
            "Comandos disponibles:\n- help: Muestra esta ayuda\n- clear: Limpia la terminal\n- date: Muestra la fecha y hora actual\n- ls: Lista archivos\n- whoami: Muestra el usuario actual\n- system: Muestra información del sistema",
        },
      ])
    } else if (command === "clear") {
      setHistory([
        { type: "system", content: "AndrOS Terminal v1.0" },
        { type: "system", content: "Escribe 'help' para ver los comandos disponibles." },
      ])
    } else if (command === "date") {
      setHistory((prev) => [...prev, { type: "system", content: new Date().toString() }])
    } else if (command === "ls") {
      setHistory((prev) => [
        ...prev,
        {
          type: "system",
          content: "Documents/\nDownloads/\nPictures/\nApplications/\nreadme.txt\nwallpaper.jpg",
        },
      ])
    } else if (command === "whoami") {
      setHistory((prev) => [...prev, { type: "system", content: "usuario@andros" }])
    } else if (command === "system") {
      setHistory((prev) => [
        ...prev,
        {
          type: "system",
          content: "AndrOS v1.0\nRAM: 8GB\nAlmacenamiento: 256GB\nProcesador: Virtual CPU @ 2.4GHz",
        },
      ])
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: `Comando no reconocido: ${command}. Escribe 'help' para ver los comandos disponibles.`,
        },
      ])
    }
  }

  return (
    <div className="flex h-full flex-col bg-black text-green-400">
      <div ref={terminalRef} className="flex-1 overflow-auto p-2 font-mono text-sm">
        {history.map((item, index) => (
          <div
            key={index}
            className={`mb-1 ${
              item.type === "user" ? "text-white" : item.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {item.type === "user" ? `$ ${item.content}` : item.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleInputSubmit} className="mt-2 flex items-center border-t border-gray-700 p-2">
        <span className="mr-2 text-sm">$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 bg-transparent text-sm text-white outline-none"
          autoFocus
        />
      </form>
    </div>
  )
}
