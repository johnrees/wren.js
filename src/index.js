const Point = require('./utils/point')
const List = require('./utils/list')
const SVG = require('./utils/svg')

const config = require('./config')

const mainPointPairs = List.loopifyInPairs(config.mainPoints)
const lineLengths = mainPointPairs.map(pair => Point.length(...pair))

const points = mainPointPairs.reduce( (arr, pair) => {
  const halfPair = [pair[0], Point.midpoint(...pair)]
  const distance = Point.length(...halfPair)
  const pointDistance = 300

  let finPoints = []
  for (let i = pointDistance; i < distance; i += pointDistance) {
    finPoints.push(Point.pointOnLine(i, distance)(...halfPair))
  }

  return arr.concat({
    mainPoints: pair,
    finPoints,
    distance,
    angle: Point.angle(...halfPair)
  })
}, [])

const block = (angle) => (x,y) => {
  const rotate = Point.rotateAroundPoint([x,y], angle)
  return SVG.path([
    [x-config.frameWidth, y+150],
      // [x-90, y+150],
        // dogbone
        [x-100, y+150],
        [x-100, y+140],
        [x-90, y+140],
      // grip
      [x-90, y+180],
      [x+90, y+180],
      // [x+90, y+150],
        // dogbone
        [x+90, y+140],
        [x+100, y+140],
        [x+100, y+150],

    [x+config.frameWidth, y+150],
  ].map(rotate)) + SVG.path([
      // // rabbit ears
      // [x+config.frameWidth, y+100],
      // [x+config.frameWidth-80, y+100],
      // [x+config.frameWidth-80, y+50],
      // [x+config.frameWidth, y+50],
      // //
      // [x+config.frameWidth, y-50],
      // [x+config.frameWidth-80, y-50],
      // [x+config.frameWidth-80, y-100],
      // [x+config.frameWidth, y-100],
    [x+config.frameWidth, y-150],
      [x+90, y-150],
      [x+90, y-180],
      [x-90, y-180],
      [x-90, y-150],
    [x-config.frameWidth, y-150],
  ].map(rotate))
}

document.getElementById("mainPath").innerHTML = SVG.path(config.mainPoints, { 'stroke-dasharray': "10, 10", stroke: "#CCC" })

// document.getElementById("circles").innerHTML = points.map(groupedPoints => groupedPoints.finPoints.map(pts => SVG.circle(...pts)))
// document.getElementById("circles").innerHTML = points[0].finPoints.map(pts => block(0)(...pts)).join("")
document.getElementById("circles").innerHTML = points.map(groupedPoints => {
  return "<g>" + groupedPoints.finPoints.map(pts => block(groupedPoints.angle)(...pts)).join("") + "</g>"
}).join("")
