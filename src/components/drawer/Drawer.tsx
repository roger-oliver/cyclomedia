import { styled } from '@mui/material/styles';
import {
  Drawer,
  IconButton,
  Divider,
  List,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

import type { DrawerSet } from './Drawer.d';

const AppDrawer: React.FC<DrawerSet> = ({ drawerWidth, drawerOpen, handleDrawerClose, theme, children }) => {

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    anchor="left"
    open={drawerOpen}
  >
    <DrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </IconButton>
    </DrawerHeader>
    <Divider />
    <List>
      {children}
    </List>
    <Divider />
  </Drawer>
  );
};

export default AppDrawer;