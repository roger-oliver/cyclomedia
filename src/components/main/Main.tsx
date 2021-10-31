import { styled } from '@mui/material/styles';
import type { MainSet } from './Main.d';


const Main: React.FC<MainSet> = ({ theme, drawerOpen, drawerWidth, children }) => {

  const MainContent = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean; drawerWidth: number;
  }>(({ theme, open, drawerWidth }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <MainContent open={drawerOpen} theme={theme} drawerWidth={drawerWidth}>
      <DrawerHeader theme={theme} />
        {children}
    </MainContent>
  );
};

export default Main;