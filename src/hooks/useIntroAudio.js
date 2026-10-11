import { useEffect, useRef, useState } from 'react'

/**
 * One owner for everything audio in the intro.
 * A real file at public/audio/intro.mp3 is the only thing that creates
 * controls; there is no fake or synthesized audio. A user gesture — the
 * "Sound On" toggle itself — is the first and only place playback starts.
 */
const AUDIO_SRC = '/audio/intro.mp3'

export default function useIntroAudio() {
  const [audioReady, setAudioReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const a = new Audio(AUDIO_SRC)
    a.loop = true
    a.preload = 'auto'
    a.volume = 0.55
    const onReady = () => setAudioReady(true)
    const onError = () => {
      audioRef.current = null
      setAudioReady(false)
    }
    a.addEventListener('canplaythrough', onReady, { once: true })
    a.addEventListener('error', onError, { once: true })
    audioRef.current = a
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  // The click is the gesture: start playback (if no file, this is a no-op).
  const soundOn = () => {
    const a = audioRef.current
    if (!a) return
    a.muted = false
    a.play().catch(() => {})
    setPlaying(true)
  }

  const mute = () => {
    const a = audioRef.current
    if (!a) return
    a.muted = true
    setPlaying(false)
  }

  return { audioReady, playing, soundOn, mute }
}
