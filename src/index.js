import { Misc } from "./utils";
import merge from "lodash/merge";
import defaultInputs from "./inputs/defaults";
import Outputs from "./outputs"
import Inputs from "./inputs"

Misc.disableConsole(!defaultInputs.DEBUG);

function Wren(inputsOverrides={}) {
  const inputs = merge(defaultInputs, inputsOverrides)
  inputs.mainPoints = Inputs.calculateDefaultPoints(inputs);

  return {
    inputs,
    outputs: Outputs(inputs),
    update: console.log
  }
}

// Wren.prototype = {
//   get inputs() {
//     return this._inputs
//   },
//   set inputs(newInputs) {
//     this._inputs = merge(defaultInputs, this._inputs, newInputs);
//     // calculate(this._inputs)
//   }
// }

module.exports = Wren;
