import React from 'react'
import styled from 'styled-components'

interface LoaderStyledProps {
  $fallback: boolean
  $dark: boolean
}

const Loader = styled.svg<LoaderStyledProps>`
  display: block;
  width: ${({ $fallback }) => ($fallback ? 34 : 18)}px;
  height: ${({ $fallback }) => ($fallback ? 40 : 18)}px;
  & > rect {
    fill: ${({ $dark }) => ($dark ? '#343434' : '#fff')};
  }
`

interface LoaderProps {
  fallback?: boolean
  dark?: boolean
}

const ScaleLoader: React.FC<LoaderProps> = ({ fallback = false, dark = false }) => {
  return (
    <Loader
      $fallback={fallback}
      $dark={dark}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 30"
    >
      <rect x="0" y="13" width="4" height="5" fill="#333">
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="10" y="13" width="4" height="5" fill="#333">
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="20" y="13" width="4" height="5" fill="#333">
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </Loader>
  )
}

export default ScaleLoader
