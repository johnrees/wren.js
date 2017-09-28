import Frame from "../src/outputs/frame"

describe("calculating frame 1D positions", () => {
  test("custom spacing and minDistance", () => {
    const result = [
      0,
      100,
      200,
      300,
      400,
      500,
      600
    ]
    expect(Frame._calculate1DFrameEdgePoints(600, { spacing: 100, minDistance: 50 })).toEqual(result)
  });

  test("fits perfectly", () => {
    const result = [
      0,
      300,
      600,
      800,
      1100,
      1400
    ]
    expect(Frame._calculate1DFrameEdgePoints(1400)).toEqual(result)
  });

  test("points must be replaced with central point", () => {
    const result = [
      0,
      // 300
      330,
      // 360
      660
    ]
    expect(Frame._calculate1DFrameEdgePoints(660)).toEqual(result)
  });
})

describe("calculating frame points", () => {
  test("calculates points", () => {
    const result = [[-500.130920349, -500.329239], [-288.0192751864307, -288.1768174101716], [-75.90763002386137, -76.02439582034327], [76.01695057486131, 75.92939082034326], [288.1285957374306, 288.0818124101716], [500.2402409, 500.234234]]
    expect(Frame.calculateFrameEdgePoints([[-500.130920349,-500.329239], [500.2402409, 500.234234]])).toEqual(result)
  })
})
