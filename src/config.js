const config = {
  width: 3900,
  height: 4300,
  roofOffset: 0,
  wallHeight: 2400,
  frameWidth: 150,
  offset: 400,
  pointDistance: 300,
  fin: {
    width: 250,
    grip: {
      width: 180,
      holeWidth: 60
    },
  },
  material: {
    thickness: 18
  }
}

// config.mainPoints = [
//   [-config.halfWidth, 0],
//   [config.halfWidth, 0],
//   [config.halfWidth, config.wallHeight],
//   [0, config.height],
//   [-config.halfWidth, config.wallHeight]
// ]

module.exports = config