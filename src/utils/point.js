const _getXY = (start, end) => [end[0] - start[0], end[1] - start[1]]

const length = (start, end) => {
  const [x, y] = _getXY(start, end)
  return Math.hypot(x, y)
}

const pointOnLine = (distance, length) => (start, end) => {
  const [x, y] = _getXY(start, end)
  return [start[0] + x/length * distance, start[1] + y/length * distance]
}

const percentageOnLine = (percentage = 0.5) => (start, end) => {
  const [x, y] = _getXY(start, end)
  return [start[0] + x * percentage, start[1] + y * percentage];
};

const rotateAroundPoint = ([originX, originY], angle=0) => ([pointX, pointY]) => {
  return [
    Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
    Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
  ]
}

const angle = (start, end) => {
  const [x, y] = _getXY(start, end)
  return Math.atan2(y, x);
}

const midpoint = percentageOnLine(0.5);

module.exports = {
  length,
  angle,
  pointOnLine,
  midpoint,
  rotateAroundPoint
}
