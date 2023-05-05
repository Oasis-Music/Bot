import { Link, NavLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

export const Container = styled.nav`
  z-index: 400;
  position: relative;
  background-color: #070c13;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BaseLink = styled(NavLink)`
  display: inline-flex;
  user-select: none;
  background: none;
  color: #aeaeae;
  font-size: 3vh;
  padding: 2.7vh;
  transition: color 0.2s;
  @media ${({ theme }) => theme.media.hxs} {
    font-size: 17px;
    padding: 15px;
  }
  &.active {
    color: #fff;
  }
`

const spinBorder = keyframes`
 100% {
    transform: rotate(360deg);
  }
`

export const UploadTrackLink = styled(Link)`
  cursor: pointer;
  user-select: none;
  position: relative;
  box-sizing: border-box;
  z-index: 0;
  height: 40px;
  overflow: hidden;
  border: none !important;
  padding: 0;
  background: #00e5ff !important;
  color: #fff;
  background: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 145px;
  text-align: center;
  font-size: 2.5vh;
  font-weight: 500;
  box-shadow: 0 4px 50px 0 rgb(0 0 0 / 7%);
  transition: all 0.2s linear;
  text-decoration: none;
  & span {
    position: relative;
    z-index: 1;
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    top: 2px;
    left: 2px;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 8px;
    color: white;
    background: #0f1524;
  }
  &::after {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${spinBorder} 2s linear infinite;
  }

  @media ${({ theme }) => theme.media.hxs} {
    font-size: 2vh;
  }
`
