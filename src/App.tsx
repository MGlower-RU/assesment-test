import { Box, useTheme } from '@mui/material';
import Header from './components/Header';
import Router from './components/Router';

export default function App() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh'
      }}
    >
      <Header />
      <Box
        sx={{
          width: '100%',
          flexGrow: 1,
          paddingX: 1,
          paddingY: 2,
          [theme.breakpoints.up('sm')]: {
            paddingX: 3,
          },
          [theme.breakpoints.up('md')]: {
            paddingX: 10,
            paddingY: 5,
          },
        }}
      >
        <Router />
      </Box>
    </Box>
  );
}