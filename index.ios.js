'use strict';

import React, { AppRegistry, StatusBarIOS } from 'react-native';
import Routes from './src/routes.js';
import TabBar from './src/components/tab_bar.js';
import StatusView from './src/components/status_view.js';
import AddRouteForm from './src/components/add_route_form.js';
import icons from './src/icons.js';
const {
  activityFeed,
  activityFeedFilled,
  createNew,
  createNewFilled,
} = icons;
import styles from './src/styles/container.js';

StatusBarIOS.setStyle('light-content', false);

var AmtrakStatus = React.createClass({
  getInitialState() {
    return { tab: 'status' };
  },
  setTab(tab) {
    this.setState({ tab })
  },
  render() {
    return (
      <TabBar
        currentTab={this.state.tab}
        itemColor='#cdcdcd'
        selectedItemColor='#ffffff'
        backgroundColor='#557a91'
        setTab={this.setTab}>
        <TabBar.Item name='status' display='Statuses' icon={activityFeed} selectedIcon={activityFeedFilled}>
          <StatusView style={styles.container} setTab={this.setTab} />
        </TabBar.Item>
        <TabBar.Item name='new' display='New' icon={createNew} selectedIcon={createNewFilled}>
          <AddRouteForm style={styles.container} setTab={this.setTab} />
        </TabBar.Item>
      </TabBar>
    );
  }
});

AppRegistry.registerComponent('AmtrakStatus', () => AmtrakStatus);
