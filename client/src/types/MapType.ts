import { Map as MapLibreMap } from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';
import { ActionTheme} from "@/constans/Action";

export type ProtocolFactory = (requestParameters: any, abortController: AbortController) => Promise<any>;

export enum MapType {
    OSM = 'osm',
    PROTOMAPS = 'protomaps',
}

export interface IMapConfig {
    style: StyleSpecification;
    maxZoom?: number;
    minZoom?: number;
    attributionControl?: boolean;
    protocols?: Record<string, ProtocolFactory>;
}

export interface IMapProviderProps {
    type: MapType;
    center?: [number, number];
    zoom?: number;
    onMapLoad?: (map: MapLibreMap) => void;
    currentTime?: Date;
    mapStyle?: 'DEFAULT' | 'LIGHT' | 'DARK';
    geoJsonData?: any;
}



