var _fp = require("lodash/fp");
const SVG = require("../utils/svg");
const List = require("../utils/list");
const Point = require("../utils/point");
const Geometry = require("../outputs/geometries");

const snabbdom = require("snabbdom");
const patch = snabbdom.init([require("snabbdom/modules/attributes").default]);
const h = require("snabbdom/h").default;

const container = document.getElementById("svg-container");

const connectPoints = points =>
  h("path", { attrs: { d: SVG.makePathFromPoints(points) } });

// const circle = (x, y) => `<circle cx="${x}" cy="${y}" r="30" />`;
const debugPoints = points => points.map( ([cx, cy]) => h("circle", { attrs: { cx, cy, r: 100, fill: 'black' } }));

const makeSVG = input =>
  h(
    "svg",
    {
      attrs: {
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        stroke: "black",
        "stroke-width": "1.05",
        fill: "none"
      },
      hook: {
        insert: vnode => {
          const viewBox = vnode.elm.getBBox();
          vnode.elm.setAttribute(
            "viewBox",
            [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(" ")
          );
        }
      }
    },
    input
  );

const doPatch = vnode => patch(container, vnode);

// prettier-ignore
const fin = _fp.flow(
  Geometry.fin,
  debugPoints,
  makeSVG,
  doPatch
)({});
