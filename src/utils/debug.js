const timeStart = name => _ => {
  console.time(name);
  return _;
};

const timeEnd = name => _ => {
  console.timeEnd(name);
  return _;
};

const log = _ => {
  console.log(_);
  return _;
};

module.exports = {
  timeStart,
  timeEnd,
  log
};
