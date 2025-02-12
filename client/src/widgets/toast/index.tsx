import { Toaster } from 'sonner'

export function Toast() {
  return (
    <Toaster
      position="bottom-center"
      visibleToasts={2}
      // icons={{
      //   error: <TimesIcon />,
      //   success: <CheckIcon />
      // }}
      toastOptions={{
        unstyled: false,
        classNames: {
          error: '',
          success: ''
        }
      }}
    />
  )
}
