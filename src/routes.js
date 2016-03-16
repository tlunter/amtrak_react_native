'use strict';

import React from 'react-native';
import StatusView from './components/status_view.js';

var Routes = { STATUSES: 'STATUSES' };

Routes.INITIAL_ROUTE = Routes.STATUSES;

Routes.getSceneFromRoute = function(route, navigator) {
  switch(route.id) {
      case Routes.STATUSES:
          return <StatusView navigator={navigator} />
  }
};

export default Routes;
