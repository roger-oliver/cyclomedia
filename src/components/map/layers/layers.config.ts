import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import {Vector as VectorLayer} from 'ol/layer';
import {Stroke, Style} from 'ol/style';

export enum LayersAvailable {
  NETHERLANDS_PROVINCES = 'netherlands_provinces',
  BAG_STANDPLAATS = 'bag_standplaats',
  BAG_WOONPLAATS = 'bag_woonplaats',
  BAG_PAND = 'bag_pand',
  BAG_LIGPLAATS = 'bag_ligplaats'
}

export enum FeatureTypeName {
  STANDPLAATS = 'bag:standplaats',
  WOONPLAATS = 'bag:woonplaats',
  PAND = 'bag:pand',
  LIGPLAATS = 'bag:ligplaats'
}

enum Colours {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  ORANGE = 'orange',
  BLACK = 'black'
}

interface IVectorLayer {
  name: string;
  colour: Colours;
  state: boolean;
  layer?: VectorLayer<any>;
}


const getFeature = (typeName: FeatureTypeName): string => {
  return `https://geodata.nationaalgeoregister.nl/bag/wfs/v1_1?service=WFS&request=GetFeature&typeName=${typeName}&count=100&startIndex=0&outputFormat=json&version=2.0.0`;
}

const getTypeNameFromLayerAvailable = (layerAvailable: LayersAvailable): FeatureTypeName => {

  switch (layerAvailable) {
    case LayersAvailable.BAG_LIGPLAATS:
      return FeatureTypeName.LIGPLAATS;
    case LayersAvailable.BAG_PAND:
      return FeatureTypeName.PAND;
    case LayersAvailable.BAG_STANDPLAATS:
      return FeatureTypeName.STANDPLAATS;
    default:
      return FeatureTypeName.WOONPLAATS;
  }
}

const createLayer = (layerAvailable: LayersAvailable, colour: Colours, width: number = 2): IVectorLayer => {
  if(layerAvailable === LayersAvailable.NETHERLANDS_PROVINCES) {

    const nlVectorSource = new VectorSource({
      format: new GeoJSON(),
      url: './data/geojson/netherlands.geojson',
    
    });
    return {
      name: layerAvailable,
      colour: colour,
      state: true,
      layer: new VectorLayer({
        visible: true,
        zIndex: 2,
        source: nlVectorSource,
        style: new Style({
          stroke: new Stroke({
            color: colour,
            width: width,
          }),
        }),
      })
    };

  } else {
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: () => {
        return (getFeature(getTypeNameFromLayerAvailable(layerAvailable)));
      },
      strategy: bboxStrategy,
    });
    
    return {
      name: layerAvailable,
      colour: colour,
      state: true,
      layer: new VectorLayer({
        visible: true,
        zIndex: 9,
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: colour,
            width: width,
          }),
        }),
      })
    };
  }
}

const createAllAvailableLayers = (): IVectorLayer[] => {
  const layers: IVectorLayer[] = [];
  
  layers.push(createLayer(LayersAvailable.NETHERLANDS_PROVINCES, Colours.BLACK));
  layers.push(createLayer(LayersAvailable.BAG_WOONPLAATS, Colours.BLUE));
  layers.push(createLayer(LayersAvailable.BAG_STANDPLAATS, Colours.RED));
  layers.push(createLayer(LayersAvailable.BAG_PAND, Colours.GREEN));
  layers.push(createLayer(LayersAvailable.BAG_LIGPLAATS, Colours.ORANGE));

  return layers;
}

export { createAllAvailableLayers };
export type { IVectorLayer };
