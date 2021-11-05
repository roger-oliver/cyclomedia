import React, { useEffect, useState } from 'react';
import { IMapContext } from './Map.d';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import {Tile as TileLayer} from 'ol/layer';
import 'ol/ol.css';
import "./map.css";

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';

import { ScaleLine, OverviewMap, defaults, MousePosition } from 'ol/control';
import {createStringXY} from 'ol/coordinate';

export const MapContext = React.createContext<IMapContext | void>(undefined);

proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");

register(proj4);

const extent = [846.36, 268975.28, 288050.82, 636456.31];

export const MapComp: React.FC<any> = ({ vectorLayers }) => {

  const mapDivRef = React.createRef<any>();

  const openStreetMap = new TileLayer({
    source: new OSM(),
    zIndex: 1
  })

  vectorLayers?.push(openStreetMap)

  const scaleLineControl = new ScaleLine({
    units: 'metric',
    minWidth: 200,
    bar: true,
    steps: 4,
    text: true
  });

  const overViewMapControl = new OverviewMap({
    tipLabel: 'Netherlands Overview Map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ]
  });

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:28992',

  });

  const map = new Map({
    layers: vectorLayers,
    target: mapDivRef.current,
    view: new View({
      center: [142892.19, 470783.87],
      zoom: 1,
      projection: 'EPSG:28992',
      extent: extent,
    }),
    controls: defaults({attribution: false}).extend([scaleLineControl, overViewMapControl, mousePositionControl])
  });

  return (
    <div className="map" ref={mapDivRef}>
    {map && (
      <MapContext.Provider value={{map}}>
        <div></div>
      </MapContext.Provider>
    )}
    </div>
  );
};
