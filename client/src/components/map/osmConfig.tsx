import { IMapConfig } from '@/types/MapType';

export const osmConfig: IMapConfig = {
    style: {
        version: 8,
        name: 'Kaliningrad OSM Style',
        center: [20.51, 54.71],
        zoom: 12,
        bearing: 0,
        pitch: 0,
        sources: {
            'osm-tiles': {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '© OpenStreetMap contributors'
            }
        },
        layers: [
            {
                id: 'osm-tiles-layer',
                type: 'raster',
                source: 'osm-tiles',
                minzoom: 0,
                maxzoom: 19,
                paint: {
                    'raster-opacity': 1
                }
            }
        ]
    },
    maxZoom: 18,
    minZoom: 8,
    attributionControl: false
};