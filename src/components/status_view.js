'use strict';

import React, { Dimensions, ScrollView, StyleSheet, Text, View, ListView } from 'react-native';
import ViewPager from 'react-native-viewpager';
import HeaderView from './header_view.js';
import RightHeaderButton from './right_header_button.js';
import RouteStatusView from './route_status_view.js';
import Route from '../models/routes.js';
import styles from '../styles/container.js';
import icons from '../icons.js';
const { edit } = icons;

const pageWidth = Dimensions.get('window').width;

var StatusView = React.createClass({
  componentDidMount() {
    this.load();
  },
  getInitialState() {
    return {
      dataSource: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1.compileKey() !== p2.compileKey(),
      }),
      pageNumber: -1
    };
  },
  load: async function() {
    const routes = await (Route.all());
    const dataSource = this.state.dataSource.cloneWithPages(routes);
    if (routes.length > 0 && this.state.pageNumber < 0) {
      this.setState({ dataSource, pageNumber: 0 });
    } else {
      this.setState({ dataSource });
    }
  },
  renderPage(route) {
    return <RouteStatusView key={route.compileKey()} route={route} />;
  },
  handleChangePage(pageNumber) {
    this.setState({ pageNumber });
  },
  render() {
    let rightHeaderButton;
    if (this.state.pageNumber > -1) {
      rightHeaderButton = (
        <RightHeaderButton
          source={{uri: edit}}
          style={{ height: 34, width: 34 }} />
      );
    }
    return (
      <View style={styles.container}>
        <HeaderView onTap={() => this.props.setTab('status')}>
          {rightHeaderButton}
        </HeaderView>
        <ViewPager
          dataSource={this.state.dataSource}
          renderPage={this.renderPage}
          onChangePage={this.handleChangePage}/>
      </View>
    );
  }
});

export default StatusView;
