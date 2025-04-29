"use client"

import { useState } from "react"
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Repeat, Shuffle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

type Song = {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  cover: string
}

export default function SpotifyApp() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [volume, setVolume] = useState<number>(70)
  const [progress, setProgress] = useState<number>(0)
  const [liked, setLiked] = useState<Set<string>>(new Set())

  const playlists = [
    { id: "1", name: "Mis favoritos", count: 23 },
    { id: "2", name: "Descubrimiento semanal", count: 30 },
    { id: "3", name: "Top 50 - Global", count: 50 },
    { id: "4", name: "Éxitos de hoy", count: 40 },
    { id: "5", name: "Música para programar", count: 35 },
  ]

  const songs: Song[] = [
    {
      id: "1",
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: "5:55",
      cover: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "2",
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      duration: "3:01",
      cover: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "3",
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      duration: "4:54",
      cover: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "4",
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      album: "Nevermind",
      duration: "5:01",
      cover: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "5",
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      duration: "5:56",
      cover: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "6",
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      duration: "6:30",
      cover: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "7",
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: "8:02",
      cover: "/placeholder.svg?height=60&width=60",
    },
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
    setProgress(0)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0])
  }

  const toggleLike = (songId: string) => {
    const newLiked = new Set(liked)
    if (newLiked.has(songId)) {
      newLiked.delete(songId)
    } else {
      newLiked.add(songId)
    }
    setLiked(newLiked)
  }

  return (
    <div className="flex h-full flex-col bg-black text-white">
      <div className="flex flex-1">
        <div className="w-56 bg-black p-4">
          <div className="mb-6">
            <h2 className="mb-2 text-sm font-bold text-gray-400">BIBLIOTECA</h2>
            <div className="grid gap-2">
              <button className="flex items-center gap-3 rounded px-2 py-1 text-left text-sm hover:bg-white/10">
                <Clock className="h-4 w-4" />
                Recientes
              </button>
              <button className="flex items-center gap-3 rounded px-2 py-1 text-left text-sm hover:bg-white/10">
                <Heart className="h-4 w-4" />
                Favoritos
              </button>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-bold text-gray-400">PLAYLISTS</h2>
            <div className="grid gap-2">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  className="flex items-center justify-between rounded px-2 py-1 text-left text-sm hover:bg-white/10"
                >
                  <span>{playlist.name}</span>
                  <span className="text-xs text-gray-400">{playlist.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gradient-to-b from-purple-900/50 to-black p-4">
          <h1 className="mb-4 text-2xl font-bold">Música para ti</h1>

          <div className="mb-4 overflow-hidden rounded-md bg-white/5 p-4">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md bg-purple-900/30">
                <img
                  src="/placeholder.svg?height=160&width=160"
                  alt="Playlist cover"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-medium uppercase text-gray-400">Playlist</div>
                <h2 className="text-5xl font-bold">Descubrimiento semanal</h2>
                <p className="mt-2 text-sm text-gray-400">
                  Tu mezcla semanal de música nueva y recomendaciones personalizadas.
                </p>
                <div className="mt-4 text-sm text-gray-400">
                  <span>Creado por Spotify • 30 canciones, 1 h 45 min</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button className="h-10 w-10 rounded-full bg-green-500 p-0 hover:bg-green-600" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-md bg-white/5">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-gray-400">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">TÍTULO</th>
                  <th className="px-4 py-2">ÁLBUM</th>
                  <th className="px-4 py-2 text-right">
                    <Clock className="h-4 w-4" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, index) => (
                  <tr
                    key={song.id}
                    className={`hover:bg-white/10 ${currentSong?.id === song.id ? "bg-white/20" : ""}`}
                    onClick={() => handleSongSelect(song)}
                  >
                    <td className="px-4 py-2 text-gray-400">{index + 1}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <img src={song.cover || "/placeholder.svg"} alt={song.title} className="h-10 w-10 rounded" />
                        <div>
                          <div className={`font-medium ${currentSong?.id === song.id ? "text-green-500" : ""}`}>
                            {song.title}
                          </div>
                          <div className="text-sm text-gray-400">{song.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-gray-400">{song.album}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(song.id)
                          }}
                        >
                          <Heart className={`h-4 w-4 ${liked.has(song.id) ? "fill-green-500 text-green-500" : ""}`} />
                        </Button>
                        <span>{song.duration}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Player bar */}
      <div className="flex h-20 items-center justify-between border-t border-white/10 bg-black/90 px-4">
        {currentSong ? (
          <div className="flex w-1/4 items-center gap-3">
            <img src={currentSong.cover || "/placeholder.svg"} alt={currentSong.title} className="h-14 w-14" />
            <div>
              <div className="text-sm font-medium">{currentSong.title}</div>
              <div className="text-xs text-gray-400">{currentSong.artist}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
              onClick={() => toggleLike(currentSong.id)}
            >
              <Heart className={`h-4 w-4 ${liked.has(currentSong.id) ? "fill-green-500 text-green-500" : ""}`} />
            </Button>
          </div>
        ) : (
          <div className="w-1/4"></div>
        )}

        <div className="flex w-2/4 flex-col items-center">
          <div className="mb-2 flex items-center gap-4">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              className="h-8 w-8 rounded-full bg-white p-0 text-black hover:bg-gray-200"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex w-full items-center gap-2">
            <span className="text-xs text-gray-400">
              {Math.floor(progress / 60)}:{(progress % 60).toString().padStart(2, "0")}
            </span>
            <Slider
              value={[progress]}
              max={
                currentSong
                  ? Number.parseInt(currentSong.duration.split(":")[0]) * 60 +
                    Number.parseInt(currentSong.duration.split(":")[1])
                  : 100
              }
              step={1}
              onValueChange={handleProgressChange}
              className="flex-1"
            />
            <span className="text-xs text-gray-400">{currentSong?.duration || "0:00"}</span>
          </div>
        </div>

        <div className="flex w-1/4 items-center justify-end gap-2">
          <Volume2 className="h-4 w-4 text-gray-400" />
          <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="w-24" />
        </div>
      </div>
    </div>
  )
}
