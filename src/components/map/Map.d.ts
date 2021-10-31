import Map from "ol/Map";

export interface IMapContext {
  map: Map;
}

export type MapProps = {};

export type MapState = {
  mapContext?: IMapContext;
};
