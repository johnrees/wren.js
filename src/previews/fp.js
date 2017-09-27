var _fp = require("lodash/fp");
const SVG = require("../utils/svg");
const List = require("../utils/list");
const Point = require("../utils/point");
const Geometry = require("../outputs/geometries");

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

const connectPoints = points =>
  h("path", { attrs: { d: SVG.makePathFromPoints(points) } });

const svg = input =>
  h(
    "svg",
    {
      attrs: {
        id: "svg",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        stroke: "black",
        "stroke-width": "1.05",
        fill: "none"
      }
    },
    input
  );
// const svg = input => _fp.curry(h, 3)('svg')

const htmlSVG = _fp.flow(svg, toHTML);

// const connector = _fp.flow(
//   Geometry.connector,
//   connectPoints,
//   htmlSVG,
//   console.log
// )({ width: 300 });

// prettier-ignore
const spaceInvader = _fp.flow(
  Geometry.spaceInvader,
  connectPoints,
  htmlSVG,
  console.log
)({});

// const connectGeometry = geometry =>
//   Object.assign({}, geometry, {
//     outlineGeometry: connectPoints(geometry.outline)
//   });

// const ht = geometry => _fp.flow(svg, toHTML)(geometry.outlineGeometry);

// const wall = _fp.flow(
//   Geometry.wall,
//   connectPoints,
//   htmlSVG,
//   console.log
// )({
//   height: 4000,
//   width: 2000
// });
