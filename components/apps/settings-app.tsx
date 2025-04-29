"use client"

import { useState } from "react"
import { useSystem } from "@/components/system-context"

export default function SettingsApp() {
  const { totalRam, usedRam, totalStorage, usedStorage } = useSystem()
  const [activeTab, setActiveTab] = useState("general")

  const formatStorage = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(2)} GB`
    }
    return `${mb} MB`
  }

  return (
    <div className="flex h-full text-gray-200">
      <div className="w-1/4 border-r border-gray-700 pr-2">
        <div className="mb-4 text-sm font-medium">Ajustes</div>
        <div
          className={`cursor-pointer rounded p-2 text-sm ${activeTab === "general" ? "bg-gray-700" : "hover:bg-gray-800"}`}
          onClick={() => setActiveTab("general")}
        >
          General
        </div>
        <div
          className={`cursor-pointer rounded p-2 text-sm ${activeTab === "system" ? "bg-gray-700" : "hover:bg-gray-800"}`}
          onClick={() => setActiveTab("system")}
        >
          Sistema
        </div>
        <div
          className={`cursor-pointer rounded p-2 text-sm ${activeTab === "appearance" ? "bg-gray-700" : "hover:bg-gray-800"}`}
          onClick={() => setActiveTab("appearance")}
        >
          Apariencia
        </div>
      </div>

      <div className="flex-1 pl-4">
        {activeTab === "general" && (
          <div>
            <h2 className="mb-4 text-lg font-medium">Información General</h2>
            <div className="rounded-lg bg-gray-800 p-4">
              <div className="mb-2">
                <span className="font-medium">Nombre del sistema:</span> AndrOS
              </div>
              <div className="mb-2">
                <span className="font-medium">Versión:</span> 1.0
              </div>
              <div>
                <span className="font-medium">Fecha de instalación:</span> {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div>
            <h2 className="mb-4 text-lg font-medium">Recursos del Sistema</h2>

            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Memoria RAM</span>
                <span className="text-sm text-gray-400">
                  {formatStorage(usedRam)} / {formatStorage(totalRam)} ({Math.round((usedRam / totalRam) * 100)}%)
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-700">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: `${(usedRam / totalRam) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Almacenamiento</span>
                <span className="text-sm text-gray-400">
                  {formatStorage(usedStorage)} / {formatStorage(totalStorage)} (
                  {Math.round((usedStorage / totalStorage) * 100)}%)
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-700">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(usedStorage / totalStorage) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "appearance" && (
          <div>
            <h2 className="mb-4 text-lg font-medium">Apariencia</h2>
            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Tema</label>
                <select className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-sm text-white">
                  <option>Claro</option>
                  <option>Oscuro</option>
                  <option>Automático</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Fondo de pantalla</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-video cursor-pointer rounded bg-gradient-to-br from-blue-900 to-purple-900" />
                  <div className="aspect-video cursor-pointer rounded bg-gradient-to-br from-green-900 to-blue-900" />
                  <div className="aspect-video cursor-pointer rounded bg-gradient-to-br from-purple-900 to-pink-900" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
