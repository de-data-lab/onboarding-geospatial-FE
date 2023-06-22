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