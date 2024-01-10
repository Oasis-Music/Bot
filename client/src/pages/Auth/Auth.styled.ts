import styled from 'styled-components'
import Button from '@/shared/Button'
import patternImg from '@/assets/rastr/strawberry-pattern.jpeg'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background-image: url(${patternImg});
  height: 100vh;
  display: flex;
  color: #fff;
  flex-direction: column;
`

export const MainBox = styled.div`
  box-sizing: border-box;
  margin-top: auto;
  background-color: #03141d;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-top: 2px solid #c01037;
  padding: 6vh 20px 4vh 20px;
`

export const HeadTitle = styled.h1`
  padding-left: 3px;
  font-size: 3.5vh;
  margin: 0;
  display: flex;
  align-items: center;
  margin-bottom: 5vh;
  margin-left: 10px;
  text-align: start;
`

export const EmojiImg = styled.img`
  width: 30px;
  margin-left: 5px;
`

export const SubmitBotton = styled(Button)`
  width: 100%;
  max-width: 240px;
  outline: none;
  display: block;
  margin: 0 auto;
  margin-bottom: 7px;
`

export const ErrorMessage = styled.p<{ $err: boolean }>`
  height: 15px;
  font-size: 14px;
  margin: 0;
  text-align: center;
  color: #ff182e;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ $err }) => ($err ? 1 : 0)};
`

export const TermsTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 4vh;
  margin-top: 1vh;
  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const ReportLink = styled(Link)`
  display: block;
  text-align: center;
  outline: none;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
  text-decoration: underline;
  -webkit-tap-highlight-color: transparent;
  &:active {
    color: ${({ theme }) => theme.colors.primary};
  }
`
