import { List, SVG, Point } from "../utils";
import { midpoints, calculatePoints } from "./utils";
import { block } from "./block";
import sheet from "./sheet";
import spacer from "./spacer";
import Points from "./points";

function build(inputs) {
  console.time("clipper");
  const { main: mainPoints, outer: outerPoints, inner: innerPoints } = Points(
    inputs.mainPoints,
    inputs.fin.width
  );
  console.timeEnd("clipper");

  console.time("calculations");
  const mainPointPairs = List.loopifyInPairs(mainPoints);

  const points = mainPointPairs.reduce((arr, pair, index) => {
    const midpoint = Point.midpoint(...pair);
    const distance = Point.length(...pair);

    let finPoints = [];
    finPoints.push(
      // pair[0],
      ...midpoints(
        inputs.fin.pointDistance * 0.75,
        calculatePoints(inputs, distance, [pair[0], midpoint]),
        calculatePoints(inputs, distance, [pair[1], midpoint]).reverse()
      )
    );

    for (let i = 0; i < finPoints.length; i++) {
      finPoints[i] = {
        type: i < 2 || i > finPoints.length - 2 ? "LOCKED" : "OPEN",
        points: finPoints[i]
      };
    }

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
          .map((pts, pointIndex) => {
            return block(inputs, groupedPoints, pointIndex, previousArm)(
              ...pts.points
            );
          })
          .join("") +
        "</g>"
      );
    })
    .join("");

  const sheets = inputs.layers.sheets
    ? List.loopifyInPairs(points)
        .map(pairOfGroupedPoints => {
          return "<g>" + sheet(inputs, pairOfGroupedPoints) + "</g>";
        })
        .join("")
    : "";

  const spacers = inputs.layers.spacers
    ? List.loopifyInPairs(points)
        .map(pairOfGroupedPoints => {
          return "<g>" + spacer(inputs, pairOfGroupedPoints) + "</g>";
        })
        .join("")
    : "";

  const circles = inputs.layers.circles
    ? points
        .map(groupedPoints =>
          groupedPoints.finPoints
            .map(pair => {
              return SVG.circle(...pair.points, {
                r: pair.type === "LOCKED" ? 40 : 20
              });
            })
            .join("")
        )
        .join("")
    : "";

  const paths = inputs.layers.paths
    ? // ? SVG.path([[0,0], [0,100], [100,100]], { fill: 'red', stroke: 'none' })
      drawFin(points)
    : // ? SVG.path(points.map(groupedPoints => groupedPoints.points.outer), { stroke: 'green' }) +
      //   SVG.path(points.map(groupedPoints => groupedPoints.points.main), { stroke: 'pink' }) +
      //   SVG.path(points.map(groupedPoints => groupedPoints.points.inner), { stroke: 'red' })
      "";

  // function crenelate(points, angle) {
  //   const pointPairs = List.loopifyInPairs(points)
  //   let ps = []
  //   let flipFlop = false
  //   for (const pair of pointPairs) {
  //     const rotate = Point.rotateAroundPoint(point, angle);
  //     const midpoint = Point.midpoint(pair)
  //     ps.push(
  //       pair[0],
  //       midpoint
  //     )
  //   }
  //   return points
  // }

  function crenelate(points, angle, paths) {
    let lines = [];
    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i];
      const midpoint = Point.midpoint(point, points[i + 1]);

      lines.push(point);
      lines.push(midpoint);
      lines.push(
        Point.rotateAroundPoint(midpoint, angle - Math.PI / 2)([
          midpoint[0] + 100,
          midpoint[1]
        ])
      );
      lines.push(
        Point.rotateAroundPoint(points[i + 1], angle - Math.PI / 2)([
          points[i + 1][0] + 100,
          points[i + 1][1]
        ])
      );
      lines.push(points[i + 1]);

      paths.push(SVG.path(lines));
    }

    // const pointPairs = List.loopifyInPairs(points)
    // for (const pair of pointPairs) {
    //   const distance = Point.distance(...pair)
    //   for (let i = 0; i < )
    // }
  }

  function drawFin(points) {
    const pairedPoints = List.loopifyInPairs(points);
    const paths = [];

    for (const pair of pairedPoints) {
      paths.push(SVG.path(pair.map(p => p.points.outer), { stroke: "green" }));
      paths.push(SVG.path(pair.map(p => p.points.main), { stroke: "purple" }));
      paths.push(SVG.path(pair.map(p => p.points.inner), { stroke: "red" }));
    }

    // for (let i = 0; i < points.length; i++) {
    //   const point = points[i]
    //   const y = i * 50
    //   paths.push(
    //     SVG.path([
    //       [0,y],
    //       [point.distance, y],
    //     ].map(p => Point.translate(p, point.points.main[0]) ))
    //   )
    // }

    let innerPoints = [];
    let outerPoints = [];

    let lineOuter;

    for (const line of points) {
      let lineOuter = [];
      innerPoints.push(line.points.inner);
      outerPoints.push(line.points.outer);
      // line.finPoints.map(fp => paths.push(SVG.circle(...fp.points)) )
      for (const finPoint of line.finPoints) {
        const point = finPoint.points;
        const rotate = Point.rotateAroundPoint(point, line.angle);
        const ps = {
          main: point,
          inner: rotate([point[0], point[1] + 125]),
          outer: rotate([point[0], point[1] - 125])
        };
        innerPoints.push(ps.inner);
        outerPoints.push(ps.outer);

        lineOuter.push(ps.outer);
        // paths.push(SVG.circle(...ps.main))
        // paths.push(SVG.circle(...ps.inner, { r: 10 }))
        // paths.push(SVG.circle(...ps.outer))
      }
      crenelate(lineOuter, line.angle, paths);
    }
    // paths.push(innerPoints.map(i => SVG.circle(...i)))
    // paths.push(outerPoints.map(i => SVG.circle(...i)))

    // for (let i = 0; i < points.length; i++) {
    //   const point = points[i]
    //   const fps = point.finPoints//.filter(fp => fp.type !== "LOCKED")
    //   paths.push(fps.map( (pair, index) => SVG.circle(...pair.points, { r: 50 })))
    // }
    return paths.join("");
    // return SVG.path(points.map(groupedPoints => groupedPoints.points.outer), { stroke: 'green' })
  }

  console.timeEnd("calculations");

  return {
    sheets,
    spacers,
    points,
    mainPath,
    modules,
    circles,
    paths
  };
}

module.exports = {
  build
};
