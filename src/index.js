const Point = require('./utils/point')
const List = require('./utils/list')
const SVG = require('./utils/svg')
const block = require('./block')
const defaultConfig = require('./config')
const merge = require('lodash/merge')

const gui = new dat.GUI();

function offset(points, delta, scale=100) {
  const paths = [points.map( pts => ({X: pts[0] * scale, Y: pts[1] * scale }))];
  const co = new ClipperLib.ClipperOffset();
  const offsetted_paths = new ClipperLib.Paths();
  co.MiterLimit = 10;
  co.AddPaths(paths, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon);
  co.Execute(offsetted_paths, delta * scale);
  return offsetted_paths[0].map(pts => [pts.X/scale, pts.Y/scale])
}

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

  console.time("clipper");
  const mainPoints = offset(config.mainPoints, 0)
  const outerPoints = offset(config.mainPoints, config.fin.width/2)
  const innerPoints = offset(config.mainPoints, -config.fin.width/2)
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
      for (let i = config.pointDistance; i < halfDistance; i += config.pointDistance) {
        pts.push(Point.pointOnLine(i, halfDistance)(...halfPair))
      }
      return pts
    }

    let finPoints = []
    finPoints.push(
      pair[0],
      ...calculatePoints([pair[0], midpoint]),
      ...calculatePoints([pair[1], midpoint]).reverse()
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

  console.time("render");

  // document.getElementById("svg").setAttribute('viewBox', viewBox)
  document.getElementById("mainPath").innerHTML = mainPath
  document.getElementById("modules").innerHTML = modules
  document.getElementById("circles").innerHTML = points.map(groupedPoints => groupedPoints.finPoints.map(pair => SVG.circle(...pair)))

  // const viewBox = [-config.offset, -config.offset, config.width+config.offset*2, config.height+config.offset*2].join(" ")
  // document.getElementById("svg").setAttribute('viewBox', viewBox)

  const viewBox = document.getElementById("svg").getBBox()
  document.getElementById("svg").setAttribute('viewBox', [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(" "))

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

const layersFolder = gui.addFolder("layers")
layersFolder.add(defaultConfig.layers, 'labels').onChange(value => draw({ layers: { labels: value }}));
layersFolder.open()


function handleDragStart(event) {
  const circle = event.target
  console.log(circle)
}
for (const circle of [...document.querySelectorAll('circle')]) {
  circle.addEventListener("mousedown", handleDragStart)
}
