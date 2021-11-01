import Map from "ol/Map";
import {Vector as VectorLayer} from 'ol/layer';
import { Control } from 'ol/control';

export interface IMapContext {
  map: Map;
}

export type MapProps = {
  vectorLayers: VectorLayer[] = [];
  controls: Control[] = [];

};

export type MapState = {
  mapContext?: IMapContext;
};
