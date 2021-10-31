import { Theme } from '@mui/material/styles';

export type MainSet = {
  drawerWidth: number;
  drawerOpen: boolean;
  handleDrawerClose: () => void;
  theme: Theme;
}
