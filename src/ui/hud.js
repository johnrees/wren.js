import dat from "dat.gui/build/dat.gui";

function HUD({ inputs, update }) {
  const gui = new dat.GUI();

  const dimensionsFolder = gui.addFolder("dimensions");
  dimensionsFolder
    .add(inputs.dimensions, "height")
    .min(2500)
    .max(6000)
    .step(5)
    .onChange(value => update({ dimensions: { height: value } }));

  dimensionsFolder
    .add(inputs.dimensions, "width")
    .min(2000)
    .max(5000)
    .step(5)
    .onChange(value => update({ dimensions: { width: value } }));

  dimensionsFolder
    .add(inputs.dimensions, "wallHeight")
    .min(1700)
    .max(6000)
    .step(5)
    .onChange(value => update({ dimensions: { wallHeight: value } }));

  dimensionsFolder
    .add(inputs.dimensions, "roofOffset")
    .min(-2000)
    .max(2000)
    .step(10)
    .onChange(value => update({ dimensions: { roofOffset: value } }));

  const finFolder = gui.addFolder("fin");
  finFolder
    .add(inputs.fin, "width")
    .min(200)
    .max(400)
    .step(5)
    .onChange(value => update({ fin: { width: value } }));

  const gripFolder = finFolder.addFolder("grip");
  gripFolder
    .add(inputs.fin.grip, "width")
    .min(100)
    .max(400)
    .step(5)
    .onChange(value => update({ fin: { grip: { width: value } } }));

  const materialFolder = gui.addFolder("material");
  materialFolder
    .add(inputs.material, "thickness")
    .min(8)
    .max(30)
    .step(1)
    .onChange(value => update({ material: { thickness: value } }));

  const layersFolder = gui.addFolder("layers");
  layersFolder
    .add(inputs.layers, "labels")
    .onChange(value => update({ layers: { labels: value } }));
  layersFolder
    .add(inputs.layers, "sheets")
    .onChange(value => update({ layers: { sheets: value } }));
  layersFolder
    .add(inputs.layers, "circles")
    .onChange(value => update({ layers: { circles: value } }));
  dimensionsFolder.open();
  gripFolder.open();
  layersFolder.open();
}

module.exports = HUD;
