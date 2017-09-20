import { Point, List, SVG, Misc } from "./utils"
import merge from 'lodash/merge'
import defaultConfig from './inputs/defaults'
import block from './outputs/block'
import Points from './outputs/points'

Misc.disableConsole(!defaultConfig.DEBUG)

function midpoints(minDistance, a,b) {
  const lastIndex = a.length-1
  const midpointDistance = Point.length(a[lastIndex], b[0])
  if (midpointDistance <= minDistance) {
    return [
      ...a.slice(0,lastIndex),
      ...b
      // Point.midpoint(a[lastIndex], b[0]),
      // ...b.slice(1)
    ]
  } else {
    return [...a,...b]
  }
}

function _calculateDefaultPoints(config) {
  return [
    [0, config.dimensions.height],
    [config.dimensions.width, config.dimensions.height],
    [config.dimensions.width, config.dimensions.height - config.dimensions.wallHeight],
    [config.dimensions.width/2 + config.dimensions.roofOffset, 0],
    [0, config.dimensions.height - config.dimensions.wallHeight]
  ]
}

function Wren(configOverrides={}) {
  const config = merge(defaultConfig, configOverrides);
  config.mainPoints = _calculateDefaultPoints(config);

  console.time("clipper");
  const {
    main: mainPoints,
    outer: outerPoints,
    inner: innerPoints
  } = Points(config.mainPoints, config.fin.width)
  console.timeEnd("clipper");

  console.time("calculations");
  const mainPointPairs = List.loopifyInPairs(mainPoints)
  const lineLengths = mainPointPairs.map(pair => Point.length(...pair))

  const points = mainPointPairs.reduce( (arr, pair, index) => {
    const midpoint = Point.midpoint(...pair)
    const distance = Point.length(...pair)
    const halfDistance = distance/2

    function calculatePoints(halfPair) {
      let pts = []
      for (let i = config.fin.pointDistance; i < halfDistance; i += config.fin.pointDistance) {
        pts.push(Point.pointOnLine(i, halfDistance)(...halfPair))
      }
      return pts
    }

    let finPoints = []
    finPoints.push(
      pair[0],
      ...midpoints(
        config.fin.pointDistance*0.75,
        calculatePoints([pair[0], midpoint]),
        calculatePoints([pair[1], midpoint]).reverse()
      )
    )

    return arr.concat({
      points: {
        main: pair,
        inner: innerPoints[index],
        outer: outerPoints[index]
      },
      finPoints,
      distance,
      angle: Point.angle(...pair)
    })
  }, [])
  const mainPath = SVG.path(config.mainPoints, { 'stroke-dasharray': "5, 10", stroke: "#CCC" })
  const safeIndex = List.safeIndex(points.length)
  const modules = points.map( (groupedPoints, armIndex) => {
    const previousArm = points[safeIndex(armIndex - 1)]
    return "<g>" + groupedPoints.finPoints.map( (pts, pointIndex) => block(config, groupedPoints, pointIndex, previousArm)(...pts)).join("") + "</g>"
  }).join("")
  console.timeEnd("calculations");

  return {
    outputs: {
      points,
    }
  }
}

module.exports = Wren
