import React, { useState, memo, useLayoutEffect } from 'react'
import { History } from 'history'
import { BrowserRouterProps as NativeBrowserRouterProps, Router } from 'react-router-dom'

/*
    INFO: RRD6 has not yet received official history support outside the context of React
          even with unstable_HistoryRouter 
    GitHub: https://github.com/remix-run/react-router/issues/8264
*/

export interface BrowserRouterProps extends Omit<NativeBrowserRouterProps, 'window'> {
  history: History
}

const HistoryRouter: React.FC<BrowserRouterProps> = memo((props) => {
  const { history, ...restProps } = props
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      {...restProps}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
})

HistoryRouter.displayName = 'HistoryRouter'

export default HistoryRouter
