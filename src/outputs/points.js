import ClipperLib from "clipper-lib";

function Points(points, finWidth) {
  return {
    main: _offset(points, 0),
    outer: _offset(points, finWidth / 2),
    inner: _offset(points, -finWidth / 2)
  };
}

function _offset(points, delta, scale = 100) {
  const paths = [points.map(pts => ({ X: pts[0] * scale, Y: pts[1] * scale }))];
  const co = new ClipperLib.ClipperOffset();
  const offsetted_paths = new ClipperLib.Paths();
  co.MiterLimit = 10;
  co.AddPaths(
    paths,
    ClipperLib.JoinType.jtMiter,
    ClipperLib.EndType.etClosedPolygon
  );
  co.Execute(offsetted_paths, delta * scale);
  return offsetted_paths[0].map(pts => [pts.X / scale, pts.Y / scale]);
}

module.exports = Points;
