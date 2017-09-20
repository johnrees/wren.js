function HUD(config, draw) {
  const gui = new dat.GUI();

  const dimensionsFolder = gui.addFolder("dimensions")
  dimensionsFolder.add(config.dimensions, 'height').min(2500).max(6000).step(5).onChange(value => draw({ height: value }));
  dimensionsFolder.add(config.dimensions, 'width').min(2000).max(5000).step(5).onChange(value => draw({ width: value }));
  dimensionsFolder.add(config.dimensions, 'wallHeight').min(1700).max(6000).step(5).onChange(value => draw({ wallHeight: value }));
  dimensionsFolder.add(config.dimensions, 'roofOffset').min(-2000).max(2000).step(10).onChange(value => draw({ roofOffset: value }));
  dimensionsFolder.open()

  const finFolder = gui.addFolder("fin")
  finFolder.add(config.fin, 'width').min(200).max(400).step(5).onChange(value => draw({ fin: { width: value }}));

  const gripFolder = finFolder.addFolder("grip")
  gripFolder.add(config.fin.grip, 'width').min(100).max(400).step(5).onChange(value => draw({ fin: { grip: { width: value }}}));
  gripFolder.open()

  const materialFolder = gui.addFolder("material")
  materialFolder.add(config.material, 'thickness').min(8).max(30).step(1).onChange(value => draw({ material: { thickness: value }}));

  const layersFolder = gui.addFolder("layers")
  layersFolder.add(config.layers, 'labels').onChange(value => draw({ layers: { labels: value }}));
  layersFolder.add(config.layers, 'sheets').onChange(value => draw({ layers: { sheets: value }}));
  layersFolder.open()
}

module.exports = HUD
