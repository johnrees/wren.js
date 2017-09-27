import Point from "../src/utils/Point"

test("yMirror", () => {
  const subject = [
    [100,0],
    [100,100],
  ]
  const result = [
    [100,0],
    [100,100],
    [-100, 100],
    [-100, 0]
  ]
  expect(Point.yMirror(subject)).toEqual(result)
});
