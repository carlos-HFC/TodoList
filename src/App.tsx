import { useEffect, useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { Header } from './components';
import { Todo } from './pages';

import GlobalStyle from './css/styles';
import { dark, light } from './css/themes';
import './css/main.min.css';

export function App() {
  const [theme, setTheme] = useState<DefaultTheme>(JSON.parse(localStorage.getItem(String(process.env.REACT_APP_THEME)) as string) || dark);

  useEffect(() => localStorage.setItem(String(process.env.REACT_APP_THEME), JSON.stringify(theme)), [theme]);

  const handleTheme = () => setTheme(theme.name === 'light' ? dark : light);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header handleTheme={handleTheme} />
      <Todo />
    </ThemeProvider>
  );
}