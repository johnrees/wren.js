var _fp = require("lodash/fp");
const SVG = require("../utils/svg");

const h = require("snabbdom/h").default;
const init = require("snabbdom-to-html/init");
const attributes = require("snabbdom-to-html/modules/attributes");
const toHTML = init([attributes]);

const calculatePoints = inputs => {
  return [
    [0, inputs.height],
    [inputs.width, inputs.height],
    [inputs.width, inputs.height - inputs.wallHeight],
    [inputs.width / 2 + inputs.roofOffset, 0],
    [0, inputs.height - inputs.wallHeight]
  ];
};

const inputs = {
  height: 4000,
  width: 3900,
  wallHeight: 2800,
  roofOffset: 0
};

const connectDots = points => h("path", { attrs: { d: SVG.makePathFromPoints(points) } });

const svg = input => h("svg", input);
// const svg = input => _fp.curry(h, 3)('svg')

const result = _fp.flow(
  calculatePoints,
  connectDots,
  svg,
  toHTML,
  console.log
)(inputs);
