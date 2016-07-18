'use strict';

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import ViewPager from '../view_pager.js';
import HeaderView from './header_view.js';
import LeftHeaderButton from './left_header_button.js';
import RightHeaderButton from './right_header_button.js';
import RouteTableCell from './route_table_cell.js';
import Route from '../models/routes.js';
import containerStyles from '../styles/container.js';
import icons from '../icons.js';
const { plus } = icons;

var StatusView = React.createClass({
  getInitialState() {
    const lv = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      routes: lv.cloneWithRows([])
    };
  },
  componentDidMount() {
    this.load();
  },
  componentWillReceiveProps() {
    this.load();
  },

  load: function() {
    Route.all()
      .then((routes) => {
        console.log(`Routes: ${JSON.stringify(routes)}`);
        this.setState({ routes: this.state.routes.cloneWithRows(routes) });
      })
      .done();
  },

  addRoute() {
    this.props.navigator.push({ addRoute: true });
  },
  editRoute(route) {
    this.props.navigator.push({ editRoute: true, route: route });
  },
  deleteRoute(route) {
    route.remove().then(this.load).done();
  },

  rightHeaderButton() {
    return (
      <RightHeaderButton
        source={{uri: plus}}
        onTap={this.addRoute}
        style={{ height: 26, width: 26 }} />
    );
  },
  renderPage(route) {
    return (
      <RouteTableCell
        key={route.id}
        route={route}
        editRoute={this.editRoute.bind(this, route)}
        deleteRoute={this.deleteRoute.bind(this, route)} />
    );
  },
  render() {
    return (
      <View style={containerStyles.container}>
        <HeaderView
          onTap={() => this.props.navigator.resetTo({})}
          right={this.rightHeaderButton()} />
        <ListView
          dataSource={this.state.routes}
          renderRow={this.renderPage}
          style={styles.list}
          enableEmptySections={true} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eeeeee',
  }
});

export default StatusView;
