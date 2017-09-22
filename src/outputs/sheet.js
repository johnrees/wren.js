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

function _sheet(pair, pos, dir, { width, height: maxSheetHeight }) {
  const start = pair[0].points[pos];
  const end = pair[1].points[pos];
  const totalLength = Point.length(start, end);

  let arr = [];
  const numSheets = Math.ceil(totalLength / maxSheetHeight);

  for (let i = 0; i < numSheets; i++) {
    // const length = Math.min(totalLength, maxSheetHeight);
    const length = totalLength - maxSheetHeight * i; // - 18
    const rotate = Point.rotateAroundPoint(start, pair[0].angle);
    const [x, y] = start;
    arr.push(
      oneSheet([x + maxSheetHeight * i, y], width, length, dir).map(rotate)
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
