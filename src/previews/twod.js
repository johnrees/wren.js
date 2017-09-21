import Wren from "..";
import HUD from "../ui/hud";

const wren = Wren()
HUD(wren);

function render() {
  console.time("render");
  document.getElementById("sheets").innerHTML = wren.outputs.sheets;
  document.getElementById("mainPath").innerHTML = wren.outputs.mainPath;
  document.getElementById("modules").innerHTML = wren.outputs.modules;
  document.getElementById("circles").innerHTML = wren.outputs.circles;

  const viewBox = document.getElementById("svg").getBBox();
  document
    .getElementById("svg")
    .setAttribute(
      "viewBox",
      [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(" ")
    );
  console.timeEnd("render");
}
render()
