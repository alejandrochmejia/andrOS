"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

type WindowProps = {
  title: string
  children: React.ReactNode
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onClick: () => void
  zIndex: number
}

export default function Window({ title, children, isActive, onClose, onMinimize, onClick, zIndex }: WindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 50 })
  const [size, setSize] = useState({ width: 600, height: 400 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
      onClick()
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={windowRef}
      className={`absolute rounded-lg bg-gray-800/95 text-white shadow-lg backdrop-blur-md transition-shadow ${
        isActive ? "shadow-xl" : "shadow-md"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
      }}
      onClick={onClick}
    >
      <div
        className={`flex h-8 items-center justify-between rounded-t-lg px-3 ${
          isActive ? "bg-gray-700" : "bg-gray-800"
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600"
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
          />
          <button className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600" />
        </div>

        <div className="text-xs font-medium text-gray-200">{title}</div>

        <div className="w-16" />
      </div>

      <div className="h-[calc(100%-32px)] overflow-auto bg-gray-900 p-4">{children}</div>
    </div>
  )
}
