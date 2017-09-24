import Wren from "..";
import HUD from "../ui/hud";

function render(data) {
  console.time("render");
  document.getElementById("sheets").innerHTML = data.outputs.sheets;
  document.getElementById("mainPath").innerHTML = data.outputs.mainPath;
  // document.getElementById("modules").innerHTML = data.outputs.modules;
  document.getElementById("circles").innerHTML = data.outputs.circles;
  document.getElementById("spacers").innerHTML = data.outputs.spacers;
  document.getElementById("paths").innerHTML = data.outputs.paths;

  const viewBox = document.getElementById("svg").getBBox();
  document
    .getElementById("svg")
    .setAttribute(
      "viewBox",
      [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(" ")
    );
  console.timeEnd("render");
}

const wren = Wren({ dimensions: { roofOffset: 500 } }, render);
HUD(wren);
