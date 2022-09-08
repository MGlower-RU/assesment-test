import React, { ReactNode, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Context, { MainContext } from './components/Context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Context>
      <ThemeContextProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeContextProvider>
    </Context>
  </React.StrictMode>
)

function ThemeContextProvider({ children }: { children: ReactNode }) {
  const { themeMode } = useContext(MainContext)

  let theme = createTheme({
    palette: {
      mode: themeMode
    }
  })
  theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}