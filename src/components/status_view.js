'use strict';

import React, { Dimensions, ScrollView, StyleSheet, Text, View, ListView } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import HeaderView from './header_view.js';
import RouteStatusView from './route_status_view.js';
import Route from '../models/routes.js';
import styles from '../styles/container.js';

const pageWidth = Dimensions.get('window').width;

var StatusView = React.createClass({
  componentDidMount() {
    this.load();
  },
  getInitialState() {
    return { routes: [] };
  },
  load: async function() {
    const routes = await (Route.all());
    this.setState({ routes });
  },
  onScroll(e) {
    console.log(e.nativeEvent.contentOffset.x / pageWidth);
  },
  render() {
    const routeStatusViews = this.state.routes.map((route) => {
      return (<RouteStatusView key={route.compileKey()} route={route} />);
    });
    return (
      <View style={styles.container}>
        <HeaderView />
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          style={styles.container}
          onScroll={this.onScroll}
          scrollEventThrottle={1}>
          {routeStatusViews}
        </ScrollView>
      </View>
    );
  }
});

export default StatusView;
