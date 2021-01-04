import { createContext } from "react";

const tema = createContext({ handleTheme })

function handleTheme(theme: string): string | void {
   return theme
}

export default tema