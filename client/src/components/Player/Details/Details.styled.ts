import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 2.5vh;
  @media ${({ theme }) => theme.media.hxs} {
    padding-top: 47px;
  }
`

export const ImageWrapper = styled.div`
  border-radius: 15px;
  max-width: 35vh;
  margin: 0 auto;
  box-shadow: 0 0 0px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.45),
    0 0 10px rgba(255, 255, 255, 0.25), 0 0 70px rgba(255, 255, 255, 0.1);
  @media ${({ theme }) => theme.media.hxs} {
    max-width: 270px;
  }
`

export const Title = styled.h1`
  font-size: 4vh;
  font-weight: 500;
  text-align: center;
  color: #fff;
  line-height: 18px;
  display: block;
  clear: both;
  margin-bottom: 15px;
  margin-top: 5.5vh;
  white-space: normal;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  &:hover,
  &:focus {
    outline: none;
  }

  @media ${({ theme }) => theme.media.hxs} {
    margin-top: 40px;
    font-size: 25px;
  }
`

export const Author = styled.p`
  color: #939393;
  font-weight: 500;
  font-size: 2.8vh;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
  @media ${({ theme }) => theme.media.hxs} {
    font-size: 15px;
  }
`
