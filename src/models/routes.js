import { AsyncStorage } from 'react-native';

const ROUTES_LIST = 'ROUTES_LIST';

function genUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function getRoutes() {
  console.log("Getting routes");
  return AsyncStorage.getItem(ROUTES_LIST)
    .then((result) => result != null ? JSON.parse(result) : [])
    .then((result) => Array.isArray(result) ? result : []);
};

function storeRoutes(routes) {
  return AsyncStorage.setItem(
    ROUTES_LIST,
    JSON.stringify(routes)
  );
}

class Route {
  constructor(attributes) {
    if (!attributes) throw new MissingAttributesError();

    this.id = attributes.id || genUUID();
    this.from = attributes.from;
    this.to = attributes.to;
    this.preferredTrain = attributes.preferredTrain;
  }

  properties() {
    return {
      id: this.id,
      from: this.from,
      to: this.to,
      preferredTrain: this.preferredTrain
    };
  }

  save() {
    return getRoutes()
      .then((routes) => {
        console.log("Routes:", routes);
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
  }

  remove() {
    return getRoutes()
      .then((routes) => {
        const index = routes.findIndex((route) => route.id === this.id, this);
        if (index > -1) {
          routes.splice(index, 1);
          return storeRoutes(routes);
        }
      });
  }

  update(attributes) {
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
  }

  static get(id) {
    return getRoutes()
      .then((routes) => {
        const route = routes.find((route) => route.id === id);

        if (route) {
          return new Route(route);
        }
        throw new NoKnownRouteError();
      });
  }

  static find(from, to) {
    return getRoutes()
      .then((routes) => {
        console.log("Routes:", routes);
        const route = routes.find((route) => route.from === from && route.to === to, this);

        if (route) {
          return new Route(route);
        }
        throw new NoKnownRouteError();
      });
  }

  static all() {
    return getRoutes()
      .then((routes) => {
        return routes
          .map((route) => new Route(route));
      });
  }
}

class NoKnownRouteError extends Error {
  constructor(message) {
    super(message || 'No known route');
  }
}

class MissingAttributesError extends Error {
  constructor(message) {
    super(message || 'Missing attributes for a route');
  }
}

export default Route;
