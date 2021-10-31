import { Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import './App.css';
import AppBar from './components/appBar/AppBar';
import AppDrawer from './components/drawer/drawer';
import Main from './components/main/Main';
import { Map } from './components/map'

function App() {

  const drawerWidth = 240;

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar drawerOpen={open} drawerWidth={drawerWidth} theme={theme} handleDrawerOpen={handleDrawerOpen}/>
        <AppDrawer drawerOpen={open} drawerWidth={drawerWidth} theme={theme} handleDrawerClose={handleDrawerClose} />
        <Main drawerOpen={open} drawerWidth={drawerWidth} theme={theme} handleDrawerClose={handleDrawerClose}>
          <Map />
        </Main>
      </Box>
    </>
  );
}

export default App;
