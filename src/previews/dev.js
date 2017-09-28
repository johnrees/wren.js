var _fp = require("lodash/fp");

const { SVG, List, Point, Debug } = require("../utils");
const Geometry = require("../outputs/geometries");

const snabbdom = require("snabbdom");
const patch = snabbdom.init([require("snabbdom/modules/attributes").default]);
const h = require("snabbdom/h").default;

const container = document.getElementById("svg-container");

const connectPoints = points =>
  h("path", { attrs: { d: SVG.makePathFromPoints(points) } });

const debugPoints = points =>
  points.map(([cx, cy]) =>
    h("circle", { attrs: { cx, cy, r: 10, fill: "black" } })
  );

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

const attachModulesToFinEdgePoints = points => {
  const angle = Point.angle(points[0], points[1]);
  let result = [[], []];
  points.slice(1, -1).map(([cx, cy], index, { length }) => {
    result[0].push(Geometry.finModule(cx, cy, angle, 0, index, length));
    result[1].unshift(Geometry.finModule(cx, cy, angle, 1, index, length));
  });
  return result[0].concat(result[1]);
};

// prettier-ignore
const calculateFinPoints = _fp.flow(
  Debug.timeStart('calc fin'),
  Geometry.fin,
  Debug.timeEnd('calc fin')
)

const modules = _fp.flow(
  calculateFinPoints,
  Debug.timeStart("modules"),
  _fp.map(attachModulesToFinEdgePoints),
  Debug.timeEnd("modules"),
  _fp.map(connectPoints),
  makeSVG,
  doPatch
)();
