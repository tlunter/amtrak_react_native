'use strict';

import Network from '../network';
import React, { ListView, RefreshControl, StyleSheet, Text, View } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import containerStyles from '../styles/container';
const { container, fullWidth } = containerStyles;

const RouteStatusHeaderView = React.createClass({
  render() {
    const route = this.props.route;
    return (
      <View style={styles.train}>
        <Text style={styles.trainHeader}>{route.from}    ➢    {route.to}</Text>
      </View>
    );
  }
});


const RouteStatusView = React.createClass({
  mixins: [TimerMixin],
  getInitialState() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return { dataSource: ds, refreshing: false };
  },
  componentDidMount() {
    this.load();
    this.setInterval(this.load, 30000);
  },
  load: function() {
    this.setState({ refreshing: true }, () => {
      const route = this.props.route;
      Network.get(`http://amtrak.tlunter.com/${route.from}/${route.to}.json`)
        .then((response) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(response.data),
            refreshing: false,
          });
        })
        .catch(console.log);
    });
  },
  renderTrain(train) {
    const preferredTrain = parseInt(this.props.route.options.preferredTrain);
    return (
      <View style={[styles.train, preferredTrain && train.number === preferredTrain && styles.highlightedTrain]}>
        <Text style={styles.trainNumber}>{train.number}</Text>
        <Text style={styles.trainScheduled}>{train.departure && train.departure.scheduled_time}</Text>
        <Text style={styles.trainEstimated}>{train.departure && train.departure.estimated_time}</Text>
      </View>
    );
  },
  render() {
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.load}
        title="Loading..." />
    );

    return (
      <View style={[container, styles.whiteBackground]}>
        <View><RouteStatusHeaderView route={this.props.route} /></View>
        <ListView
          style={[container, fullWidth]}
          dataSource={this.state.dataSource}
          renderRow={this.renderTrain}
          refreshControl={refreshControl} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  whiteBackground: {
    backgroundColor: '#ffffff',
  },
  train: {
    flex: 1,
    flexDirection: 'row',
  },
  trainHeader: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  highlightedTrain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(19, 117, 179, 0.5)',
  },
  trainNumber: {
    flex: 1,
    padding: 10,
    fontSize: 24,
  },
  trainScheduled: {
    flex: 2,
    padding: 10,
    fontSize: 24,
  },
  trainEstimated: {
    flex: 2,
    padding: 10,
    fontSize: 24,
  },
});

export default RouteStatusView;
