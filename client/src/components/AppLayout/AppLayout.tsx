import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import WaveSurfer from 'wavesurfer.js'
import styled from 'styled-components'
import MiniPlayer from '../MiniPlayer/MiniPlayer'
import Nav from '../Nav/Nav'
import Player from '../Player'
import { timeFormater } from '../../utils/helpers'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../apollo/cache/variables'
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
  const [isPlayerOpen, setPlayerOpen] = useState<boolean>(false)
  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [duration, setDuration] = useState<string>('0:00')

  const wavesurfer = useRef<WaveSurfer | null>(null)
  const waveContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (waveContainerRef.current) {
      wavesurfer.current = WaveSurfer.create({
        mediaType: 'audio',
        container: waveContainerRef.current,
        barWidth: 2,
        barRadius: 4,
        cursorWidth: 1,
        backend: 'WebAudio',
        height: 30,

        progressColor: '#dbdbdb',
        waveColor: '#575763',
        cursorColor: 'transparent'
      })

      if (wavesurfer.current) {
        if (track.audioURL) {
          fetch(track.audioURL)
            .then((response) => response.blob())
            .then((data) => {
              wavesurfer.current?.loadBlob(data)
            })
            .catch((e) => {
              console.log(e)
            })
        }

        wavesurfer.current.on('ready', function () {
          setDuration(timeFormater(wavesurfer.current?.getDuration() || 0))
          setReadyForPlay(true)
          wavesurfer.current?.play()
        })

        wavesurfer.current.on('audioprocess', function () {
          setCurrentTime(timeFormater(wavesurfer.current?.getCurrentTime() || 0))
        })
      }
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
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
    if (wavesurfer.current) {
      wavesurfer.current.playPause()
    }
  }

  const playNextHadler = () => {
    if (wavesurfer.current) {
      UserMutations.playNext()
    }
  }

  const playPrevHandler = () => {
    if (wavesurfer.current) {
      UserMutations.playPrev()
    }
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
        duration={duration}
        isOpen={isPlayerOpen}
        onClose={handlePlayerClose}
        isReadyForPlay={readyForPlay}
        onPlayPause={playPauseHandler}
        onPlayNext={playNextHadler}
        onPlayPrev={playPrevHandler}
      />
    </Box>
  )
}

export default AppLayout
