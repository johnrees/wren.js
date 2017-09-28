const timeStart = name => _ => {
  console.time(name);
  return _;
};

const timeEnd = name => _ => {
  console.timeEnd(name);
  return _;
};

module.exports = {
  timeStart,
  timeEnd
};
