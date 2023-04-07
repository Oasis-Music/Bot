import React, { useState, useEffect, useCallback } from 'react'
import WaveSurfer from 'wavesurfer.js'
import styled from 'styled-components'
import MiniPlayer from '../MiniPlayer/MiniPlayer'
import Nav from '../Nav/Nav'
import Player from '../Player'
import { timeFormater } from '../../utils/helpers'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../apollo/cache/variables'
import { Outlet, useLocation } from 'react-router-dom'
import { SoundtrackMutations, UserMutations } from '../../apollo/cache/mutations'

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

  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
  const [isPlayerOpen, setPlayerOpen] = useState<boolean>(false)
  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [loop, setLoop] = useState(false)

  const containerRef = useCallback(
    (node: HTMLDivElement) => {
      if (wavesurfer) return
      if (node !== null) {
        const ws = WaveSurfer.create({
          mediaType: 'audio',
          container: node,
          barWidth: 3,
          barRadius: 4,
          barGap: 5,
          cursorWidth: 1,
          backend: 'WebAudio',
          height: 30,
          progressColor: '#dbdbdb',
          waveColor: '#575763',
          cursorColor: 'transparent'
        })

        // static events
        ws.on('ready', function () {
          setReadyForPlay(true)
          ws.play()
        })

        ws.on('audioprocess', function () {
          setCurrentTime(timeFormater(ws.getCurrentTime() || 0))
        })

        setWavesurfer(ws)
      }
    },
    [wavesurfer]
  )

  const playNextHadler = () => {
    UserMutations.playNext()
  }

  const playPrevHandler = () => {
    UserMutations.playPrev()
  }

  useEffect(() => {
    return () => {
      if (wavesurfer) {
        wavesurfer.destroy()
      }
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (wavesurfer) {
      if (track.audioURL) {
        console.log('load')
        setCurrentTime('0:00')

        wavesurfer.empty()

        fetch(track.audioURL, {
          signal: signal,
          method: 'GET'
        })
          .then((response) => response.blob())
          .then((data) => {
            wavesurfer.loadBlob(data)
          })
          .catch((e) => {
            // TODO: handle it
            console.log(e)
          })
      }
    }

    return () => {
      abortController.abort()
    }
  }, [track.audioURL])

  const handleFinishPlay = () => {
    if (wavesurfer) {
      if (loop) {
        wavesurfer.play(0)
        return
      }
      playNextHadler()
    }
  }

  useEffect(() => {
    // registry of dynamic wavesurfer events

    if (wavesurfer) {
      wavesurfer.on('finish', handleFinishPlay)
    }

    return () => {
      if (wavesurfer) {
        wavesurfer.un('finish', handleFinishPlay)
      }
    }
  }, [loop, wavesurfer])

  const handlePlayerOpen = () => {
    setPlayerOpen(true)
  }
  const handlePlayerClose = () => {
    setPlayerOpen(false)
  }

  const playPauseHandler = () => {
    SoundtrackMutations.playPouse()
    if (wavesurfer) {
      wavesurfer.playPause()
    }
  }

  const handleLoopState = () => {
    setLoop((prev) => !prev)
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
        onPlayPause={playPauseHandler}
        onPlayNext={playNextHadler}
        onPlayPrev={playPrevHandler}
        onLoop={handleLoopState}
      />
    </Box>
  )
}

export default AppLayout
