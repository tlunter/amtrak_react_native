import stations from '../stations.json';

const stationsByCode = stations.reduce(
  (acc, station) => {
    acc[station.code.toLowerCase()] = station;
    return acc;
  },
  {}
);

const stationsByName = stations.reduce(
  (acc, station) => {
    acc[station.autoFillName.toLowerCase()] = station;
    return acc;
  },
  {}
);

class Stations {
  static findByCode(code) {
    return stationsByCode[code.trim().toLowerCase()];
  }

  static filter(searchString) {
    const value = searchString.trim().toLowerCase();

    return Object.entries(stationsByName)
      .filter(([name, station]) => name.includes(value))
      .map(([name, station]) => station);
  }
}

export default Stations;
