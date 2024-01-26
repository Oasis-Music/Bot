/* eslint-disable @typescript-eslint/ban-types */

export declare namespace TelegramWebApp {
  // Dependencies
  interface Service {
    WebApp: WebApp
  }

  /**
   * Available app events.
   */
  type EventType = 'themeChanged' | 'viewportChanged' | 'mainButtonClicked'

  /**
   * WebApp API
   * https://core.telegram.org/bots/webapps#initializing-mini-apps
   */
  interface WebApp {
    //
    initData: string
    //
    initDataUnsafe: WebAppInitData
    //
    platform: string
    //
    themeParams: ThemeParams
    //
    isExpanded: boolean
    //
    MainButton: MainButton
    //
    backgroundColor: string
    //
    onEvent(eventType: EventType, eventHandler: Function): void
    //
    offEvent(eventType: EventType, eventHandler: Function): void
    //
    sendData(data: unknown): void
    //
    ready(): void
    //
    expand(): void
    //
    close(): void
    //
    enableClosingConfirmation(): void
  }

  interface ThemeParams {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
  }

  interface WebAppInitData {
    //
    query_id?: string
    //
    user?: WebAppUser
    //
    receiver?: WebAppUser
    //  'start_param' Mini App can load the correct interface right away.
    start_param?: string
    //
    auth_date: number
    //
    hash: string
  }

  interface WebAppUser {
    //
    id: number
    //
    is_bot?: boolean
    //
    first_name: string
    //
    last_name?: string
    //
    username?: string
    //
    language_code?: string
    //
    is_premium?: boolean
  }

  interface MainButton {
    //
    text: string
    //
    color: string
    //
    textColor: string
    //
    isVisible: boolean
    //
    isActive: boolean
    //
    readonly isProgressVisible: boolean
    //
    setText(text: string): MainButton
    //
    onClick(callback: Function): MainButton
    //
    show(): MainButton
    //
    hide(): MainButton
    //
    enable(): MainButton
    //
    disable(): MainButton
    // leaveActive = disabled
    showProgress(leaveActive: boolean): MainButton
    //
    hideProgress(): MainButton
    //
    setParams(params: MainButtonParams): MainButton
  }

  interface MainButtonParams {
    //
    text?: string
    //
    color?: string
    //
    text_color?: string
    //
    is_active?: boolean
    //
    is_visible?: boolean
  }
}

declare global {
  const Telegram: TelegramWebApp.Service
}
