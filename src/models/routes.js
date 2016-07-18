import { AsyncStorage } from 'react-native';

var ROUTES_LIST = 'ROUTES_LIST';

function genUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function getRoutes() {
  return AsyncStorage.getItem(ROUTES_LIST)
    .then((result) => JSON.parse(result) || [])
    .then((result) => {
      if (!Array.isArray(result)) { return []; }
      return result;
    });
};

function storeRoutes(routes) {
  return AsyncStorage.setItem(
    ROUTES_LIST,
    JSON.stringify(routes)
  );
}

var Route = function(attributes) {
  if (!attributes) throw new Route.MissingAttributesError();

  this.id = attributes.id || genUUID();
  this.from = attributes.from;
  this.to = attributes.to;
  this.preferredTrain = attributes.preferredTrain;
};

Route.prototype.properties = function() {
  return {
    id: this.id,
    from: this.from,
    to: this.to,
    preferredTrain: this.preferredTrain
  };
}

Route.prototype.save = function() {
  return getRoutes()
    .then((routes) => {
      const index = routes.findIndex((route) => this.id === route.id, this);
      if (index > -1) {
        routes[index] = this.properties();
      } else {
        routes.push(this.properties());
      }
      return storeRoutes(routes);
    })
    .catch((err) => {
      console.log(err);
    });
};

Route.prototype.remove = function() {
  return getRoutes()
    .then((routes) => {
      const index = routes.findIndex((route) => route.id === this.id, this);
      if (index > -1) {
        routes.splice(index, 1);
        return storeRoutes(routes);
      }
    });
};

Route.prototype.update = function(attributes) {
  const { from, to, preferredTrain } = attributes;
  return this.remove()
    .then(() => {
      this.from = from;
      this.to = to;
      this.preferredTrain = preferredTrain;

      return this.save();
    })
    .catch((err) => {
      console.log(err);
    });
};

Route.get = function(id) {
  return getRoutes()
    .then((routes) => {
      const route = routes.find((route) => route.id === id);

      if (route) {
        return new Route(route);
      }
      throw new Route.NoKnownRouteError();
    });
};

Route.find = function(from, to) {
  return getRoutes()
    .then((routes) => {
      const route = routes.find((route) => route.from === from && route.to === to, this);

      if (route) {
        return new Route(route);
      }
      throw new Route.NoKnownRouteError();
    });
};

Route.all = function() {
  return getRoutes()
    .then((routes) => {
      return routes
        .map((route) => new Route(route));
    });
};

Route.NoKnownRouteError = function(message) {
  this.name = 'NoKnownRouteError';
  this.message = message || 'No known route';
}

Route.NoKnownRouteError.prototype = Object.create(Error.prototype);
Route.NoKnownRouteError.prototype.constructor = Route.NoKnownRouteError;

Route.MissingAttributesError = function(message) {
  this.name = 'MissingAttributesError';
  this.message = message || 'Missing attributes for a route';
}

Route.MissingAttributesError.prototype = Object.create(Error.prototype);
Route.MissingAttributesError.prototype.constructor = Route.MissingAttributesError;

export default Route;
