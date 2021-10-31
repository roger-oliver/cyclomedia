import { Theme } from '@mui/material/styles';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface AppBarProps extends MuiAppBarProps {
  drawerOpen?: boolean;
  drawerWidth: number;
  theme: Theme;
  handleDrawerOpen: () => void;
}
