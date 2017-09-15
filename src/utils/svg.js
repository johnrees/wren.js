function _makePathFromPoints(points) {
  const start = `M${points[0]} L`;
  const middle = points
    .slice(1)
    .map(point => `${point}`)
    .join(" ");
  return `${start}${middle}`;
}

const path = (points, attributes = {}) => {
  var str = `<path d="${_makePathFromPoints(points)}"`;

  for (var key in attributes) {
    var val = attributes[key].toString();
    str += ` ${key}="${val}"`;
  }

  return str + `></path>`;
};

const circle = (x, y) => `<circle cx="${x}" cy="${y}" r="30" fill="black" />`

module.exports = {
  path,
  circle
}
