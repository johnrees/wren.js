var _fp = require("lodash/fp");

const { SVG, List, Point, Debug } = require("../utils");
const Geometry = require("../outputs/geometries");
const Points = require("../outputs/points");
const Frame = require("../outputs/frame");

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
          const p = 5;
          vnode.elm.setAttribute(
            "viewBox",
            [
              viewBox.x - p,
              viewBox.y - p,
              viewBox.width + p * 2,
              viewBox.height + p * 2
            ].join(" ")
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

const makeCorners = ([mainPoints, ioPoints]) => {
  // mainPoints = [main[leftEnd, mid, rightEnd]*5]
  // ioPoints = [outer[mid]*5, inner[mid]*5]
  let result = [];
  for (let i = 0; i < mainPoints.length; i++) {
    const [start, middle, end] = mainPoints[i];
    const firstAngle = Point.angle(start, middle);
    const secondAngle = Point.angle(middle, end);

    result.push([
      Point.rotateAroundPoint(start, firstAngle)([
        start[0] + 150,
        start[1] + 125
      ]),
      Point.rotateAroundPoint(start, firstAngle)([
        start[0] + 150,
        start[1] - 125
      ]),
      ioPoints[0][i],
      Point.rotateAroundPoint(end, secondAngle)([end[0] - 150, end[1] - 125]),
      Point.rotateAroundPoint(end, secondAngle)([end[0] - 150, end[1] + 125]),
      ioPoints[1][i]
    ]);
  }
  return result;
};

const allPoints = _fp.flow(Geometry.finMainPoints, Points)();

const calculateFinPoints = _fp.flow(
  _fp.get("main"),
  List.loopifyInPairs,
  _fp.map(Frame.calculateFrameEdgePoints)
)(allPoints);

const cornerMainPoints = _fp.flow(
  List.loopifyInPairs,
  _fp.map(([first, second]) => [...first.slice(-2), second[1]]),
  List.shiftRight(1)
  // _fp.flatMap(debugPoints)
)(calculateFinPoints);

const cornerInnerOuterPoints = _fp.flow(
  _fp.pick(["outer", "inner"]),
  _fp.values
  // _fp.flatMap(debugPoints),
)(allPoints);

const corners = _fp.flow(makeCorners, _fp.map(connectPoints))([
  cornerMainPoints,
  cornerInnerOuterPoints
]);

console.log(corners);

// prettier-ignore
const circles = _fp.flow(
  _fp.flatMap(debugPoints)
);

const modules = _fp.flow(
  // _fp.get('main'),
  Debug.timeStart("modules"),
  _fp.map(attachModulesToFinEdgePoints),
  Debug.timeEnd("modules"),
  _fp.map(connectPoints)
);

// prettier-ignore
const draw = _fp.flow(
  makeSVG,
  doPatch
)({
  circles: circles(calculateFinPoints),
  modules: modules(calculateFinPoints),
  corners: corners
  // corners: cornerMainPoints,
  // cornerOI: cornerInnerOuterPoints
});
