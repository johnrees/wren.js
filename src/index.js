import { Misc } from "./utils";
import merge from "lodash/merge";
import defaultInputs from "./inputs/defaults";
import Outputs from "./outputs";
import Inputs from "./inputs";

Misc.disableConsole(!defaultInputs.DEBUG);

function Wren(inputsOverrides = {}, callback) {
  let inputs = defaultInputs;

  const update = (inputsOverrides = {}) => {
    inputs = merge(inputs, inputsOverrides);
    inputs.mainPoints = Inputs.calculateDefaultPoints(inputs);
    callback({
      inputs,
      outputs: Outputs(inputs)
    });
  };
  update(inputsOverrides);

  return {
    inputs,
    update
  };
}

module.exports = Wren;
