// import * as L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// //import { getColorScale } from './utils';
// import { getColorScale, drawLegend, drawMap } from './utils';

// const map = L.map('map').setView([39.2,-75.523],9)
// L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
// // L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
// // 	maxZoom: 19,
// // 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
// // }).addTo(map);

// let variable = "medincome"; 
// let colorScheme = "interpolateBlues";

// fetch("public/de-data.geojson")
// .then(res => res.json())
// .then(data => {
// //  console.log(data)
//     const colScale = getColorScale(data, variable, colorScheme); 
//     L.geoJSON(data,{
//         style: function (feature) {
//             return {
//                 weight: .3,
//                 color: "black",
//                 fillColor: colScale(feature.properties[variable]),
//                 fillOpacity: .8
//             }
//         }
//     }  )
    
//     .bindTooltip(function (layer) {
//         return layer.feature.properties.NAME
//       })
//     .addTo(map)

//     drawLegend(colorScheme);
//     document.querySelector("#legend-title").innerText = variable;
// })

// // drawLegend(colorScheme);
// // document.querySelector("#legend-title").innerText = variable;

// document.addEventListener("DOMContentLoaded", () => {
      
//     document.querySelector("#options").addEventListener("change", (e) => {
//       variable = e.target.value;
//       drawMap(variable, colorScheme);
//     });
  
//     document.querySelector("#colorScheme").addEventListener("change", (e) => {
//       colorScheme = e.target.value;
//       drawMap(variable, colorScheme);
//     });

//     drawMap(variable, colorScheme);

//   });


import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getColorScale, drawLegend } from './utils';

const map = L.map('map').setView([39.2, -75.523], 9);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);



let variable = "medincome";
let colorScheme = "interpolateBlues";

function drawMap() {
    fetch("de-data.geojson")
    .then(res => res.json())
    .then(data => {
  
      const colScale = getColorScale(data, variable, colorScheme); 
  
      L.geoJSON(data, {
            style: function (feature) {
                return { 
                  weight: .3,
                  color: "black",
                  fillColor: colScale(feature.properties[variable]),
                  fillOpacity: .8           
                }
            }
          })
        .bindTooltip(function (layer) {
          return layer.feature.properties.NAME
        })
        .addTo(map)
    })
    drawLegend(colorScheme);
    
    document.querySelector("#legend-title").innerText = variable;
  
  }

// fetch("public/de-data.geojson")
//   .then(res => res.json())
//   .then(data => {
//     const colScale = getColorScale(data, variable, colorScheme);
//     L.geoJSON(data, {
//       style: function (feature) {
//         return {
//           weight: .3,
//           color: "black",
//           fillColor: colScale(feature.properties[variable]),
//           fillOpacity: .8
//         }
//       }
//     })
//     .bindTooltip(function (layer) {
//       return layer.feature.properties.NAME;
//     })
//     .addTo(map);

//     drawLegend(colorScheme);
//     document.querySelector("#legend-title").innerText = variable;
//   });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#options").addEventListener("change", (e) => {
    variable = e.target.value;
    drawMap();
  });

  document.querySelector("#colorScheme").addEventListener("change", (e) => {
    colorScheme = e.target.value;
    drawMap();
  });

  drawMap();
});


