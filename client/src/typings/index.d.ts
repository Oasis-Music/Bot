import { ITheme } from '../utils/theme'
// For React 18
declare module 'react-progressive-graceful-image' {
  interface ProgressiveImageProps {
    children: (string, boolean, SrcSetData) => React.ReactNode
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
