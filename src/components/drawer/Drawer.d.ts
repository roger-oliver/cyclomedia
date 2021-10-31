import { Theme } from '@mui/material/styles';

export type DrawerSet = {
  drawerWidth: number;
  drawerOpen: boolean;
  handleDrawerClose: () => void;
  theme: Theme;
}
