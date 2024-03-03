import { useState, useEffect, useRef } from 'react'
import Player from '@/widgets/player'
import AudioPlayer from '@/player'
import { NavBar } from '@/widgets/navigation'
import { MiniPlayer } from '@/widgets/mini-player'
import { timeFormater } from '@/shared/lib/helpers'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { Outlet, useLocation } from 'react-router-dom'
import { usePlayPauseTrack } from '@/features/soundtrack/play-pause'
import { usePlayNextTrack } from '@/features/soundtrack/play-next'
import { usePlayPrevTrack } from '@/features/soundtrack/play-prev'

import styles from './styles.module.scss'

export function AppLayout() {
  const track = useReactiveVar(currentTrackVar)
  const location = useLocation()

  const [player, setPlayer] = useState<AudioPlayer>()
  const [isPlayerOpen, setPlayerOpen] = useState<boolean>(false)
  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [loop, setLoop] = useState<boolean>(false)
  const [random, setRandom] = useState<boolean>(false)

  const playNext = usePlayNextTrack()
  const playPrev = usePlayPrevTrack()

  const playPause = usePlayPauseTrack()

  const waveContainerRef = useRef<HTMLDivElement>(null)

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

      setPlayer(pl)

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
    if (player) {
      if (track && track.audioURL) {
        // console.log('load')
        setCurrentTime('0:00')
        player.redrawTrackline()
        player.load(track.audioURL)
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

    if (player) {
      player.playPause()
    }
  }

  const handleLoopState = () => {
    setLoop((prev) => {
      if (player) {
        player.setLoop(!prev)
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
      {location.pathname !== '/upload' && (
        <div className={styles.wrapper}>
          <MiniPlayer onPlayerOpen={handlePlayerOpen} onPlayPause={playPauseHandler} />
          <NavBar />
        </div>
      )}
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
