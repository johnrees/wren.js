import Wren from ".."
import HUD from '../ui/hud'

function render() {

  Wren()

  console.time("render");

  const sheets = config.layers.sheets ? SVG.path([
    [0,0],
    [0, config.material.height],
    [config.material.width, config.material.height],
    [config.material.width, 0]
  ]) : ""

  // document.getElementById("svg").setAttribute('viewBox', viewBox)
  document.getElementById("sheets").innerHTML = sheets
  document.getElementById("mainPath").innerHTML = mainPath
  document.getElementById("modules").innerHTML = modules
  document.getElementById("circles").innerHTML = points.map(groupedPoints => groupedPoints.finPoints.map(pair => SVG.circle(...pair)))

  // const viewBox = [-config.svg.padding, -config.svg.padding, config.dimensions.width+config.svg.padding*2, config.dimensions.height+config.svg.padding*2].join(" ")
  // document.getElementById("svg").setAttribute('viewBox', viewBox)

  const viewBox = document.getElementById("svg").getBBox()
  document.getElementById("svg").setAttribute('viewBox', [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(" "))

  console.timeEnd("render");
}

const hud = HUD(defaultConfig, Wren)

function handleDragStart(event) {
  const circle = event.target
  console.log(circle)
}
for (const circle of [...document.querySelectorAll('circle')]) {
  circle.addEventListener("mousedown", handleDragStart)
}

