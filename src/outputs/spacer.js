import { Point, SVG } from "../utils";

function _orangepath(points) {
  return SVG.path(points, { stroke: "orange" });
}

function _spacer(
  pair,
  pos,
  dir,

) {
  const { notchHeight, width, height: maxSheetHeight } = inputs.material
  const angle = pair[0].angle;
  const start = pair[0].points[pos];
  const end = pair[1].points[pos];
  const totalLength = Point.length(start, end);
  const rotate = Point.rotateAroundPoint(start, angle);
  return [[
    [start[0],start[1]],
    [start[0] + totalLength,start[1]],
    [start[0] + totalLength,start[1] - inputs.fin.spacer.width],
    [start[0],start[1] - inputs.fin.spacer.width],
    [start[0],start[1]],
  ].map(rotate)]
}

function spacer(inputs, pairOfGroupedPoints) {
  return [
    // ..._spacer(pairOfGroupedPoints, "outer", -1, inputs).map(_orangepath),
  ].join("");
}

module.exports = spacer;
