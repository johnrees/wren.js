const config = {
  DEBUG: true,
  dimensions: {
    width: 3900,
    height: 4300,
    roofOffset: 0,
    wallHeight: 2400
  },
  fin: {
    frameWidth: 150,
    pointDistance: 300,
    width: 250,
    grip: {
      width: 180,
      holeWidth: 60
    }
  },
  material: {
    thickness: 18,
    height: 2440,
    width: 1220
  },
  layers: {
    labels: false,
    sheets: false
  },
  svg: {
    padding: 400
  }
};

module.exports = config;
