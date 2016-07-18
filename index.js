import React from 'react';
import { AppRegistry, Navigator, StatusBar, View } from 'react-native';
import StatusView from './src/components/status_view.js';
import AddRouteForm from './src/components/add_route_form.js';
import styles from './src/styles/container.js';

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
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBackgroundColor('#1375b3');

    return (
      <Navigator
        style={styles.container}
        initialRoute={{}}
        renderScene={this.renderScene} />
    );
  },
});

export default AmtrakStatus;
