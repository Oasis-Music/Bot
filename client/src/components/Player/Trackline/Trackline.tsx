import React, { useState, useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'
import Controls from './Controls/Controls'
import { Container, WaveWrapper, TimeBox } from './Trackline.styled'
import { timeFormater } from '../../../utils/helpers'
import { useReactiveVar } from '@apollo/client'
import { isPlayingVar } from '../../../apollo/cache/variables'
import { SoundtrackMutations } from '../../../apollo/cache/mutations'

interface TracklineProps {
  soundtrack: string
}

const Trackline: React.FC<TracklineProps> = ({ soundtrack }) => {
  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [loop, setLoop] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [duration, setDuration] = useState<string>('0:00')

  const isPlay = useReactiveVar(isPlayingVar)

  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()

  useEffect(() => {
    const obj = WaveSurfer.create({
      mediaType: 'audio',
      container: '#waveform',
      barWidth: 2,
      barRadius: 4,
      cursorWidth: 1,
      backend: 'WebAudio',
      height: 30,
      progressColor: '#dbdbdb',
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
      obj.play()
    })

    obj.on('audioprocess', function () {
      setCurrentTime(timeFormater(obj.getCurrentTime()))
    })

    setWavesurfer(obj)

    return () => {
      obj.destroy()
    }
  }, [soundtrack])

  const buttonHandler = () => {
    SoundtrackMutations.playPouse()
    if (wavesurfer) {
      wavesurfer.playPause()
    }
  }

  const loopButtonHandler = () => {
    setLoop(!loop)
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
      <Controls
        isPlay={isPlay}
        readyForPlay={readyForPlay}
        isLoop={loop}
        onPlayPause={buttonHandler}
        onLoop={loopButtonHandler}
      />
    </Container>
  )
}

export default Trackline
