const Frame = require("./frame");
const { Point, List } = require("../utils");
const _fp = require("lodash/fp");
import { build } from "../inputs";
import defaultInputs from "../inputs/defaults";

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
  // prettier-ignore
  const {
    width = 2000,
    height = 2000,
    maxHeight = 2200
  } = dimensions;
  const halfWidth = width / 2;

  return [[[halfWidth, 0], [halfWidth, height]]];
};

const quarterSpaceInvader = dimensions => {
  // prettier-ignore
  const {
    width = 114,
    height = 286,
    materialThickness = 18
  } = dimensions;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return [
    [0, materialThickness * 2 - halfHeight],
    [26, materialThickness * 2 - halfHeight],
    [26, -halfHeight],
    [halfWidth, -halfHeight],
    [halfWidth, materialThickness - halfHeight],
    [halfWidth + materialThickness, materialThickness - halfHeight],
    [halfWidth + materialThickness, materialThickness * 2 - halfHeight],
    [halfWidth, materialThickness * 2 - halfHeight],
    [halfWidth, materialThickness],
    [halfWidth + materialThickness, materialThickness],
    [halfWidth + materialThickness, 0]
  ];
};

const finMainPoints = dimensions => {
  let inputs = defaultInputs;
  return build(defaultInputs).mainPoints;
};

function midpoints(minDistance, a, b) {
  const lastIndex = a.length - 1;
  const midpointDistance = Point.length(a[lastIndex], b[0]);
  if (midpointDistance <= minDistance) {
    return [
      ...a.slice(0, lastIndex),
      ...b
      // Point.midpoint(a[lastIndex], b[0]),
      // ...b.slice(1)
    ];
  } else {
    return [...a, ...b];
  }
}
function calculatePoints(inputs, distance, halfPair) {
  const halfDistance = distance / 2;
  let pts = [];
  for (
    let i = inputs.fin.pointDistance;
    i < halfDistance;
    i += inputs.fin.pointDistance
  ) {
    pts.push(Point.pointOnLine(i, halfDistance)(...halfPair));
  }
  return pts;
}

// const addModules = points => {
//   const angle = Point.angle(points[0], points[1])
// }

const fin = _fp.flow(
  finMainPoints,
  List.loopifyInPairs,
  _fp.map(Frame.calculateFrameEdgePoints)
);

const reinforcer = points => {
  return points;
};

module.exports = {
  connector: _fp.flow(halfConnector, Point.yMirror),
  wall: _fp.flow(halfWall, Point.yMirror),
  spaceInvader: _fp.flow(quarterSpaceInvader, Point.yMirror, Point.xMirror),
  fin,
  reinforcer
};
