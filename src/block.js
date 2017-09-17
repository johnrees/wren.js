const Point = require('./utils/point')
const SVG = require('./utils/svg')

const block = (config, angle, index) => (x,y) => {
  const rotate = Point.rotateAroundPoint([x,y], angle)
  const halfHoleWidth = config.fin.grip.holeWidth/2
  const halfFinWidth = config.fin.width/2
  const halfGripWidth = config.fin.grip.width/2
  const label = config.layers.labels ? SVG.label("POINT " + index, `translate(${x} ${y}) rotate(${Point.rad2deg(angle)})`) : ""
  const holeOffset = halfFinWidth

  if (index === 0) {
    if (y === config.height && x > 0) {
      return "<g>" + SVG.path([
        [x - halfFinWidth - 25, y + halfFinWidth],
        [x - 50, y + halfFinWidth],
          // cutout for rail
          [x - 50, y + 70],
          [x + 50, y + 70],
          [x + 50, y + halfFinWidth + 20],
          [x + 90, y + halfFinWidth + 20],
          [x + 90, y + halfFinWidth],
        [x + halfFinWidth, y + halfFinWidth],
        [x + halfFinWidth, y - halfFinWidth - 25]
      ]) + "</g>"
    }
  } else {
    const holes = SVG.path([
      [x - halfHoleWidth, y + holeOffset],
      [x + halfHoleWidth, y + holeOffset],
      [x + halfHoleWidth, y + holeOffset - config.material.thickness],
      [x - halfHoleWidth, y + holeOffset - config.material.thickness],
      [x - halfHoleWidth, y + holeOffset]
    ].map(rotate)) + SVG.path([
      [x - halfHoleWidth, y - holeOffset],
      [x + halfHoleWidth, y - holeOffset],
      [x + halfHoleWidth, y - holeOffset + config.material.thickness],
      [x - halfHoleWidth, y - holeOffset + config.material.thickness],
      [x - halfHoleWidth, y - holeOffset]
    ].map(rotate))

    return "<g>" + SVG.path([
      [x-config.frameWidth, y+halfFinWidth],
        // [x-90, y+150],
          // dogbone
          [x-100, y+halfFinWidth],
          [x-100, y+halfFinWidth-10],
          [x-halfGripWidth, y+halfFinWidth-10],
        // grip
        [x-halfGripWidth, y+halfFinWidth+config.material.thickness],
        [x+halfGripWidth, y+halfFinWidth+config.material.thickness],
        // [x+90, y+150],
          // dogbone
          [x+halfGripWidth, y+halfFinWidth-10],
          [x+100, y+halfFinWidth-10],
          [x+100, y+halfFinWidth],

      [x+config.frameWidth, y+halfFinWidth],
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
      [x+config.frameWidth, y-halfFinWidth],
        [x+halfGripWidth, y-halfFinWidth],
        [x+halfGripWidth, y-halfFinWidth-config.material.thickness],
        [x-halfGripWidth, y-halfFinWidth-config.material.thickness],
        [x-halfGripWidth, y-halfFinWidth],
      [x-config.frameWidth, y-halfFinWidth],
    ].map(rotate)) + holes + label + "</g>"
  }

}

module.exports = block
