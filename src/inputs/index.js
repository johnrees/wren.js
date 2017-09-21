import merge from "lodash/merge";
import defaultInputs from "./defaults";

function build(existingInputs, overrides) {
  const inputs = merge(existingInputs, overrides);
  inputs.mainPoints = _calculateDefaultPoints(inputs);
  return inputs;
}

function _calculateDefaultPoints(config) {
  return [
    [0, config.dimensions.height],
    [config.dimensions.width, config.dimensions.height],
    [
      config.dimensions.width,
      config.dimensions.height - config.dimensions.wallHeight
    ],
    [config.dimensions.width / 2 + config.dimensions.roofOffset, 0],
    [0, config.dimensions.height - config.dimensions.wallHeight]
  ];
}

module.exports = {
  build
};
