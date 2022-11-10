import { createGlobalStyle } from 'styled-components'

export interface ITheme {
  colors: {
    primary: string
  }

  breakpoints: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    tablet: number
    laptop: number
    desktop: number
  }
  media: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    tablet: string
    laptop: string
    desktop: string
    hsm: string
    hsd: string
    hxs: string
  }
}

const breakpoints = {
  xs: 0,
  sm: 450,
  md: 600,
  lg: 900,
  xl: 1200,
  tablet: 800,
  laptop: 1000,
  desktop: 1400,
  hsm: 550,
  hsd: 600,
  hxs: 700
}

const styledTheme: ITheme = {
  colors: {
    primary: '#F2E30C'
  },
  breakpoints,
  media: {
    xs: `(min-width: ${breakpoints.xs}px)`,
    sm: `(min-width: ${breakpoints.sm}px)`,
    md: `(min-width: ${breakpoints.md}px)`,
    lg: `(min-width: ${breakpoints.lg}px)`,
    xl: `(min-width: ${breakpoints.xl}px)`,
    tablet: `(min-width: ${breakpoints.tablet}px)`,
    laptop: `(min-width: ${breakpoints.laptop}px)`,
    desktop: `(min-width: ${breakpoints.desktop}px)`,
    hsm: `(min-height: ${breakpoints.hsm}px)`,
    hsd: `(min-height: ${breakpoints.hsd}px)`,
    hxs: `(min-height: ${breakpoints.hxs}px)`
  }
}

export default styledTheme

export const GlobalStyles = createGlobalStyle`

  body {
    background-color: #101318;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  body {
    font-family: Roboto,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`
