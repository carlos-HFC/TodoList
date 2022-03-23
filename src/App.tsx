import { useEffect, useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { Header } from './components';
import { Todo } from './pages';

import { dark, light } from './css/themes';
import GlobalStyle from './css/styles';
import './css/main.min.css';

function App() {
  const [theme, setTheme] = useState<DefaultTheme>(light);

  useEffect(() => localStorage.setItem("THEME", JSON.stringify(theme)), [theme]);

  const handleTheme = () => setTheme(theme.name === 'light' ? dark : light);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header handleTheme={handleTheme} />
      <Todo />
    </ThemeProvider>
  );
}

export default App;
