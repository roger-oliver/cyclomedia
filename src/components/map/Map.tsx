import React from 'react';
import { MapProps, MapState, IMapContext } from './Map.d';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import "./map.css";
import {Tile as TileLayer} from 'ol/layer';
import 'ol/ol.css';

export const MapContext = React.createContext<IMapContext | void>(undefined);

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
