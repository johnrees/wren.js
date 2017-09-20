import Wren from "../src"

test("it works", () => {
  const wren = Wren()
  expect(wren).toBeTruthy()
});

describe("outputs", () => {
  const wren = Wren()

  test("it includes points", () => {
    expect(Object.keys(wren.outputs)).toEqual(['points', 'areas'])
  });
})
