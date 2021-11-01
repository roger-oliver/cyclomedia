import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import {
  LayersClear as LayersClearIcon,
  Layers as LayersIcon
} from '@mui/icons-material';

import { red, grey, green, orange, blue } from '@mui/material/colors';

export type LayerProps = {
  name: string;
  color: string;
  state: boolean;
  handleLayerVisibility: (name: string) => void;
}

const colours = [
  { name: 'red', colour: red['A700'] },
  { name: 'blue', colour: blue['A700'] },
  { name: 'green', colour: green['A700'] },
  { name: 'orange', colour: orange['A700'] },
  { name: 'black', colour: grey[900] }
]


const LayerComponent: React.FC<LayerProps> = ({name, color, state, handleLayerVisibility}) => {

  const iconColour = colours.find((colour: any) => colour.name === color)?.colour;

  return (
    <ListItem button key={name} onClick={() => handleLayerVisibility(name)}>
      <ListItemIcon>
      {state ? <LayersIcon sx={{ color: iconColour}} /> : <LayersClearIcon sx={{ color: iconColour}} />}
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default LayerComponent;
