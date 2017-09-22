import { Point, SVG } from "../utils";

function oneSheet([x, y], width, length, dir) {
  // const newY = y; // + (x < 0 ? -1200 : 1200)
  return [
    [x, y],
    [x, y + width * dir],
    [x + length, y + width * dir],
    [x + length, y]
  ];
}

function _sheet(pair, pos, dir, { width, height }) {
  const start = pair[0].points[pos];
  const end = pair[1].points[pos];
  const distance = Point.length(start, end);
  const length = Math.min(distance, height);

  const rotate = Point.rotateAroundPoint(start, pair[0].angle);

  return [oneSheet(start, width, length, dir).map(rotate)];
}

function _redpath(points) {
  return SVG.path(points, { stroke: "red" });
}

function _greenpath(points) {
  return SVG.path(points, { stroke: "green" });
}

function sheet(inputs, pairOfGroupedPoints) {
  // const sortedPair = pairOfGroupedPoints.sort( (a,b) => {
  //   return b.points.inner[0] - a.points.inner[0]
  // })
  return [
    ..._sheet(pairOfGroupedPoints, "outer", -1, inputs.material).map(_redpath),
    ..._sheet(pairOfGroupedPoints, "inner", 1, inputs.material).map(_greenpath)
  ].join("");
}

module.exports = sheet;
