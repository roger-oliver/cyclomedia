import React from 'react';
import { MapProps, MapState, IMapContext } from './Map.types';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import "./map.css";
import XYZ from 'ol/source/XYZ';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import TopoJSON from 'ol/format/TopoJSON';
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

    const key = 'kW8O2Tp3ise6y6pwrx7r';
    const attributions = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
      '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';


    const raster = new TileLayer({
      source: new XYZ({
        attributions: attributions,
        url: 'https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=' + key,
        tileSize: 512,
      }),
    });

    const style = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)',
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1,
      }),
    });
    
    const vector = new VectorLayer({
      source: new VectorSource({
        url: 'data/topojson/world-110m.json',
        format: new TopoJSON({
          // don't want to render the full world polygon (stored as 'land' layer),
          // which repeats all countries
          layers: ['countries'],
        }),
        overlaps: false,
      }),
      style: style,
    });

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
