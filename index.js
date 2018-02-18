import React from 'react';
import { AppRegistry, StatusBar, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import StatusView from './src/components/status_view.js';
import AddRouteForm from './src/components/add_route_form.js';
import styles from './src/styles/container.js';

//class AmtrakStatus extends React.Component {
//  renderScene(route, navigator) {
//    if (route.addRoute) {
//      return <AddRouteForm navigator={navigator} />;
//    }
//    if (route.editRoute) {
//      return <AddRouteForm {...route} navigator={navigator} />;
//    }
//
//    return <StatusView navigator={navigator} />;
//  }
//
//  render() {
//
//    return (
//      <Navigator
//        style={styles.container}
//        initialRoute={{}}
//        renderScene={this.renderScene} />
//    );
//  }
//};

StatusBar.setBarStyle('light-content', false);
StatusBar.setBackgroundColor('#1375b3');

const AmtrakStatus = StackNavigator({
  StatusView: { screen: StatusView },
  AddRouteForm: { screen: AddRouteForm },
});

export default AmtrakStatus;
