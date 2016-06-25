'use strict';

import React, { AppRegistry, Navigator, StatusBarIOS } from 'react-native';
import StatusView from './src/components/status_view.js';
import AddRouteForm from './src/components/add_route_form.js';
import styles from './src/styles/container.js';

StatusBarIOS.setStyle('light-content', false);

var AmtrakStatus = React.createClass({
  renderScene(route, navigator) {
    if (route.addRoute) {
      return <AddRouteForm navigator={navigator} />;
    }
    if (route.editRoute) {
      return <AddRouteForm {...route} navigator={navigator} />;
    }

    return <StatusView navigator={navigator} />;
  },
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{}}
        renderScene={this.renderScene} />
    );
  },
});

AppRegistry.registerComponent('AmtrakStatus', () => AmtrakStatus);
