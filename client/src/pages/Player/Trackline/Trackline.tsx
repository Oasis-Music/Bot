import React, { useState, useEffect } from 'react'
import soundtrack from './track.mp3'
import WaveSurfer from 'wavesurfer.js'
import Controls from './Controls/Controls'
import { Container, WaveWrapper, TimeBox } from './Trackline.styled'

function timeFormater(value: number): string {
  const sec = String(Math.floor(value % 60))
  const min = String(Math.floor(value / 60))

  return min.padStart(1, '0') + ':' + sec.padStart(2, '0')
}

const Trackline: React.FC = () => {
  const [play, setPlay] = useState<boolean>(false)
  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [duration, setDuration] = useState<string>('0:00')

  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()

  useEffect(() => {
    const obj = WaveSurfer.create({
      mediaType: 'audio',
      container: '#waveform',
      barWidth: 3,
      barRadius: 4,
      cursorWidth: 1,
      backend: 'WebAudio',
      height: 30,
      progressColor: '#dbdbdb',
      responsive: true,
      waveColor: '#575763',
      cursorColor: 'transparent'
    })

    fetch(soundtrack)
      .then((response) => response.blob())
      .then((data) => {
        obj.loadBlob(data)
      })

    obj.on('ready', function () {
      setDuration(timeFormater(obj.getDuration()))
      setReadyForPlay(true)
    })
    obj.on('audioprocess', function () {
      setCurrentTime(timeFormater(obj.getCurrentTime()))
    })

    setWavesurfer(obj)

    return () => {
      obj.destroy()
    }
  }, [])

  const buttonHandler = () => {
    setPlay(!play)
    if (wavesurfer) {
      wavesurfer.playPause()
    }
  }

  return (
    <Container>
      <WaveWrapper>
        <div id="waveform" />
      </WaveWrapper>
      <TimeBox>
        <span>{currentTime}</span>
        <span>{duration}</span>
      </TimeBox>
      <Controls isPlay={play} onPlayPause={buttonHandler} />
    </Container>
  )
}

export default Trackline
