import stations from '../stations.json';

export default class Stations {
  static findByCode(code) {
    return stations.find(station => station.code.toLowerCase() === code.toLowerCase());
  }

  static filter(searchString) {
    const value = searchString.toLowerCase();

    return stations.filter(station => {
      const stationName = station.autoFillName.toLowerCase();
      return stationName.indexOf(value) > -1;
    });
  }
}
