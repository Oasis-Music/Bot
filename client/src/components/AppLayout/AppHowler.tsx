import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import MiniPlayer from '../MiniPlayer/MiniPlayer'
import Nav from '../Nav/Nav'
import Player from '../Player'
import { timeFormater } from '../../utils/helpers'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../apollo/cache/variables'
import { Outlet, useLocation } from 'react-router-dom'
import { SoundtrackMutations, UserMutations } from '../../apollo/cache/mutations'
import AudioPlayer from './player'

const Box = styled.div`
  position: relative;
`

export const Wrapper = styled.div`
  width: 100%;
  left: 0;
  position: fixed;
  bottom: 0;
`

const AppLayout: React.FC = () => {
  const track = useReactiveVar(currentTrackVar)
  const location = useLocation()

  const [player, setPlayer] = useState<AudioPlayer>()
  const [isPlayerOpen, setPlayerOpen] = useState<boolean>(false)
  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [loop, setLoop] = useState<boolean>(false)
  const [random, setRandom] = useState<boolean>(false)

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (player) return
    if (node !== null) {
      const pl = new AudioPlayer({
        src: '',
        node: node
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
    }
  }, [])

  const playNextHadler = () => {
    UserMutations.playNext()
  }

  const playPrevHandler = () => {
    UserMutations.playPrev()
  }

  //   useEffect(() => {
  //     return () => {}
  //   }, [])

  useEffect(() => {
    if (player) {
      if (track.audioURL) {
        console.log('load')
        setCurrentTime('0:00')
        player.load(track.audioURL)
      }
    }
  }, [track.audioURL])

  const handlePlayerOpen = () => {
    setPlayerOpen(true)
  }
  const handlePlayerClose = () => {
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
        ref={containerRef}
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
    </Box>
  )
}

export default AppLayout
