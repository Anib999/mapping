import L from "leaflet";
import CollectorImage from "../mapmarker/collector1.png";

let MarkerIcon = L.Icon.extend({
  options: {
    iconSize: [25, 40],
    // iconAnchor: [10, 41],
    // popupAnchor: [2, -40],
    // shadowUrl
  },
});

export const iconLists = [
  new MarkerIcon({ iconUrl: CollectorImage }),
  new MarkerIcon({ iconUrl: require("leaflet/dist/images/marker-icon.png") }),
  new MarkerIcon({
    iconUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0K57ryNIMRTnEk3t41Rj8Kk5iE808O9wPw&usqp=CAU`,
  }),
  new MarkerIcon({
    iconUrl: `https://www.pikpng.com/pngl/m/5-58878_earth-location-map-world-navigation-pin-marker-svg.png`,
  }),
];
