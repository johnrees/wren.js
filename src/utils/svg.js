function _makePathFromPoints(points) {
  const start = `M${points[0]} L`;
  const middle = points
    .slice(1)
    .map(point => `${point}`)
    .join(" ");
  return `${start}${middle}`;
}

const label = (text, transforms) =>
  `<text class="label" transform="${transforms}">${text}</text>`;
// transform="translate(0 0) rotate(-90)"

const path = (points, attributes = {}) => {
  var str = `<path d="${_makePathFromPoints(points)}"`;

  for (var key in attributes) {
    var val = attributes[key].toString();
    str += ` ${key}="${val}"`;
  }

  return str + `></path>`;
};

// const circle = (x, y) => `<circle cx="${x}" cy="${y}" r="30" />`;

const circle = (x, y, extraAttrs = {}) => {
  const attrs = {
    cx: x,
    cy: y,
    r: 30
  };
  const attributes = Object.assign(attrs, extraAttrs);

  let circle = "<circle ";
  for (var key in attributes) {
    const val = attributes[key].toString();
    circle += ` ${key}="${val}"`;
  }

  return circle + "/>";
};

module.exports = {
  path,
  circle,
  label
};
