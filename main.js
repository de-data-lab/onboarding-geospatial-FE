import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getColorScale, drawLegend } from "./utils";

let variable = "medincome";
let colorScheme = "interpolateBlues";

const map = L.map("map").setView([39.2, -75.523], 9.2);
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
).addTo(map);

function drawMap() {
  fetch("de-data.geojson")
    .then((res) => res.json())
    .then((data) => {
      const colScale = getColorScale(data, variable, colorScheme);

      L.geoJSON(data, {
        style: function (feature) {
          return {
            weight: 0.3,
            color: "black",
            fillColor: colScale(feature.properties[variable]),
            fillOpacity: 0.8,
          };
        },
      })
        .bindTooltip(function (layer) {
          return `<strong>${layer.feature.properties.NAME}:</strong>
    <br/>
    ${variable}: <strong>${layer.feature.properties[variable].toLocaleString()}</strong>`;
        })
        .addTo(map);
    });
  drawLegend(colorScheme);
  document.querySelector("#legend-title").innerText = variable;
}

document.addEventListener("DOMContentLoaded", () => {
  drawMap();
});

document.querySelector("#options").addEventListener("change", (e) => {
  variable = e.target.value;
  drawMap();
});

document.querySelector("#colorScheme").addEventListener("change", (e) => {
  colorScheme = e.target.value;
  drawMap();
});