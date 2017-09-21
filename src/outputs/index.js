import { List, SVG, Point } from "../utils";
import block from "./block";
import sheet from "./sheet";
import Points from "./points";

function midpoints(minDistance, a, b) {
  const lastIndex = a.length - 1;
  const midpointDistance = Point.length(a[lastIndex], b[0]);
  if (midpointDistance <= minDistance) {
    return [
      ...a.slice(0, lastIndex),
      ...b
      // Point.midpoint(a[lastIndex], b[0]),
      // ...b.slice(1)
    ];
  } else {
    return [...a, ...b];
  }
}

function build(inputs) {
  // const sheets = inputs.layers.sheets
  //   ? SVG.path([
  //       [0, 0],
  //       [0, inputs.material.height],
  //       [inputs.material.width, inputs.material.height],
  //       [inputs.material.width, 0]
  //     ])
  //   : "";

  console.time("clipper");
  const { main: mainPoints, outer: outerPoints, inner: innerPoints } = Points(
    inputs.mainPoints,
    inputs.fin.width
  );
  console.timeEnd("clipper");

  console.time("calculations");
  const mainPointPairs = List.loopifyInPairs(mainPoints);
  const lineLengths = mainPointPairs.map(pair => Point.length(...pair));

  const points = mainPointPairs.reduce((arr, pair, index) => {
    const midpoint = Point.midpoint(...pair);
    const distance = Point.length(...pair);
    const halfDistance = distance / 2;

    function calculatePoints(halfPair) {
      let pts = [];
      for (
        let i = inputs.fin.pointDistance;
        i < halfDistance;
        i += inputs.fin.pointDistance
      ) {
        pts.push(Point.pointOnLine(i, halfDistance)(...halfPair));
      }
      return pts;
    }

    let finPoints = [];
    finPoints.push(
      pair[0],
      ...midpoints(
        inputs.fin.pointDistance * 0.75,
        calculatePoints([pair[0], midpoint]),
        calculatePoints([pair[1], midpoint]).reverse()
      )
    );

    return arr.concat({
      points: {
        main: pair,
        inner: innerPoints[index],
        outer: outerPoints[index]
      },
      finPoints,
      distance,
      angle: Point.angle(...pair)
    });
  }, []);

  const mainPath = SVG.path(inputs.mainPoints, {
    "stroke-dasharray": "5, 10",
    stroke: "#CCC"
  });

  const safeIndex = List.safeIndex(points.length);

  const modules = points
    .map((groupedPoints, armIndex) => {
      const previousArm = points[safeIndex(armIndex - 1)];
      return (
        "<g>" +
        groupedPoints.finPoints
          .map((pts, pointIndex) =>
            block(inputs, groupedPoints, pointIndex, previousArm)(...pts)
          )
          .join("") +
        "</g>"
      );
    })
    .join("");

  const sheets = inputs.layers.sheets
    ? points
        .map((groupedPoints, armIndex) => {
          return "<g>" + sheet(groupedPoints) + "</g>";
        })
        .join("")
    : "";

  const circles = inputs.layers.circles
    ? points
        .map(groupedPoints =>
          groupedPoints.finPoints.map(pair => SVG.circle(...pair)).join("")
        )
        .join("")
    : "";
  console.timeEnd("calculations");

  return {
    sheets,
    points,
    mainPath,
    modules,
    circles
  };
}

module.exports = {
  build
};
