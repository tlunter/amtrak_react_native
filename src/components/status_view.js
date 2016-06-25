'use strict';

import React, { ScrollView, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import ViewPager from 'react-native-viewpager';
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

  load: async function() {
    const routes = await (Route.all());

    this.setState({ routes: this.state.routes.cloneWithRows(routes) });
  },

  addRoute() {
    this.props.navigator.push({ addRoute: true });
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
        route={route} />
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
          style={styles.list} />
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
