import { useEffect, useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import Todo from './pages/Todo';
import Header from './components/Header';
import tema from './context';

import GlobalStyle from './css/styles'
import { dark, light } from './css/themes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/main.min.css'

function App() {
   // const [theme, setTheme] = useState<DefaultTheme>(JSON.parse(localStorage.getItem("THEME") as string) || light)
   const [theme, setTheme] = useState<DefaultTheme>(light)

   // useEffect(() => localStorage.setItem("THEME", JSON.stringify(theme)), [theme])

   const handleTheme = () => setTheme(theme.title === 'light' ? dark : light)

   return (
      <ThemeProvider theme={theme}>
         <GlobalStyle />
         <tema.Provider value={{ handleTheme }}>
            <Header />
         </tema.Provider>
         <Todo />
      </ThemeProvider>
   );
}

export default App;
