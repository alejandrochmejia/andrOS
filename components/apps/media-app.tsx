"use client"

import { useState, useEffect } from "react"
import { Play, Pause, SkipForward, SkipBack, Volume2, ImageIcon, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSystem, type FileItem } from "@/components/system-context"

export default function MediaApp() {
  const { files, activeApp } = useSystem()
  const [activeTab, setActiveTab] = useState<string>("videos")
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(100)
  const [volume, setVolume] = useState<number>(80)
  const [selectedMedia, setSelectedMedia] = useState<FileItem | null>(null)

  const videos = files.filter((file) => file.type === "video")
  const images = files.filter((file) => file.type === "image")

  // Reiniciar el estado cuando se abre la aplicación
  useEffect(() => {
    if (activeApp === "media") {
      setActiveTab("videos")
      setSelectedMedia(null)
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [activeApp])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // En una implementación real, aquí controlaríamos la reproducción del video
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    // En una implementación real, aquí ajustaríamos el volumen del video
  }

  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0])
    // En una implementación real, aquí ajustaríamos el tiempo del video
  }

  const handleMediaSelect = (media: FileItem) => {
    setSelectedMedia(media)
    if (media.type === "video") {
      setIsPlaying(true)
      // Establecer duración basada en los metadatos
      if (media.metadata?.duration) {
        const [mins, secs] = media.metadata.duration.split(":").map(Number)
        setDuration(mins * 60 + secs)
      }
    }
  }

  return (
    <div className="flex h-full flex-col bg-gray-900 text-gray-200">
      <Tabs defaultValue="videos" className="flex flex-1 flex-col" onValueChange={setActiveTab}>
        <div className="border-b border-gray-700 px-4">
          <TabsList className="h-10 bg-gray-800">
            <TabsTrigger value="videos" className="data-[state=active]:bg-gray-700">
              <Film className="mr-2 h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="images" className="data-[state=active]:bg-gray-700">
              <ImageIcon className="mr-2 h-4 w-4" />
              Imágenes
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex flex-1">
          <div className="w-64 border-r border-gray-700 p-4">
            <TabsContent value="videos" className="m-0 h-full">
              <h3 className="mb-2 text-sm font-medium">Biblioteca de videos</h3>
              <div className="grid gap-2">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className={`cursor-pointer rounded-md p-1 hover:bg-gray-800 ${selectedMedia?.id === video.id ? "bg-gray-800" : ""}`}
                    onClick={() => handleMediaSelect(video)}
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
                      <img
                        src={video.metadata?.thumbnail || "/placeholder.svg?height=120&width=200"}
                        alt={video.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white opacity-80" />
                      </div>
                    </div>
                    <div className="mt-1 text-xs">{video.name}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="images" className="m-0 h-full">
              <h3 className="mb-2 text-sm font-medium">Biblioteca de imágenes</h3>
              <div className="grid gap-2">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className={`cursor-pointer rounded-md p-1 hover:bg-gray-800 ${selectedMedia?.id === image.id ? "bg-gray-800" : ""}`}
                    onClick={() => handleMediaSelect(image)}
                  >
                    <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
                      <img
                        src={image.metadata?.thumbnail || "/placeholder.svg?height=120&width=200"}
                        alt={image.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-1 text-xs">{image.name}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>

          <div className="flex flex-1 flex-col">
            {selectedMedia ? (
              <div className="flex flex-1 flex-col p-4">
                <div className="flex-1 flex items-center justify-center bg-black">
                  {selectedMedia.type === "video" ? (
                    <video
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
                      className="max-h-full max-w-full"
                      controls={false}
                      autoPlay={isPlaying}
                    />
                  ) : (
                    <img
                      src={selectedMedia.metadata?.thumbnail || "/placeholder.svg?height=400&width=600"}
                      alt={selectedMedia.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>

                {selectedMedia.type === "video" && (
                  <div className="mt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs">{formatTime(currentTime)}</span>
                      <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={handleTimeChange}
                        className="flex-1"
                      />
                      <span className="text-xs">{formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handlePlayPause}>
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        <Slider
                          value={[volume]}
                          max={100}
                          step={1}
                          onValueChange={handleVolumeChange}
                          className="w-24"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center text-gray-400">
                {activeTab === "videos" ? (
                  <div className="text-center">
                    <Film className="mx-auto mb-2 h-12 w-12" />
                    <p>Selecciona un video para reproducir</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto mb-2 h-12 w-12" />
                    <p>Selecciona una imagen para ver</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
