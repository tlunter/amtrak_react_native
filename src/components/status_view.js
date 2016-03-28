'use strict';

import React, { Dimensions, ScrollView, StyleSheet, Text, View, ListView } from 'react-native';
import ViewPager from 'react-native-viewpager';
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
    return {
      dataSource: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1.compileKey() !== p2.compileKey(),
      })
    };
  },
  load: async function() {
    const routes = await (Route.all());
    const dataSource = this.state.dataSource.cloneWithPages(routes);
    this.setState({ dataSource });
  },
  renderPage(route) {
    return (<RouteStatusView key={route.compileKey()} route={route} />);
  },
  render() {
    return (
      <View style={styles.container}>
        <HeaderView onTap={() => this.props.setTab('status')} />
        <ViewPager
          dataSource={this.state.dataSource}
          renderPage={this.renderPage} />
      </View>
    );
  }
});

export default StatusView;
