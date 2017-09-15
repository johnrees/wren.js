const Point = require('./utils/point')
const List = require('./utils/list')
const SVG = require('./utils/svg')
const block = require('./block')
const defaultConfig = require('./config')
const merge = require('lodash/merge')

const gui = new dat.GUI();

function draw(configOverrides={}) {
  const config = merge(defaultConfig, configOverrides);
  config.halfWidth = config.width/2;
  config.mainPoints = [
    [0, config.height],
    [config.width, config.height],
    [config.width, config.height - config.wallHeight],
    [config.halfWidth + config.roofOffset, 0],
    [0, config.height - config.wallHeight]
  ]

  console.time("calculations");

  const mainPointPairs = List.loopifyInPairs(config.mainPoints)
  const lineLengths = mainPointPairs.map(pair => Point.length(...pair))

  const points = mainPointPairs.reduce( (arr, pair) => {
    const midpoint = Point.midpoint(...pair)
    const distance = Point.length(...pair)
    const halfDistance = distance/2

    function calculatePoints(halfPair) {
      let pts = []
      for (let i = config.pointDistance; i < halfDistance; i += config.pointDistance) {
        pts.push(Point.pointOnLine(i, halfDistance)(...halfPair))
      }
      return pts
    }

    let finPoints = []
    finPoints.push(
      ...calculatePoints([pair[0], midpoint]),
      ...calculatePoints([pair[1], midpoint]).reverse()
    )

    return arr.concat({
      mainPoints: pair,
      finPoints,
      distance,
      angle: Point.angle(...pair)
    })
  }, [])

  const viewBox = [-config.offset, -config.offset, config.width+config.offset*2, config.height+config.offset*2].join(" ")
  const mainPath = SVG.path(config.mainPoints, { 'stroke-dasharray': "5, 10", stroke: "#CCC" })
  const modules = points.map(groupedPoints => {
    return "<g>" + groupedPoints.finPoints.map(pts => block(config, groupedPoints.angle)(...pts)).join("") + "</g>"
  }).join("")

  console.timeEnd("calculations");

  console.time("render");
  document.getElementById("svg").setAttribute('viewBox', viewBox)
  document.getElementById("mainPath").innerHTML = mainPath
  document.getElementById("modules").innerHTML = modules
  document.getElementById("circles").innerHTML = points.map(groupedPoints => groupedPoints.finPoints.map(pair => SVG.circle(...pair)))
  console.timeEnd("render");
}

draw()

const dimensionsFolder = gui.addFolder("dimensions")
dimensionsFolder.add(defaultConfig, 'height').min(2500).max(6000).step(5).onChange(value => draw({ height: value }));
dimensionsFolder.add(defaultConfig, 'width').min(2000).max(5000).step(5).onChange(value => draw({ width: value }));
dimensionsFolder.add(defaultConfig, 'wallHeight').min(1700).max(6000).step(5).onChange(value => draw({ wallHeight: value }));
dimensionsFolder.add(defaultConfig, 'roofOffset').min(-2000).max(2000).step(10).onChange(value => draw({ roofOffset: value }));
dimensionsFolder.open()

const finFolder = gui.addFolder("fin")
finFolder.add(defaultConfig.fin, 'width').min(200).max(400).step(5).onChange(value => draw({ fin: { width: value }}));

const gripFolder = finFolder.addFolder("grip")
gripFolder.add(defaultConfig.fin.grip, 'width').min(100).max(400).step(5).onChange(value => draw({ fin: { grip: { width: value }}}));
gripFolder.open()

const materialFolder = gui.addFolder("material")
materialFolder.add(defaultConfig.material, 'thickness').min(8).max(30).step(1).onChange(value => draw({ material: { thickness: value }}));
