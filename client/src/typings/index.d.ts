// For React 18
declare module 'react-progressive-graceful-image' {
  interface ProgressiveImageProps {
    children: (string, boolean, SrcSetData) => React.ReactNode
  }
}
