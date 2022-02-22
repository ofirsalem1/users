import './mapUser.css';
import openlayers from 'openlayers';
import { layer, custom, Map, Layers } from 'react-openlayers';

import { transform } from 'ol/proj';
import * as ol from 'openlayers';

export default function MapUser({ coordinatesArr }) {
  // transform the coordinates to EPSG:4326
  const transformLatLong = latlongArr => {
    let longlatArr = [latlongArr[1], latlongArr[0]];
    return transform(longlatArr, 'EPSG:4326', 'EPSG:3857');
  };

  const coordinates = coordinatesArr; // get the coordinates from the props
  const myTileSource = new openlayers.source.Stamen({
    layer: 'terrain',
  });

  var iconFeature = new ol.Feature(new ol.geom.Point(transformLatLong(coordinates)));
  var source = new ol.source.Vector({ features: [iconFeature] });
  var marker = new custom.style.MarkerStyle();

  return (
    <div className="map-div">
      <Map
        view={{
          center: transformLatLong(coordinates),
          zoom: 10,
        }}
      >
        <Layers>
          <layer.Tile source={myTileSource} /> {/* map background */}
          <layer.Vector style={marker.style} source={source} /> {/* map marker */}
        </Layers>
      </Map>
    </div>
  );
}
