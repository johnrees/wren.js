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
    spacer: {
      width: 78
    },
    grip: {
      width: 180,
      holeWidth: 60
    }
  },
  material: {
    thickness: 18,
    height: 2440,
    width: 1220,
    notchHeight: 18 //18
  },
  layers: {
    labels: false,
    sheets: false,
    spacers: true,
    circles: false,
    paths: true
  },
  svg: {
    padding: 400
  }
};

module.exports = config;
