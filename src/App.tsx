import { Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import './App.css';
import AppBar from './components/appBar/AppBar';
import AppDrawer from './components/drawer/Drawer';
import Main from './components/main/Main';
import { Map } from './components/map'
import LayerComponent from './components/map/layers/Layer';
import { createAllAvailableLayers } from './components/map/layers/layers.config';

function App() {

  const drawerWidth = 240;

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [ vectorLayers, setVectorLayers ] = useState<any>([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLayerVisibility = (name: string) => {

    for (let i = 0; i < vectorLayers.length; i++) {
      if(vectorLayers[i].name === name)
        vectorLayers[i].layer.values_.visible = !vectorLayers[i].layer.values_.visible;
    }
    handleDrawerClose();
  }

  useEffect(() => {
    setVectorLayers(createAllAvailableLayers());
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar drawerOpen={open} drawerWidth={drawerWidth} theme={theme} handleDrawerOpen={handleDrawerOpen}/>
        <AppDrawer drawerOpen={open} drawerWidth={drawerWidth} theme={theme} handleDrawerClose={handleDrawerClose}>
          {
            vectorLayers.map((layer: any) => (
              <LayerComponent key={layer.name} name={layer.name} color={layer.colour} state={layer.layer.values_.visible} handleLayerVisibility={handleLayerVisibility} />
            ))
          }
        </AppDrawer>
        <Main drawerOpen={open} drawerWidth={drawerWidth} theme={theme} handleDrawerClose={handleDrawerClose}>
          <Map vectorLayers={vectorLayers.map((layer: any) => layer.layer)} controls={[]} />
        </Main>
      </Box>
    </>
  );
}

export default App;
