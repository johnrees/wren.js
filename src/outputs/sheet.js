import { Point, SVG } from "../utils";

function _sheet([x, y], angle, length, dir) {
  const rotate = Point.rotateAroundPoint([x, y], angle);
  const newY = y; // + (x < 0 ? -1200 : 1200)

  return [
    [x, newY],
    [x, newY + 1200 * dir],
    [x + length, newY + 1200 * dir],
    [x + length, newY]
  ].map(rotate);
}

function sheet(groupedPoints) {
  const length = Math.min(groupedPoints.distance, 2400);
  return (
    SVG.path(
      _sheet(groupedPoints.points.outer, groupedPoints.angle, length, -1),
      { stroke: "red" }
    ) +
    SVG.path(
      _sheet(groupedPoints.points.inner, groupedPoints.angle, length, 1),
      { stroke: "green" }
    )
  );
}

module.exports = sheet;
