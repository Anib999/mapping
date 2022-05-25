import L from "leaflet";
import CollectorImage from "../mapmarker/collector1.png";
import DotImage from "../mapmarker/dot.png";

let MarkerIcon = L.Icon.extend({
  options: {
    iconSize: [25, 40],
    // iconAnchor: [10, 41],
    // popupAnchor: [2, -40],
    // shadowUrl: [0, 0]
  },
});

let DotIcon = L.Icon.extend({
  options: {},
});

export const iconLists = [
  new MarkerIcon({
    iconUrl: CollectorImage,
  }),
  new MarkerIcon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
  }),
  new MarkerIcon({
    iconUrl: `https://www.pinclipart.com/picdir/middle/545-5450478_location-map-marker-pin-place-svg-png-icon.png`,
  }),
  new MarkerIcon({
    iconUrl: `https://www.pikpng.com/pngl/m/5-58878_earth-location-map-world-navigation-pin-marker-svg.png`,
  }),
];

export const dotIcon = [
  new DotIcon({
    iconUrl: CollectorImage,
    // iconSize: [25, 40],
    className: 'bigIcon'
  }),
  new DotIcon({
    iconUrl: DotImage,
  }),
];
