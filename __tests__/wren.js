import Wren from "../src"

test("it works", done => {
  function callback(data) {
    expect(data).toBeTruthy()
    done()
  }
  const wren = Wren({}, callback)
});

describe("outputs", () => {
  test("it includes points", done => {
    function callback(data) {
      expect(Object.keys(data.outputs)).toEqual(["sheets", "points", "mainPath", "modules", "circles"])
      done()
    }
    const wren = Wren({}, callback)
  });
})
