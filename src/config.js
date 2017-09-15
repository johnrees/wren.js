const config = {
  width: 4200,
  height: 4000,
  wallHeight: 2000,
  frameWidth: 150
}
config.halfWidth = config.width/2

// config.mainPoints = [
//   [-config.halfWidth, 0],
//   [config.halfWidth, 0],
//   [config.halfWidth, config.wallHeight],
//   [0, config.height],
//   [-config.halfWidth, config.wallHeight]
// ]

config.mainPoints = [
  [0, config.height],
  [config.width, config.height],
  [config.width, config.height - config.wallHeight],
  [config.halfWidth, 0],
  [0, config.height - config.wallHeight]
]

module.exports = config
