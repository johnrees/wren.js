var _fp = require("lodash/fp");
const SVG = require("../utils/svg");
const List = require("../utils/list");
const Point = require("../utils/point");

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

const makePoints = ({ length, height }) => {
  return {
    BL: [0, 0],
    BR: [length, 0],
    TR: [length, height],
    TL: [0, height]
  };
};

const halfConnectorGeometry = dimensions => {
  const {
    width = 1200,
    height = 250,
    hookHeight = 110,
    hookWidth = 39,
    bottomPegWidth = 80
  } = dimensions;

  const halfWidth = width / 2;

  return [
    [halfWidth, 0],
    [halfWidth, hookHeight],
    [halfWidth - hookWidth, hookHeight],
    [halfWidth - hookWidth, hookHeight - 65],
    [halfWidth - hookWidth - hookWidth, hookHeight - 65],
    [halfWidth - hookWidth - hookWidth, height],
    [bottomPegWidth / 2, height],
    [bottomPegWidth / 2, height + 18]
  ];
};
const connectorGeometry = _fp.flow(halfConnectorGeometry, Point.yMirror);

const htmlSVG = _fp.flow(svg, toHTML);

const connector = _fp.flow(
  connectorGeometry,
  connectPoints,
  htmlSVG,
  console.log
)({ width: 1200 });
