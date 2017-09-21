function calculateDefaultPoints(config) {
  return [
    [0, config.dimensions.height],
    [config.dimensions.width, config.dimensions.height],
    [
      config.dimensions.width,
      config.dimensions.height - config.dimensions.wallHeight
    ],
    [config.dimensions.width / 2 + config.dimensions.roofOffset, 0],
    [0, config.dimensions.height - config.dimensions.wallHeight]
  ];
}

module.exports = {
  calculateDefaultPoints
};
