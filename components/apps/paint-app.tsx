"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Circle, Square, Type, Pencil, Eraser, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

type Tool = "pencil" | "eraser" | "rectangle" | "circle" | "text"

export default function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<Tool>("pencil")
  const [color, setColor] = useState("#ffffff")
  const [lineWidth, setLineWidth] = useState(5)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [textInput, setTextInput] = useState("")
  const [showTextInput, setShowTextInput] = useState(false)
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      // Set canvas size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Set initial canvas background to dark
      if (context) {
        context.fillStyle = "#1f2937" // gray-800
        context.fillRect(0, 0, canvas.width, canvas.height)
        setCtx(context)
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setStartPos({ x, y })

    if (tool === "pencil" || tool === "eraser") {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.strokeStyle = tool === "eraser" ? "#1f2937" : color
      ctx.lineWidth = lineWidth
    } else if (tool === "text") {
      setTextPosition({ x, y })
      setShowTextInput(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "pencil" || tool === "eraser") {
      ctx.lineTo(x, y)
      ctx.stroke()
    } else if (tool === "rectangle") {
      // Preview rectangle (clear and redraw)
      const canvas = canvasRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      redrawCanvas()

      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y)
    } else if (tool === "circle") {
      // Preview circle (clear and redraw)
      const canvas = canvasRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      redrawCanvas()

      const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2))
      ctx.beginPath()
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (!isDrawing || !ctx) return
    setIsDrawing(false)

    // Save the current canvas state for undo functionality
    saveCanvasState()
  }

  // Canvas state history for undo/redo
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const saveCanvasState = () => {
    if (!ctx || !canvasRef.current) return

    const canvas = canvasRef.current
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // Remove any future states if we're in the middle of the history
    const newHistory = canvasHistory.slice(0, historyIndex + 1)
    newHistory.push(imageData)

    setCanvasHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const redrawCanvas = () => {
    if (!ctx || !canvasRef.current || historyIndex < 0) return

    const canvas = canvasRef.current
    ctx.putImageData(canvasHistory[historyIndex], 0, 0)
  }

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return

    const canvas = canvasRef.current
    ctx.fillStyle = "#1f2937" // gray-800
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    saveCanvasState()
  }

  const handleTextSubmit = () => {
    if (!ctx || !textInput.trim()) {
      setShowTextInput(false)
      return
    }

    ctx.font = `${lineWidth * 3}px Arial`
    ctx.fillStyle = color
    ctx.fillText(textInput, textPosition.x, textPosition.y)

    setTextInput("")
    setShowTextInput(false)
    saveCanvasState()
  }

  const saveImage = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.download = "andros-paint.png"
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }

  return (
    <div className="flex h-full flex-col bg-gray-900 text-gray-200">
      <div className="flex items-center gap-2 border-b border-gray-700 p-2">
        <div className="flex gap-1">
          <Button
            variant={tool === "pencil" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setTool("pencil")}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "eraser" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setTool("eraser")}
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "rectangle" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setTool("rectangle")}
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "circle" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setTool("circle")}
          >
            <Circle className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "text" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setTool("text")}
          >
            <Type className="h-4 w-4" />
          </Button>
        </div>

        <div className="mx-2 h-8 w-px bg-gray-700" />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded border border-gray-700"
        />

        <div className="flex items-center gap-2">
          <span className="text-xs">Grosor:</span>
          <Slider
            value={[lineWidth]}
            min={1}
            max={20}
            step={1}
            onValueChange={(value) => setLineWidth(value[0])}
            className="w-24"
          />
        </div>

        <div className="mx-2 h-8 w-px bg-gray-700" />

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={saveImage}>
          <Save className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={clearCanvas}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative flex-1">
        <canvas
          ref={canvasRef}
          className="h-full w-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />

        {showTextInput && (
          <div
            className="absolute bg-gray-800 border border-gray-700 p-2"
            style={{ left: textPosition.x, top: textPosition.y }}
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
              className="border border-gray-700 bg-gray-900 px-2 py-1 text-sm text-white"
              autoFocus
            />
            <Button size="sm" onClick={handleTextSubmit} className="ml-2">
              Añadir
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
