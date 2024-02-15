import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Nav } from '@/components/Nav'
import Player from '@/components/Player'
import { Snackbar } from '@/components/ui/Snackbar'
import { MiniPlayer } from '@/components/MiniPlayer'
import AudioPlayer from '@/player'
import { timeFormater } from '@/utils/helpers'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/apollo/cache/variables'
import { Outlet, useLocation } from 'react-router-dom'
import { SoundtrackMutations, UserMutations } from '@/apollo/cache/mutations'

const Box = styled.div`
  position: relative;
`

export const Wrapper = styled.div`
  width: 100%;
  left: 0;
  position: fixed;
  bottom: 0;
`

export function AppLayout() {
  const track = useReactiveVar(currentTrackVar)
  const location = useLocation()

  const [player, setPlayer] = useState<AudioPlayer>()
  const [isPlayerOpen, setPlayerOpen] = useState<boolean>(false)
  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [loop, setLoop] = useState<boolean>(false)
  const [random, setRandom] = useState<boolean>(false)

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
    UserMutations.playNext()
  }

  const playPrevHandler = () => {
    UserMutations.playPrev()
  }

  useEffect(() => {
    if (player) {
      if (track.audioURL) {
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
    SoundtrackMutations.playPouse()

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
    <Box>
      <main>
        <Outlet />
      </main>
      {location.pathname !== '/upload' && (
        <Wrapper>
          <MiniPlayer onPlayerOpen={handlePlayerOpen} onPlayPause={playPauseHandler} />
          <Nav />
        </Wrapper>
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
      <Snackbar />
    </Box>
  )
}
