import React from 'react-native';
var { AsyncStorage } = React;

var ROUTES_LIST = 'ROUTES_LIST';

var Route = function(from, to, options) {
  this.from = from;
  this.to = to;
  this.options = { preferredTrain: options.preferredTrain, };
};

Route.prototype.save = function(callback) {
  return AsyncStorage.getItem(ROUTES_LIST)
    .then((routesJson) => {
      var routes = JSON.parse(routesJson) || {};
      routes[this.compileKey()] = [this.from, this.to, this.options];
      return AsyncStorage.setItem(
        ROUTES_LIST,
        JSON.stringify(routes)
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

Route.prototype.compileKey = function() {
  return "" + this.from + "," + this.to;
};

Route.find = function(from, to) {
  return AsyncStorage.getItem(ROUTES_LIST)
    .then(function(result) {
      var routes = JSON.parse(result) || {};
      var key = new Route(from, to).compileKey();
      var route = routes[key];

      if (route) {
        return new Route(...route);
      }
      throw new Route.NoKnownRouteError();
    });
};

Route.all = function() {
  return AsyncStorage.getItem(ROUTES_LIST)
    .then(function(result) {
      var routes = JSON.parse(result) || {};
      return Object.keys(routes).map(function(route) {
        return new Route(...routes[route]);
      });
    });
};

Route.NoKnownRouteError = function(message) {
  this.name = 'NoKnownRouteError';
  this.message = message || 'No known route';
}

Route.NoKnownRouteError.prototype = Object.create(Error.prototype);
Route.NoKnownRouteError.prototype.constructor = Route.NoKnownRouteError;

export default Route;
