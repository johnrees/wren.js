import { Point, SVG } from "../utils";
import { hole } from "./block";

function oneSheet([x, y], width, length, dir) {
  // const newY = y; // + (x < 0 ? -1200 : 1200)
  return [
    [x, y],
    [x, y + width * dir],
    [x + length, y + width * dir],
    [x + length, y]
  ];
}

function _sheet(
  pair,
  pos,
  dir,
  { notchHeight, width, height: maxSheetHeight }
) {
  const angle = pair[0].angle;
  const start = pair[0].points[pos];
  const end = pair[1].points[pos];
  const totalLength = Point.length(start, end);

  let sortedStart = start;
  let d = 1;
  if (start[1] < end[1]) {
    sortedStart = end;
    d = -1;
  }

  let arr = [];
  const numSheets = Math.ceil(totalLength / maxSheetHeight);
  for (let i = 0; i < numSheets; i++) {
    const length = Math.min(totalLength - maxSheetHeight * i, maxSheetHeight); // - 18
    const rotate = Point.rotateAroundPoint(sortedStart, angle);
    const [x, y] = sortedStart;
    arr.push(
      oneSheet(
        [x + (maxSheetHeight * i - notchHeight * i) * d, y],
        width,
        (length + notchHeight * i) * d,
        dir
      ).map(rotate)
    );
  }
  return arr;
}

function _redpath(points) {
  return SVG.path(points, { stroke: "red" });
}

function _greenpath(points) {
  return SVG.path(points, { stroke: "green" });
}

function _circle(point, angle, inputs) {
  const rotate = Point.rotateAroundPoint(point, angle);

  // const halfHoleWidth = inputs.fin.grip.holeWidth / 2;
  // const holeOffset = inputs.fin.width / 2;
  // const material = inputs.material;

  const p1 = rotate([point[0], point[1] - inputs.fin.width / 2 - 57]);
  const p2 = rotate([
    point[0],
    point[1] - inputs.material.width - inputs.fin.width / 2 + 57
  ]);
  return (
    SVG.circle(...p1) + SVG.circle(...p2)
    // SVG.path(hole(p1[0], p1[1], halfHoleWidth, holeOffset, material).map(rotate))
  );
}

function sheet(inputs, pairOfGroupedPoints) {
  // const sortedPair = pairOfGroupedPoints.sort( (a,b) => {
  //   return b.points.inner[0] - a.points.inner[0]
  // })
  return [
    ..._sheet(pairOfGroupedPoints, "outer", -1, inputs.material).map(_redpath),
    ..._sheet(pairOfGroupedPoints, "inner", 1, inputs.material).map(_greenpath),
    pairOfGroupedPoints[0].finPoints
      .slice(1)
      .map(p => _circle(p, pairOfGroupedPoints[0].angle, inputs))
  ].join("");
}

module.exports = sheet;
