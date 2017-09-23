import { Point } from "../utils";

function hole(x, y, halfHoleWidth, holeOffset, { thickness }) {
  return [
    [x - halfHoleWidth, y + holeOffset],
    [x + halfHoleWidth, y + holeOffset],
    [x + halfHoleWidth, y + holeOffset - thickness],
    [x - halfHoleWidth, y + holeOffset - thickness],
    [x - halfHoleWidth, y + holeOffset]
  ];
}

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

module.exports = {
  hole,
  midpoints,
  calculatePoints
};
