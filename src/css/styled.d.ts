import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string
    borderChecked: string
    checked: string
    primary: string
    shadow: string
    text: string
    title: string
  }
}