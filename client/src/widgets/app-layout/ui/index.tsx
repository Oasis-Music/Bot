import { useState, useEffect, useRef } from 'react'
import Player from '@/widgets/player'
import AudioPlayer from '@/player'
import { NavBar } from '@/widgets/navigation'
import { MiniPlayer } from '@/widgets/mini-player'
import { timeFormater } from '@/shared/lib/helpers'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { Outlet } from 'react-router-dom'
import { usePlayPauseTrack } from '@/features/soundtrack/play-pause'
import { usePlayNextTrack } from '@/features/soundtrack/play-next'
import { usePlayPrevTrack } from '@/features/soundtrack/play-prev'

import styles from './styles.module.scss'

export function AppLayout() {
  const track = useReactiveVar(currentTrackVar)

  const playerRef = useRef<AudioPlayer | null>(null)

  const waveContainerRef = useRef<HTMLDivElement>(null)
  const [isPlayerOpen, setPlayerOpen] = useState<boolean>(false)
  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [loop, setLoop] = useState<boolean>(false)
  const [random, setRandom] = useState<boolean>(false)

  const playNext = usePlayNextTrack()
  const playPrev = usePlayPrevTrack()

  const playPause = usePlayPauseTrack()

  useEffect(() => {
    if (waveContainerRef.current) {
      const pl = new AudioPlayer({
        node: waveContainerRef.current as HTMLElement
      })

      pl.onLoad(() => {
        setReadyForPlay(true)
        setCurrentTime(timeFormater(pl.getCurrentTime()))
        pl.play()
      })

      pl.onAudioProcess(() => {
        setCurrentTime(timeFormater(pl.getCurrentTime()))
      })

      pl.onSeek(() => {
        setCurrentTime(timeFormater(pl.getCurrentTime()))
      })

      pl.onEnd(() => {
        if (pl.getLoop()) {
          pl.seekTo(0)
          return
        }
        playNextHadler()
      })

      playerRef.current = pl

      return () => {
        pl.clean()
      }
    }
  }, [])

  const playNextHadler = () => {
    playNext()
  }

  const playPrevHandler = () => {
    playPrev()
  }

  useEffect(() => {
    if (playerRef.current) {
      if (track.audioURL) {
        setCurrentTime('0:00')
        playerRef.current.redrawTrackline()
        playerRef.current.load(track.audioURL)
      }
    }
  }, [track.audioURL])

  const handlePlayerOpen = () => {
    document.body.style.overflow = 'hidden'
    setPlayerOpen(true)
  }
  const handlePlayerClose = () => {
    document.body.style.overflow = 'visible'
    setPlayerOpen(false)
  }

  const playPauseHandler = () => {
    playPause()

    if (playerRef.current) {
      playerRef.current.playPause()
    }
  }

  const handleLoopState = () => {
    setLoop((prev) => {
      if (playerRef.current) {
        playerRef.current.setLoop(!prev)
      }
      return !prev
    })
  }

  const handleRandomState = () => {
    setRandom((prev) => !prev)
  }

  return (
    <div className={styles.container}>
      <main>
        <Outlet />
      </main>
      <div className={styles.wrapper}>
        <MiniPlayer onPlayerOpen={handlePlayerOpen} onPlayPause={playPauseHandler} />
        <NavBar />
      </div>
      <Player
        ref={waveContainerRef}
        currentTime={currentTime}
        isOpen={isPlayerOpen}
        onClose={handlePlayerClose}
        isReadyForPlay={readyForPlay}
        withLoop={loop}
        withRandom={random}
        onPlayPause={playPauseHandler}
        onPlayNext={playNextHadler}
        onPlayPrev={playPrevHandler}
        onLoop={handleLoopState}
        onRandom={handleRandomState}
      />
    </div>
  )
}
