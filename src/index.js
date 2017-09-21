import { Misc } from "./utils";
import defaultInputs from "./inputs/defaults";
import Outputs from "./outputs";
import Inputs from "./inputs";

Misc.disableConsole(!defaultInputs.DEBUG);

function Wren(inputsOverrides = {}, callback) {
  let inputs = defaultInputs;

  const update = (inputsOverrides = {}) => {
    inputs = Inputs.build(inputs, inputsOverrides);
    callback({
      inputs,
      outputs: Outputs.build(inputs)
    });
  };
  update(inputsOverrides);

  return {
    inputs,
    update
  };
}

module.exports = Wren;
