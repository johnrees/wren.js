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

// prettier-ignore
const finPoints = _fp.flow(
  Debug.timeStart('calc fin'),
  Geometry.fin,
  Debug.timeEnd('calc fin')
)

// prettier-ignore
// const debugFinPoints = _fp.flow(
//   finPoints,
//   _fp.flatten,
//   debugPoints,
//   makeSVG,
//   doPatch,
// )({});

// prettier-ignore
const module = (x,y,angle,index,i,{length}) => {
  const rotate = Point.rotateAroundPoint([x,y],angle)
  let points = []
  if (index === 0) {
    if (i === 0) {
      points.push(...[
        [0, 200],
        [-50, 200],
        [-50, 150],
        [0, 150],
        [0, 100],
        [-50, 100],
        [-50, 50],
        [0, 50],
      ])
    }
    points.push(...[
      [0,0],
        [60,0],
        [60,-18],
        [240,-18],
        [240,0],
      [300,0]
    ])
  } else {
    if (i === length-1) {
      points.push(...[
        [350, 0],
        [350, 50],
        [300, 50],
        [300, 100],
        [350, 100],
        [350, 150],
        [300, 150],
        [300, 200],
        [350, 200],
        [350, 250],
      ])
    }
    points.push(...[
      [300,250],
        [240,250],
        [240,268],
        [60,268],
        [60,250],
      [0,250]
    ])
  }

  return points.map( ([_x, _y]) => rotate([_x+x-150, _y+y-125]))
}

const addModules = pointGroups => {
  return pointGroups.map(points => {
    const angle = Point.angle(points[0], points[1]);
    const piecePoints = [
      ...points
        .slice(1, -1)
        .map(([cx, cy], index, pts) => module(cx, cy, angle, 0, index, pts)),
      ...points
        .slice(1, -1)
        .map(([cx, cy], index, pts) => module(cx, cy, angle, 1, index, pts))
        .reverse()
    ];

    return h("path", {
      attrs: {
        d: SVG.makePathFromPoints(piecePoints),
        fill: "none",
        stroke: "black"
      }
    });
  });
};

const modules = _fp.flow(
  finPoints,
  Debug.timeStart('modules'),
  addModules,
  Debug.timeEnd('modules'),
  _fp.flatten,
  makeSVG,
  doPatch,
)({});

// prettier-ignore
// const reinforcer = _fp.flow(
//   Geometry.reinforcer,
//   console.log
//   // debugPoints,
//   // makeSVG,
//   // doPatch
// )([
//   [-100,0],
//   [0,100],
//   [100,0]
// ]);
