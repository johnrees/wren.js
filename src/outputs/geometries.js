const Point = require("../utils/point");
const _fp = require("lodash/fp");

const halfConnector = dimensions => {
  const {
    width = 1200,
    height = 250,
    hookHeight = 110,
    hookWidth = 39,
    bottomPegWidth = 80
  } = dimensions;
  const halfWidth = width / 2;

  return [
    [halfWidth, 0],
    [halfWidth, hookHeight],
    [halfWidth - hookWidth, hookHeight],
    [halfWidth - hookWidth, hookHeight - 65],
    [halfWidth - hookWidth - hookWidth, hookHeight - 65],
    [halfWidth - hookWidth - hookWidth, height],
    [bottomPegWidth / 2, height],
    [bottomPegWidth / 2, height + 18]
  ];
};

const halfWall = dimensions => {
  const { width = 2000, height = 2000 } = dimensions;
  const halfWidth = width / 2;

  return {
    outline: [[halfWidth, 0], [halfWidth, height]],
    holes: [],
    labels: []
  };
};

const mirrorGeometry = geometry => {
  return {
    outline: Point.yMirror(geometry.outline),
    holes: geometry.holes,
    labels: geometry.labels
  };
};

module.exports = {
  connector: _fp.flow(halfConnector, Point.yMirror),
  wall: _fp.flow(halfWall, mirrorGeometry)
};
