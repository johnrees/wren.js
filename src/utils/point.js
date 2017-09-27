const _getXY = (start, end) => [end[0] - start[0], end[1] - start[1]];

/**
 * Calculates the distance between two points
 * @returns {Number}
 */
const length = (start, end) => {
  const [x, y] = _getXY(start, end);
  return Math.hypot(x, y);
};

/**
 * Returns a point at a given distance on a line
 * @returns {Array}
 */
const pointOnLine = (distance, length) => (start, end) => {
  const [x, y] = _getXY(start, end);
  return [start[0] + x / length * distance, start[1] + y / length * distance];
};

const subject = [[0, 0], [0, 100], [-100, 0]];
const result = [[-100, 0], [100, 0], [0, 100]];

const yMirror = points => {
  return [...points, ...points.map(([x, y]) => [-x, y]).reverse()];
};

const xMirror = points => {
  return [...points, ...points.map(([x, y]) => [x, -y]).reverse()];
};

/**
 * Returns a point at a percentage distance between two points
 * @returns {Array}
 */
const percentageOnLine = (percentage = 0.5) => (start, end) => {
  const [x, y] = _getXY(start, end);
  return [start[0] + x * percentage, start[1] + y * percentage];
};

/**
 * Rotates a point rotated around a given axis point (in radians)
 * @returns {Array}
 */
const rotateAroundPoint = ([originX, originY], angle = 0) => (
  [pointX, pointY]
) => {
  return [
    Math.cos(angle) * (pointX - originX) -
      Math.sin(angle) * (pointY - originY) +
      originX,
    Math.sin(angle) * (pointX - originX) +
      Math.cos(angle) * (pointY - originY) +
      originY
  ];
};

/**
 * Calculates the angle (in radians) of a line drawn between two points
 * @returns {Number}
 */
const angle = (start, end) => {
  const [x, y] = _getXY(start, end);
  return Math.atan2(y, x);
};

/**
 * Converts radians into degrees of rotation
 * @returns {Number}
 */
const rad2deg = rads => rads / Math.PI * 180;

module.exports = {
  distance: length,
  length,
  angle,
  pointOnLine,
  midpoint: percentageOnLine(0.5),
  rotateAroundPoint,
  rad2deg,
  yMirror,
  xMirror
};
