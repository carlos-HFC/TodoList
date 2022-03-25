import { useEffect, useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { Header } from './components';
import { TodoProvider } from "./context";
import { Todo } from './pages';

import { GlobalStyle, dark, light } from './css';

export function App() {
  const [theme, setTheme] = useState<DefaultTheme>(JSON.parse(localStorage.getItem(String(process.env.REACT_APP_THEME)) as string) || dark);

  useEffect(() => localStorage.setItem(String(process.env.REACT_APP_THEME), JSON.stringify(theme)), [theme]);

  const handleTheme = () => setTheme(theme.name === 'light' ? dark : light);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header handleTheme={handleTheme} />
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </ThemeProvider>
  );
}