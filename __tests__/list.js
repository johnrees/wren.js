import List from "../src/utils/List"

test("shiftRight", () => {
  const subject = ['a', 'b', 'c', 'd']
  const result = ['d', 'a', 'b', 'c']
  expect(List.shiftRight(1)(subject)).toEqual(result)
});


test("shiftRight array length", () => {
  const subject = ['a', 'b', 'c', 'd']
  const result = ['a', 'b', 'c', 'd']
  expect(List.shiftRight(4)(subject)).toEqual(result)
});

test("shiftLeft", () => {
  const subject = ['a', 'b', 'c', 'd']
  const result = ['b', 'c', 'd', 'a']
  expect(List.shiftLeft(1)(subject)).toEqual(result)
});