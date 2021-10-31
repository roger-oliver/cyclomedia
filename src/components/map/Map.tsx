import React from 'react';
import { MapProps, MapState, IMapContext } from './Map.d';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import "./map.css";
import {Tile as TileLayer} from 'ol/layer';
import 'ol/ol.css';

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';

export const MapContext = React.createContext<IMapContext | void>(undefined);

proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");

register(proj4);

const extent = [646.36, 308975.28, 276050.82, 636456.31];

export class MapComponent extends React.PureComponent<MapProps, MapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;
  state: MapState = {};

  constructor(props: MapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

    const openStreetMap = new TileLayer({
      source: new OSM()
    })

    const map = new Map({
      layers: [ openStreetMap ],
      target: this.mapDivRef.current,
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:28992',
        extent: extent,
      }),
    });

    const mapContext: IMapContext = { map };
    this.setState({
      mapContext: mapContext,
    });
  }

  render() {
    return (
      <div className="map" ref={this.mapDivRef}>
        {this.state.mapContext && (
          <MapContext.Provider value={this.state.mapContext}>
            <div></div>
          </MapContext.Provider>
        )}
      </div>
    );
  }
}
