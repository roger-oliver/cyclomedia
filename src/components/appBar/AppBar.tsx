import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { IconButton, Toolbar, Typography } from '@mui/material';
import {
  Menu as MenuIcon,
} from '@mui/icons-material';
import type { AppBarProps } from './AppBar.d'

const AppBar: React.FC<AppBarProps> = ({ drawerOpen, drawerWidth, theme, handleDrawerOpen }) => {


  const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<any>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <StyledAppBar position="fixed" open={drawerOpen} theme={theme}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Cyclomedia Test
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
