const Point = require('./utils/point')
const SVG = require('./utils/svg')

const block = (config, angle) => (x,y) => {
  const rotate = Point.rotateAroundPoint([x,y], angle)

  const holes = SVG.path([
    [x-30, y + 125],
    [x+30, y + 125],
    [x+30, y + 107],
    [x-30, y + 107],
    [x-30, y + 125]
  ].map(rotate)) + SVG.path([
    [x-30, y - 125],
    [x+30, y - 125],
    [x+30, y - 107],
    [x-30, y - 107],
    [x-30, y - 125]
  ].map(rotate))

  return "<g>" + SVG.path([
    [x-config.frameWidth, y+125],
      // [x-90, y+150],
        // dogbone
        [x-100, y+125],
        [x-100, y+115],
        [x-90, y+115],
      // grip
      [x-90, y+143],
      [x+90, y+143],
      // [x+90, y+150],
        // dogbone
        [x+90, y+115],
        [x+100, y+115],
        [x+100, y+125],

    [x+config.frameWidth, y+125],
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
    [x+config.frameWidth, y-125],
      [x+90, y-125],
      [x+90, y-143],
      [x-90, y-143],
      [x-90, y-125],
    [x-config.frameWidth, y-125],
  ].map(rotate)) + holes + "</g>"
}

module.exports = block
