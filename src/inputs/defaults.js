const config = {
  DEBUG: true,
  dimensions: {
    width: 3900,
    height: 4200,
    roofOffset: 0,
    wallHeight: 2400
  },
  sheet: {
    crenellations: {
      merlon: {
        width: 80,
        height: 65
      },
      crenel: {
        width: 120
      }
    }
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
    width: 1220,
    notchHeight: 18 //18
  },
  layers: {
    labels: false,
    sheets: true,
    circles: false
  },
  svg: {
    padding: 400
  }
};

module.exports = config;
