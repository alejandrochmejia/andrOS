"use client"

import type React from "react"

import { useState } from "react"
import { Search, ArrowLeft, ArrowRight, RefreshCw, Home, Star, Plus } from "lucide-react"

// Páginas simuladas
const webPages = {
  home: {
    url: "https://andros.example.com",
    title: "AndrOS - Inicio",
    content: (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Bienvenido a AndrOS</h1>
        <p className="mt-2 text-center text-gray-300">
          Este es un simulador de sistema operativo creado con Next.js y React.
          <br />
          Explora las diferentes aplicaciones y funcionalidades.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-700 p-4">
            <h2 className="font-medium text-white">Características</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-300">
              <li>Gestión de RAM y almacenamiento</li>
              <li>Múltiples aplicaciones</li>
              <li>Interfaz minimalista</li>
              <li>Ventanas arrastrables</li>
            </ul>
          </div>

          <div className="rounded-lg bg-gray-700 p-4">
            <h2 className="font-medium text-white">Aplicaciones</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-300">
              <li>Finder</li>
              <li>Navegador</li>
              <li>Notas</li>
              <li>Terminal</li>
              <li>Ajustes</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  google: {
    url: "https://google.com",
    title: "Google",
    content: (
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8 text-4xl font-bold">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </div>
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            className="w-full rounded-full border border-gray-700 bg-gray-800 px-5 py-3 pr-10 text-white focus:outline-none"
            placeholder="Buscar en Google o escribir una URL"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
        <div className="mt-8 grid grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
                <span className="text-lg font-bold text-white">{String.fromCharCode(64 + i)}</span>
              </div>
              <span className="text-sm text-gray-300">Acceso directo {i}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  facebook: {
    url: "https://facebook.com",
    title: "Facebook",
    content: (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between bg-blue-600 px-4 py-2">
          <div className="text-2xl font-bold text-white">facebook</div>
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-white" />
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="w-64 border-r border-gray-700 p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              <div className="font-medium text-white">Usuario de AndrOS</div>
            </div>
            <div className="space-y-2">
              {["Noticias", "Amigos", "Grupos", "Marketplace", "Watch", "Recuerdos", "Guardados", "Páginas"].map(
                (item) => (
                  <div key={item} className="cursor-pointer rounded-md px-2 py-2 hover:bg-gray-700">
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="mx-auto max-w-md space-y-4">
              <div className="rounded-lg bg-gray-800 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div className="font-medium text-white">Juan Pérez</div>
                    <div className="text-xs text-gray-400">Hace 2 horas</div>
                  </div>
                </div>
                <p className="mb-3 text-gray-200">
                  ¡Increíble día en la playa! El clima estuvo perfecto. #verano #playa #vacaciones
                </p>
                <div className="h-48 rounded-md bg-blue-900"></div>
              </div>

              <div className="rounded-lg bg-gray-800 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div className="font-medium text-white">María García</div>
                    <div className="text-xs text-gray-400">Hace 5 horas</div>
                  </div>
                </div>
                <p className="text-gray-200">
                  Acabo de terminar mi nuevo proyecto. ¡Estoy muy emocionada de compartirlo con todos ustedes pronto!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  instagram: {
    url: "https://instagram.com",
    title: "Instagram",
    content: (
      <div className="flex h-full flex-col">
        <div className="border-b border-gray-700 px-4 py-3">
          <div className="text-xl font-bold text-white">Instagram</div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="mx-auto max-w-md">
            <div className="mb-4 flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-yellow-500 to-pink-600 p-0.5">
                    <div className="h-full w-full rounded-full border-2 border-black bg-gray-300"></div>
                  </div>
                  <span className="mt-1 text-xs text-gray-300">historia_{i}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((post) => (
                <div key={post} className="rounded-md bg-gray-800">
                  <div className="flex items-center justify-between border-b border-gray-700 p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                      <div className="font-medium text-white">usuario_{post}</div>
                    </div>
                    <div className="text-gray-400">•••</div>
                  </div>
                  <div className="aspect-square bg-gray-700"></div>
                  <div className="p-3">
                    <div className="mb-2 flex gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </div>
                    <div className="mb-1 font-medium text-white">1,234 Me gusta</div>
                    <div className="text-sm">
                      <span className="font-medium text-white">usuario_{post}</span>{" "}
                      <span className="text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. #andros #simulador
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  youtube: {
    url: "https://youtube.com",
    title: "YouTube",
    content: (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between bg-gray-900 px-4 py-2">
          <div className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded bg-red-600"></div>
            <div className="text-xl font-bold text-white">YouTube</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-96">
              <input
                type="text"
                className="w-full rounded-full border border-gray-700 bg-gray-800 px-4 py-1 pr-10 text-white"
                placeholder="Buscar"
              />
              <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="w-56 border-r border-gray-700 p-4">
            <div className="space-y-2">
              {[
                "Inicio",
                "Explorar",
                "Shorts",
                "Suscripciones",
                "Biblioteca",
                "Historial",
                "Tus videos",
                "Ver más tarde",
              ].map((item) => (
                <div key={item} className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((video) => (
                <div key={video} className="cursor-pointer">
                  <div className="aspect-video rounded-md bg-gray-700"></div>
                  <div className="mt-2 flex gap-2">
                    <div className="h-9 w-9 rounded-full bg-gray-300"></div>
                    <div>
                      <div className="font-medium text-white">Video de ejemplo #{video}</div>
                      <div className="text-xs text-gray-400">Canal {video} • 100K vistas • hace 2 días</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  twitter: {
    url: "https://twitter.com",
    title: "Twitter",
    content: (
      <div className="flex h-full flex-col">
        <div className="border-b border-gray-700 px-4 py-3">
          <div className="text-xl font-bold text-white">Twitter</div>
        </div>
        <div className="flex flex-1">
          <div className="w-64 border-r border-gray-700 p-4">
            <div className="space-y-4">
              {["Inicio", "Explorar", "Notificaciones", "Mensajes", "Guardados", "Listas", "Perfil", "Más"].map(
                (item) => (
                  <div key={item} className="cursor-pointer text-lg font-medium text-white">
                    {item}
                  </div>
                ),
              )}
              <button className="w-full rounded-full bg-blue-500 py-3 font-bold text-white">Twittear</button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <div className="border-b border-gray-700 p-4">
              <div className="mb-2 text-xl font-bold text-white">Inicio</div>
              <div className="flex">
                <div className="flex-1 border-b-2 border-blue-500 py-3 text-center font-medium text-blue-500">
                  Para ti
                </div>
                <div className="flex-1 py-3 text-center font-medium text-gray-400">Siguiendo</div>
              </div>
            </div>

            <div className="space-y-0">
              {[1, 2, 3, 4, 5].map((tweet) => (
                <div key={tweet} className="border-b border-gray-700 p-4">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-300"></div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-white">Usuario {tweet}</span>
                        <span className="text-gray-400">@usuario{tweet}</span>
                        <span className="text-gray-400">• 2h</span>
                      </div>
                      <p className="text-white">
                        Este es un tweet de ejemplo #{tweet}. ¡Bienvenido a Twitter en AndrOS! #simulador #web
                      </p>
                      <div className="mt-3 flex justify-between text-gray-400">
                        <div>💬 10</div>
                        <div>🔄 5</div>
                        <div>❤️ 25</div>
                        <div>📊</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-72 border-l border-gray-700 p-4">
            <div className="rounded-xl bg-gray-800 p-4">
              <div className="mb-3 text-xl font-bold text-white">Qué está pasando</div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((trend) => (
                  <div key={trend}>
                    <div className="text-xs text-gray-400">Tendencia #{trend}</div>
                    <div className="font-bold text-white">Tema Tendencia {trend}</div>
                    <div className="text-xs text-gray-400">10.{trend}K Tweets</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
}

export default function BrowserApp() {
  const [url, setUrl] = useState("https://andros.example.com")
  const [currentPage, setCurrentPage] = useState("home")
  const [history, setHistory] = useState<string[]>(["home"])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [tabs, setTabs] = useState([{ id: 1, page: "home" }])
  const [activeTab, setActiveTab] = useState(1)
  const [bookmarks, setBookmarks] = useState<string[]>([])

  const navigateTo = (page: string) => {
    const pageUrl = webPages[page]?.url || url
    setUrl(pageUrl)
    setCurrentPage(page)

    // Actualizar historial
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(page)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    // Actualizar pestaña activa
    setTabs(tabs.map((tab) => (tab.id === activeTab ? { ...tab, page } : tab)))
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const prevPage = history[newIndex]
      setHistoryIndex(newIndex)
      setCurrentPage(prevPage)
      setUrl(webPages[prevPage]?.url || url)

      // Actualizar pestaña activa
      setTabs(tabs.map((tab) => (tab.id === activeTab ? { ...tab, page: prevPage } : tab)))
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      const nextPage = history[newIndex]
      setHistoryIndex(newIndex)
      setCurrentPage(nextPage)
      setUrl(webPages[nextPage]?.url || url)

      // Actualizar pestaña activa
      setTabs(tabs.map((tab) => (tab.id === activeTab ? { ...tab, page: nextPage } : tab)))
    }
  }

  const addTab = () => {
    const newTabId = tabs.length > 0 ? Math.max(...tabs.map((t) => t.id)) + 1 : 1
    setTabs([...tabs, { id: newTabId, page: "home" }])
    setActiveTab(newTabId)
    setCurrentPage("home")
    setUrl(webPages.home.url)
    setHistory(["home"])
    setHistoryIndex(0)
  }

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (tabs.length === 1) {
      // No cerrar la última pestaña
      return
    }

    const newTabs = tabs.filter((tab) => tab.id !== id)
    setTabs(newTabs)

    // Si cerramos la pestaña activa, activar otra
    if (activeTab === id) {
      const newActiveTab = newTabs[0].id
      setActiveTab(newActiveTab)
      const newActivePage = newTabs[0].page
      setCurrentPage(newActivePage)
      setUrl(webPages[newActivePage]?.url || url)
    }
  }

  const switchTab = (id: number) => {
    setActiveTab(id)
    const tab = tabs.find((t) => t.id === id)
    if (tab) {
      setCurrentPage(tab.page)
      setUrl(webPages[tab.page]?.url || url)
    }
  }

  const toggleBookmark = () => {
    if (bookmarks.includes(currentPage)) {
      setBookmarks(bookmarks.filter((b) => b !== currentPage))
    } else {
      setBookmarks([...bookmarks, currentPage])
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Determinar a qué página navegar basado en la URL
    let targetPage = "home"

    if (url.includes("google.com")) targetPage = "google"
    else if (url.includes("facebook.com")) targetPage = "facebook"
    else if (url.includes("instagram.com")) targetPage = "instagram"
    else if (url.includes("youtube.com")) targetPage = "youtube"
    else if (url.includes("twitter.com")) targetPage = "twitter"
    else if (url.includes("andros.example.com")) targetPage = "home"

    navigateTo(targetPage)
  }

  return (
    <div className="flex h-full flex-col text-gray-200">
      {/* Pestañas */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            className={`flex items-center gap-2 border-r border-gray-700 px-3 py-1 ${
              activeTab === tab.id ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <span className="max-w-32 truncate text-sm">{webPages[tab.page]?.title || "Nueva pestaña"}</span>
            <button onClick={(e) => closeTab(tab.id, e)} className="ml-1 rounded-full p-0.5 hover:bg-gray-600">
              ✕
            </button>
          </div>
        ))}
        <button onClick={addTab} className="px-3 py-1 hover:bg-gray-700">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Barra de navegación */}
      <div className="flex items-center gap-2 bg-gray-800 p-1">
        <button
          className={`rounded p-1 ${historyIndex > 0 ? "hover:bg-gray-700" : "opacity-50"}`}
          onClick={goBack}
          disabled={historyIndex <= 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          className={`rounded p-1 ${historyIndex < history.length - 1 ? "hover:bg-gray-700" : "opacity-50"}`}
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <button className="rounded p-1 hover:bg-gray-700" onClick={() => navigateTo(currentPage)}>
          <RefreshCw className="h-4 w-4" />
        </button>
        <button className="rounded p-1 hover:bg-gray-700" onClick={() => navigateTo("home")}>
          <Home className="h-4 w-4" />
        </button>

        <form className="relative flex-1" onSubmit={handleUrlSubmit}>
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="w-full rounded bg-gray-700 py-1 pl-8 pr-8 text-sm text-white"
          />
          <button type="button" onClick={toggleBookmark} className="absolute right-2 top-1/2 -translate-y-1/2">
            <Star
              className={`h-4 w-4 ${bookmarks.includes(currentPage) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
            />
          </button>
        </form>
      </div>

      {/* Contenido de la página */}
      <div className="mt-2 flex-1 overflow-auto rounded bg-gray-800 p-4">
        {webPages[currentPage]?.content || (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="text-2xl font-bold">Página no encontrada</div>
            <p className="mt-2 text-gray-400">La URL que has introducido no existe en este simulador.</p>
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
              onClick={() => navigateTo("home")}
            >
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
