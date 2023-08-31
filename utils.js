import * as d3 from 'd3';


export function drawLegend(colorScheme) {
  const legendLabels = ["Lowest", "Low", "Mid-Point", "High", "Highest"]
  const legendEntries = d3.quantize(d3[colorScheme], 5).map((color, i)  => {
  return `
  <li class="legend-entry"> 
    <span class="legend-box" style="background-color:${color}" ></span> 
    <span class="legend-label">${legendLabels[i]}</span>
  </li>
  `
}).join("")

document
  .querySelector("#legend-colors")
  .innerHTML = `<ul>${legendEntries}</ul>`
}


export function getColorScale(data, key, colorScheme) {
  const numArray = data.features.map(d => d.properties[key]).filter(d => d!= 'NA')
  const colScale = d3.scaleQuantize()
          .domain([Math.min(...numArray), Math.max(...numArray)])
          .range(d3.quantize(d3[colorScheme], 5))
  return colScale; 
}

// export function drawMap(variable, colorScheme) {
//   fetch("public/de-data.geojson")
//   .then(res => res.json())
//   .then(data => {

//     const colScale = getColorScale(data, variable, colorScheme); 

//     map.eachLayer((layer) => {
//       if (layer !== map) {
//         map.removeLayer(layer);
//       }
//     });

//     L.geoJSON(data, {
//           style: function (feature) {
//               return { 
//                 weight: .3,
//                 color: "black",
//                 fillColor: colScale(feature.properties[variable]),
//                 fillOpacity: .8           
//               }
//           }
//         })
//       .bindTooltip(function (layer) {
//         return 
//         `<strong>${layer.feature.properties.NAME}:</strong>
//         <br/>
//          ${variable}: <strong>${layer.feature.properties[variable].toLocaleString()}</strong>`;
//       })
//       .addTo(map)

//       drawLegend(colorScheme);
//       document.querySelector("#legend-title").innerText = variable;
//   });

  
  