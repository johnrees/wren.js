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
    Object.keys(input).map(key => {
      return h("g", { attrs: { name: key } }, input[key]);
    })
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

const calculateFinPoints = _fp.flow(
  Debug.timeStart("calculate fin points"),
  Geometry.fin,
  Debug.timeEnd("calculate fin points")
);

// prettier-ignore
const circles = _fp.flow(
  _fp.flatMap(debugPoints)
);

const modules = _fp.flow(
  Debug.timeStart("modules"),
  _fp.map(attachModulesToFinEdgePoints),
  Debug.timeEnd("modules"),
  _fp.map(connectPoints)
);

const finPoints = calculateFinPoints();

// prettier-ignore
const draw = _fp.flow(
  makeSVG,
  doPatch
)({
  circles: circles(finPoints),
  modules: modules(finPoints)
});
